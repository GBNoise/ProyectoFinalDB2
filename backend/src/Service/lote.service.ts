import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Lote, ServerResponse } from "../Models/models";

export const getAllLote = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Lote, page });
};

export const getLoteByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Lote, whereID: id });
};

export const createLote = (
  lote: Lote
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Lote, lote);
};

export const deleteLoteWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Lote, id);
};

export const updateLoteWithID = (lote: Lote): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Lote, lote);
};
