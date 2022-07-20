import { Router, Request, Response } from "express";
import { Deposito, ServerResponse } from "../Models/models.js";
import {
  createDeposito,
  deleteDepositoWithID,
  getAllDeposito,
  getDepositoByID,
  getDepositoByNombre,
  updateDepositoWithID,
} from "../Service/Deposito.service.js";

export const router = Router();

const getDepositoRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllDeposito(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getDepositoRoute);

const getDepositoByIDRoute = async (req: Request, res: Response) => {
  try {
    const { DepositoID } = req.params;
    const response: ServerResponse = await getDepositoByID(
      parseInt(DepositoID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:DepositoID", getDepositoByIDRoute);

const getDepositoByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getDepositoByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getDepositoByNombreRoute);

const createDepositoRoute = async (req: Request, res: Response) => {
  try {
    const deposito: Deposito = req.body;
    const response: ServerResponse = await createDeposito(deposito);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createDepositoRoute);

const deleteDepositoRoute = async (req: Request, res: Response) => {
  try {
    const { DepositoID } = req.params;
    const response: ServerResponse = await deleteDepositoWithID(
      parseInt(DepositoID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:DepositoID", deleteDepositoRoute);

const updateDepositoRoute = async (req: Request, res: Response) => {
  try {
    const deposito: Deposito = req.body;
    const response: ServerResponse = await updateDepositoWithID(deposito);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateDepositoRoute);
