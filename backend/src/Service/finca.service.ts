import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import { Finca, ServerResponse } from "../Models/models";

export const getAllFincas = (page: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Finca, page });
};

export const getFincaByID = (id: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Finca, whereID: id });
};

export const getFincaByNombre = (nombre: string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Finca,
    whereProps: { Nombre: nombre },
    includeSimilar: true,
  });
};

export const createFinca = (
  finca: Finca
): Promise<ServerResponse> | ServerResponse => {
  const { Nombre, ProductorID } = finca;
  if (!Nombre || Nombre.trim().length === 0 || !ProductorID) {
    return {
      message: "properties cannot be empty",
      statusCode: 400,
    };
  }
  return executeInsert(DBTables.Finca, finca);
};

export const getFincaByProductorID = (id: number): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Finca,
    whereFK: id,
    reference: DBTables.Productor,
  });
};

export const deleteFincaWithID = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Finca, id);
};

export const updateFincaWithID = (finca: Finca): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Finca, finca);
};
