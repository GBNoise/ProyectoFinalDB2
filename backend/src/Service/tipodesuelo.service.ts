import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { TipoDeSuelo, ServerResponse } from "../Models/models";

export const getAllTipoDeSuelo = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeSuelo, page });
};

export const getTipoDeSueloByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeSuelo, whereID: id });
};

export const createTipoDeSuelo = (
  tipoDeSuelo: TipoDeSuelo
): Promise<ServerResponse> | ServerResponse => {
  const { Nombre, Descripcion } = tipoDeSuelo;
  if (
    !Nombre ||
    Nombre.trim().length === 0 ||
    !Descripcion ||
    Descripcion.trim().length === 0
  ) {
    return {
      message: "properties cannot be empty",
      statusCode: 400,
    };
  }
  return executeInsert(DBTables.TipoDeSuelo, tipoDeSuelo);
};

export const deleteTipoDeSueloWithID = (
  id: number
): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.TipoDeSuelo, id);
};

export const updateTipoDeSuelo = (
  tipoDeSuelo: TipoDeSuelo
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.TipoDeSuelo, tipoDeSuelo);
};
