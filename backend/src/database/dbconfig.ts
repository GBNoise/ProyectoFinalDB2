import { Connection, Request } from "tedious";
import { AppUser, Link, ServerResponse, Tables } from "../Models/models";
import { config } from "dotenv";
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
  reference?: DBTables;
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
  const { from, whereID, whereFK, reference } = options;

  return new Promise((resolve, reject) => {
    if (!isConnected) reject(connectionError);

    let query = `SELECT * FROM ${from};`;

    if (whereID) query = `SELECT * FROM ${from} WHERE ${from}ID = ${whereID}`;

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

// function executeStatement() {
//   var request = new Request("SELECT * FROM Articulo;", function (err) {
//     if (err) {
//       console.log({ err });
//     }
//   });
//   var result = "";
//   request.on("row", function (columns) {
//     columns.forEach(function (column) {
//       if (column.value === null) {
//         console.log("NULL");
//       } else {
//         result += column.value + " ";
//       }
//     });
//     console.log(result);
//     result = "";
//   });

//   request.on("columnMetadata", function (columns) {
//     columns.forEach((col) => console.log(col.colName));
//   });

//   request.on("done", function (rowCount, more) {
//     console.log(rowCount + " rows returned");
//   });

//   // Close the connection after the final event emitted by the request, after the callback passes
//   request.on("requestCompleted", function (rowCount, more) {
//     connection.close();
//   });

//   connection.execSql(request);
// }

// export const executeSelect0 = (
//   from: DBTables | DBViews
// ): Promise<ServerResponse> => {
//   return new Promise((resolve, reject) => {
//     if (!isConnected) reject(connectionError);

//     const query = `SELECT * FROM ${from};`;

//     const request = new Request(query, (error: any) => {
//       if (error) reject({ message: error, statusCode: 500 });
//     });

//     const response: DBResponse = {
//       columns: [],
//       rows: [],
//       from,
//     };

//     request.on("columnMetadata", (cols: any) => {
//       cols.forEach((column: any) => {
//         response.columns.push(column.colName);
//       });
//     });

//     let row = "";
//     request.on("row", (cols: any) => {
//       let obj = {};
//       cols.forEach((column: any, index: any) => {
//         row = "";
//         row = column.value;
//         obj = { ...obj, [response.columns[index]]: row };
//       });

//       response.rows?.push(obj);
//       row = "";
//     });

//     request.on("requestCompleted", () => {
//       resolve({
//         message: "Select operation successfully completed",
//         object: response,
//         statusCode: 200,
//       });
//     });

//     connection.execSql(request);
//   });
// };

// export const executeSelectByID = (
//   from: DBTables,
//   whereID: number
// ): Promise<ServerResponse> => {
//   return new Promise((resolve, reject) => {
//     if (!isConnected) reject(connectionError);

//     let query = `SELECT * FROM ${from} WHERE ${from}ID = ${whereID}`;

//     const request = new Request(query, (err) => {
//       if (err) reject({ message: err, statusCode: 500 });
//     });

//     const response: DBResponse = {
//       columns: [],
//       row: {},
//       from,
//       whereID,
//     };

//     request.on("columnMetadata", (cols) => {
//       cols.forEach((column: any) => {
//         response.columns.push(column.colName);
//       });
//     });

//     let row = "";
//     request.on("row", (cols: any) => {
//       let obj = {};
//       cols.forEach((column: any, index: any) => {
//         row = "";
//         row = column.value;
//         obj = { ...obj, [response.columns[index]]: row };
//       });
//       response.row = obj;
//       row = "";
//     });

//     request.on("requestCompleted", () => {
//       resolve({
//         message: "Select by ID operation completed successfully",
//         object: response,
//         statusCode: 200,
//       });
//     });

//     connection.execSql(request);
//   });
// };

// export const executeSelectByForeignKey = (
//   from: DBTables,
//   reference: DBTables,
//   whereID: number | string
// ): Promise<ServerResponse> => {
//   return new Promise((resolve, reject) => {
//     if (!isConnected) reject(connectionError);

//     let query = `SELECT * FROM ${from} WHERE ${reference}ID = ${whereID}`;

//     const request = new Request(query, (err) => {
//       if (err) reject({ message: err, statusCode: 500 });
//     });

//     const response: DBResponse = {
//       columns: [],
//       rows: [],
//       from,
//     };

//     request.on("columnMetadata", (cols: any) => {
//       cols.forEach((column: any) => {
//         response.columns.push(column.colName);
//       });
//     });

//     let row = "";
//     request.on("row", (cols: any) => {
//       let obj = {};
//       cols.forEach((column: any, index: any) => {
//         row = "";
//         row = column.value;
//         obj = { ...obj, [response.columns[index]]: row };
//       });

//       response.rows?.push(obj);
//       row = "";
//     });

//     request.on("requestCompleted", () => {
//       resolve({
//         message: "Request completed successfully",
//         object: response,
//         statusCode: 200,
//       });
//     });

//     connection.execSql(request);
//   });
// };
