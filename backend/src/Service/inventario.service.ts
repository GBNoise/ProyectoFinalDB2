import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Inventario, ServerResponse } from "../Models/models";

export const getAllInventario = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Inventario, page });
};

export const getInventarioByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Inventario, whereID: id });
};

export const getInventarioByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Inventario,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createInventario = (
  inventario: Inventario
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Inventario, inventario);
};

export const deleteInventarioWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Inventario, id);
};

export const updateInventarioWithID = (
  inventario: Inventario
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Inventario, inventario);
};
