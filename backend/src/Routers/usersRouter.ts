import { Router, Request, Response } from "express";
import { AppUser, ServerResponse } from "../Models/models.js";
import {
  createUser,
  getUsers,
  deleteUserWithID,
  getUserByID,
  updateUserWithID,
} from "../Service/users.service";

export const router = Router();

const getUsersRoute = async (req: Request, res: Response) => {
  try {
    const response: ServerResponse = await getUsers();
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getUsersRoute);

const getUserByIDRoute = async (req: Request, res: Response) => {
  try {
    const { AppUserID } = req.params;
    const response: ServerResponse = await getUserByID(parseInt(AppUserID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/:AppUserID", getUserByIDRoute);

const createUserRoute = async (req: Request, res: Response) => {
  try {
    const user: AppUser = req.body;
    const response: ServerResponse = await createUser(user);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.post("/create", createUserRoute);

const deleteUserRoute = async (req: Request, res: Response) => {
  try {
    const { AppUserID } = req.params;
    console.log(AppUserID);
    const response: ServerResponse = await deleteUserWithID(
      parseInt(AppUserID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.delete("/delete/:AppUserID", deleteUserRoute);

const updateUserRoute = async (req: Request, res: Response) => {
  try {
    const user: AppUser = req.body;
    const response = await updateUserWithID(user);

    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.put("/update", updateUserRoute);
