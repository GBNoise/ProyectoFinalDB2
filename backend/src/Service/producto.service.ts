import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Producto, ServerResponse } from "../Models/models";

export const getAllProductos = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Producto, page });
};

export const getProductoByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Producto, whereID: id });
};

export const getProductoByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Producto,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createProducto = (
  producto: Producto
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.Producto, producto);
};

export const deleteProductoWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Producto, id);
};

export const updateProductoWithID = (
  producto: Producto
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Producto, producto);
};
