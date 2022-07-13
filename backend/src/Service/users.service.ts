import { AppUser, ServerResponse } from "../Models/models";
import {
  executeInsert,
  executeSelect,
  DBTables,
  executeDeleteWhereID,
  executeUpdateWhereID,
} from "../database/dbconfig";
import bcrypt from "bcrypt";

export const getUsers = (): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.AppUser });
};

export const getUserByID = (AppUserID: number): Promise<ServerResponse> => {
  return executeSelect({ from: DBTables.AppUser, whereID: AppUserID });
};

export const createUser = (
  user: AppUser
): Promise<ServerResponse> | ServerResponse => {
  // check if required User properties are missing 'just in case'
  if (!user.Email || !user.Username || !user.Pass) {
    return {
      message: "Some properties are missing",
      object: user,
      statusCode: 403,
    };
  }

  // hash the user password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.Pass, salt);

  user.Pass = hash;

  return executeInsert(DBTables.AppUser, user);
};

export const deleteUserWithID = (
  id: number
): Promise<ServerResponse> | ServerResponse => {
  if (!id)
    return {
      message: "Id required to delete user",
      statusCode: 403,
    };

  return executeDeleteWhereID(DBTables.AppUser, id);
};

export const updateUserWithID = (
  user: AppUser
): Promise<ServerResponse> | ServerResponse => {
  return executeUpdateWhereID(DBTables.AppUser, user);
};
