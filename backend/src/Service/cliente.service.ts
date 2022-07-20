import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Cliente, ServerResponse } from "../Models/models";

export const getAllCliente = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Cliente, page });
};

export const getClienteByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Cliente, whereID: id });
};

export const getClienteByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Cliente,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createCliente = (
  cliente: Cliente
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Cliente, cliente);
};

export const deleteClienteWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Cliente, id);
};

export const updateClienteWithID = (
  cliente: Cliente
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Cliente, cliente);
};
