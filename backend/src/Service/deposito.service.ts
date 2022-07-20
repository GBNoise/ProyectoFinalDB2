import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Deposito, ServerResponse } from "../Models/models";

export const getAllDeposito = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Deposito, page });
};

export const getDepositoByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Deposito, whereID: id });
};

export const getDepositoByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Deposito,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createDeposito = (
  deposito: Deposito
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Deposito, deposito);
};

export const deleteDepositoWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Deposito, id);
};

export const updateDepositoWithID = (
  deposito: Deposito
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Deposito, deposito);
};
