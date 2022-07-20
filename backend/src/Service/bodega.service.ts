import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Bodega, ServerResponse } from "../Models/models";

export const getAllBodega = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Bodega, page });
};

export const getBodegaByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Bodega, whereID: id });
};

export const getBodegaByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Bodega,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createBodega = (
  bodega: Bodega
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Bodega, bodega);
};

export const deleteBodegaWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Bodega, id);
};

export const updateBodegaWithID = (bodega: Bodega): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Bodega, bodega);
};
