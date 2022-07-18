import { Connection, Request } from "tedious";
import { AppUser, Link, ServerResponse, Tables } from "../Models/models";
import { config } from "dotenv";
import e from "express";
config();

export const enum DBTables {
  // Tables
  AppUser = "AppUser",
  Link = "Link",
  //
  Productor = "Productor",
  TipoDeSuelo = "TipoDeSuelo",
  TipoDeRiego = "TipoDeRiego",
  Producto = "Producto",
  Lote = "Lote",
  Cliente = "Cliente",
  Banco = "Banco",
  TipoDeMoneda = "TipoDeMoneda",
  CuentaBancaria = "CuentaBancaria",
  Bodega = "Bodega",
  Inventario = "Inventario",
  Proveedor = "Proveedor",
  Cheque = "Cheque",
  Compra = "Compra",
  Venta = "Venta",
  Deposito = "Deposito",
}

export const enum DBViews {}

interface DBResponse {
  columns: string[];
  rows?: any[];
  from: DBTables | DBViews;
  row?: {};
  whereID?: number | string;
}

interface SelectProps {
  from: DBTables | DBViews;
  whereID?: number | string;
  whereFK?: number | string;
  whereProps?: object;
  reference?: DBTables;
  page?: number;
  includeSimilar?: boolean;
}

const connectionError: ServerResponse = {
  message: "Database connection is not established",
  statusCode: 500,
};

const configuration = {
  server: process.env.DB_SERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    encrypt: true,
    database: process.env.DB_NAME,
  },
};

const connection = new Connection(configuration);
let isConnected = false;

connection.on("connect", (err) => {
  isConnected = true;
});

connection.connect();

export const executeSelect = (
  options: SelectProps
): Promise<ServerResponse> => {
  const {
    from,
    whereID,
    whereFK,
    reference,
    page,
    whereProps,
    includeSimilar,
  } = options;

  return new Promise((resolve, reject) => {
    if (!isConnected) reject(connectionError);

    let query = `SELECT * FROM ${from}`;

    if (page) {
      const start = 10 * (page - 1);
      const end = 10 * page;
      query += ` ORDER BY ${from}ID OFFSET ${start} ROWS FETCH NEXT (${end} - ${start}) ROWS ONLY`;
    }

    if (whereID) query = `SELECT * FROM ${from} WHERE ${from}ID = ${whereID}`;

    if (whereProps) {
      query += " WHERE ";
      Object.entries(whereProps).forEach(([key, value]) => {
        if (includeSimilar) query += `${key} LIKE '${value}%' and`;
        else query += `${key} = '${value}' and`;
      });

      query = query.replace(/(and)/gm, "");
    }

    if (whereFK && reference)
      query = `SELECT * FROM ${from} WHERE ${reference}ID = ${whereFK}`;

    const request = new Request(query, (error: any) => {
      if (error) reject({ message: error, statusCode: 500 });
    });

    const response: DBResponse = {
      columns: [],
      rows: [],
      from,
    };

    request.on("columnMetadata", (cols: any) => {
      cols.forEach((column: any) => {
        response.columns.push(column.colName);
      });
    });

    let row = "";
    request.on("row", (cols: any) => {
      let obj = {};
      cols.forEach((column: any, index: any) => {
        row = "";
        row = column.value;
        obj = { ...obj, [response.columns[index]]: row };
      });

      response.rows?.push(obj);
      row = "";
    });

    request.on("requestCompleted", () => {
      resolve({
        message: "Select operation successfully completed",
        object: response,
        statusCode: 200,
      });
    });

    connection.execSql(request);
  });
};

// Insert
export const executeInsert = (
  to: DBTables,
  object: Tables
): Promise<ServerResponse> => {
  return new Promise((resolve, reject) => {
    if (!isConnected)
      reject({
        error: "Database connection is not established",
        statusCode: 500,
      });

    let query = "";
    let keys = "";
    let values = "";
    Object.entries(object).forEach(([key, value]) => {
      keys += key + ",";
      values += `'${value}',`;
    });

    query = `INSERT INTO ${to}(${keys}) VALUES(${values})`.replace(/,\)/g, ")");

    const request = new Request(query, (error: any) => {
      if (error) reject({ error, statusCode: 500 });
    });

    request.on("requestCompleted", () => {
      resolve({
        message: `Sucessfully inserted into ${to}`,
        object,
        statusCode: 201,
      });
    });

    connection.execSql(request);
  });
};

// Delete
export const executeDeleteWhereID = (
  from: DBTables,
  whereID: number
): Promise<ServerResponse> => {
  return new Promise((resolve, reject) => {
    // validating if database connection is established and rejecting if not
    if (!isConnected) reject(connectionError);

    let query = `DELETE FROM ${from} WHERE ${from}ID = ${whereID}`;

    const request = new Request(query, (err) => {
      if (err) reject({ message: err, statusCode: 500 });
    });

    request.on("requestCompleted", () => {
      resolve({
        message: `Deletion has been successful`,
        object: { from, whereID },
        statusCode: 200,
      });
    });
    connection.execSql(request);
  });
};

// Update
export const executeUpdateWhereID = (
  from: DBTables,
  object: Tables
): Promise<ServerResponse> => {
  return new Promise((resolve, reject) => {
    if (!isConnected) reject(connectionError);

    let query = `UPDATE ${from} SET `;
    let whereID: number | string | boolean = -1;

    Object.entries(object).forEach(([key, value], index) => {
      if (index === 0) {
        whereID = value;
        return;
      }

      query += `${key} = '${value}',`;
    });

    query = query.replace(/,$/m, "") + ` WHERE ${from}ID = ${whereID}`;

    // need to make validations before changing password;
    // need to check if password is provided then hash it

    resolve({
      message: query,
      statusCode: 200,
    });
  });
};

// close connection
export const closeConnection = () => {
  connection.close();
};
