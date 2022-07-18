import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Productor, ServerResponse } from "../Models/models";

export const getAllProductores = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Productor, page });
};

export const getProductorByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Productor, whereID: id });
};

export const getProductorByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Productor,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createProductor = (
  productor: Productor
): Promise<ServerResponse> => {
  return executeInsert(DBTables.Productor, productor);
};

export const deleteProductorWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Productor, id);
};

export const updateProductorWithID = (
  productor: Productor
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Productor, productor);
};
