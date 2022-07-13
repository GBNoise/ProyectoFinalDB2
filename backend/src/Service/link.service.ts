import { Link, ServerResponse } from "../Models/models";
import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";

export const getLinks = (): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.Link });
};

export const getUserLinks = (id: number | string): Promise<ServerResponse> => {
  return executeSelect({
    from: DBTables.Link,
    reference: DBTables.AppUser,
    whereFK: id,
  });
};

export const createLink = (link: Link): Promise<ServerResponse> => {
  return executeInsert(DBTables.Link, link);
};

export const deleteLink = (id: number): Promise<ServerResponse> => {
  return executeDeleteWhereID(DBTables.Link, id);
};

export const updateLink = (link: Link): Promise<ServerResponse> => {
  return executeUpdateWhereID(DBTables.Link, link);
};
