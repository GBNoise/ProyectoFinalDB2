import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { TipoDeMoneda, ServerResponse } from "../Models/models";

export const getAllTipoDeMoneda = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeMoneda, page });
};

export const getTipoDeMonedaByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeMoneda, whereID: id });
};

export const getTipoDeMonedaByNombre = (
  nombre: string
): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.TipoDeMoneda,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createTipoDeMoneda = (
  tipodemoneda: TipoDeMoneda
): Promise<ServerResponse> | ServerResponse => {
  return executeInsert(DBTables.TipoDeMoneda, tipodemoneda);
};

export const deleteTipoDeMonedaWithID = (
  id: number
): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.TipoDeMoneda, id);
};

export const updateTipoDeMonedaWithID = (
  tipodemoneda: TipoDeMoneda
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.TipoDeMoneda, tipodemoneda);
};
