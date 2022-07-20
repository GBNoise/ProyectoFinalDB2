import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { CuentaBancaria, ServerResponse } from "../Models/models";

export const getAllCuentaBancaria = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.CuentaBancaria, page });
};

export const getCuentaBancariaByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.CuentaBancaria, whereID: id });
};

export const getCuentaBancariaByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.CuentaBancaria,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createCuentaBancaria = (
  cuentabancaria: CuentaBancaria
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.CuentaBancaria, cuentabancaria);
};

export const deleteCuentaBancariaWithID = (
  id: number
): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.CuentaBancaria, id);
};

export const updateCuentaBancariaWithID = (
  cuentabancaria: CuentaBancaria
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.CuentaBancaria, cuentabancaria);
};
