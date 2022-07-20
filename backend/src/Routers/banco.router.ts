import { Router, Request, Response } from "express";
import { Banco, ServerResponse } from "../Models/models.js";
import {
  createBanco,
  deleteBancoWithID,
  getAllBanco,
  getBancoByID,
  getBancoByNombre,
  updateBancoWithID,
} from "../Service/Banco.service.js";

export const router = Router();

const getBancoRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllBanco(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getBancoRoute);

const getBancoByIDRoute = async (req: Request, res: Response) => {
  try {
    const { BancoID } = req.params;
    const response: ServerResponse = await getBancoByID(parseInt(BancoID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:BancoID", getBancoByIDRoute);

const getBancoByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getBancoByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getBancoByNombreRoute);

const createBancoRoute = async (req: Request, res: Response) => {
  try {
    const banco: Banco = req.body;
    const response: ServerResponse = await createBanco(banco);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createBancoRoute);

const deleteBancoRoute = async (req: Request, res: Response) => {
  try {
    const { BancoID } = req.params;
    const response: ServerResponse = await deleteBancoWithID(parseInt(BancoID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:BancoID", deleteBancoRoute);

const updateBancoRoute = async (req: Request, res: Response) => {
  try {
    const banco: Banco = req.body;
    const response: ServerResponse = await updateBancoWithID(banco);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateBancoRoute);
