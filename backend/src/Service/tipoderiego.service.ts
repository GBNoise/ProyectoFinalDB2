import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { TipoDeRiego, ServerResponse } from "../Models/models";

export const getAllTipoDeRiego = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeRiego, page });
};

export const getTipoDeRiegoByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.TipoDeRiego, whereID: id });
};

export const createTipoDeRiego = (
  tipoDeRiego: TipoDeRiego
): Promise<ServerResponse> | ServerResponse => {
  const { Nombre, Descripcion } = tipoDeRiego;
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
  return executeInsert(DBTables.TipoDeRiego, tipoDeRiego);
};

export const deleteTipoDeRiegoWithID = (
  id: number
): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.TipoDeRiego, id);
};

export const updateTipoDeRiego = (
  tipoDeRiego: TipoDeRiego
): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.TipoDeRiego, tipoDeRiego);
};
