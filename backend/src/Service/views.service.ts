import { DBViews, executeSelect } from "../database/dbconfig";
import { ServerResponse } from "../Models/models";

export const execVFinca = (): Promise<ServerResponse> => {
  return executeSelect({ from: DBViews.vFinca });
};

export const execVExistenciaBodega = (): Promise<ServerResponse> => {
  return executeSelect({ from: DBViews.vExistenciaBodega });
};
