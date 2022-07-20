import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Venta, ServerResponse } from "../Models/models";

export const getAllVenta = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Venta, page });
};

export const getVentaByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Venta, whereID: id });
};

export const getVentaByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Venta,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createVenta = (
  venta: Venta
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Venta, venta);
};

export const deleteVentaWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Venta, id);
};

export const updateVentaWithID = (venta: Venta): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Venta, venta);
};
