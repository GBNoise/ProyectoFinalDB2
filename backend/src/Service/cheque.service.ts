import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Cheque, ServerResponse } from "../Models/models";

export const getAllCheque = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Cheque, page });
};

export const getChequeByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Cheque, whereID: id });
};

export const getChequeByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Cheque,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createCheque = (
  cheque: Cheque
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Cheque, cheque);
};

export const deleteChequeWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Cheque, id);
};

export const updateChequeWithID = (cheque: Cheque): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Cheque, cheque);
};
