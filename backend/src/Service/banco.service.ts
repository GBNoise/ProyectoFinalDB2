import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Banco, ServerResponse } from "../Models/models";

export const getAllBanco = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Banco, page });
};

export const getBancoByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Banco, whereID: id });
};

export const getBancoByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Banco,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createBanco = (
  banco: Banco
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Banco, banco);
};

export const deleteBancoWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Banco, id);
};

export const updateBancoWithID = (banco: Banco): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Banco, banco);
};
