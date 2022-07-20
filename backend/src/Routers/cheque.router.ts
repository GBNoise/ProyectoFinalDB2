import { Router, Request, Response } from "express";
import { Cheque, ServerResponse } from "../Models/models.js";
import {
  createCheque,
  deleteChequeWithID,
  getAllCheque,
  getChequeByID,
  getChequeByNombre,
  updateChequeWithID,
} from "../Service/Cheque.service.js";

export const router = Router();

const getChequeRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllCheque(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getChequeRoute);

const getChequeByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ChequeID } = req.params;
    const response: ServerResponse = await getChequeByID(parseInt(ChequeID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ChequeID", getChequeByIDRoute);

const getChequeByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getChequeByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getChequeByNombreRoute);

const createChequeRoute = async (req: Request, res: Response) => {
  try {
    const cheque: Cheque = req.body;
    const response: ServerResponse = await createCheque(cheque);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createChequeRoute);

const deleteChequeRoute = async (req: Request, res: Response) => {
  try {
    const { ChequeID } = req.params;
    const response: ServerResponse = await deleteChequeWithID(
      parseInt(ChequeID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:ChequeID", deleteChequeRoute);

const updateChequeRoute = async (req: Request, res: Response) => {
  try {
    const cheque: Cheque = req.body;
    const response: ServerResponse = await updateChequeWithID(cheque);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateChequeRoute);
