import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Proveedor, ServerResponse } from "../Models/models";

export const getAllProveedor = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Proveedor, page });
};

export const getProveedorByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Proveedor, whereID: id });
};

export const getProveedorByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Proveedor,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createProveedor = (
  proveedor: Proveedor
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Proveedor, proveedor);
};

export const deleteProveedorWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Proveedor, id);
};

export const updateProveedorWithID = (
  proveedor: Proveedor
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Proveedor, proveedor);
};
