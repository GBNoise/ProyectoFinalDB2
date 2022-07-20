import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Compra, ServerResponse } from "../Models/models";

export const getAllCompra = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Compra, page });
};

export const getCompraByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Compra, whereID: id });
};

export const getCompraByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Compra,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createCompra = (
  compra: Compra
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Compra, compra);
};

export const deleteCompraWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Compra, id);
};

export const updateCompraWithID = (compra: Compra): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Compra, compra);
};
