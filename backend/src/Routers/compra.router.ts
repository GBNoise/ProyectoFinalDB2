import { Router, Request, Response } from "express";
import { Compra, ServerResponse } from "../Models/models.js";
import {
  createCompra,
  deleteCompraWithID,
  getAllCompra,
  getCompraByID,
  getCompraByNombre,
  updateCompraWithID,
} from "../Service/Compra.service.js";

export const router = Router();

const getCompraRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllCompra(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getCompraRoute);

const getCompraByIDRoute = async (req: Request, res: Response) => {
  try {
    const { CompraID } = req.params;
    const response: ServerResponse = await getCompraByID(parseInt(CompraID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:CompraID", getCompraByIDRoute);

const getCompraByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getCompraByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getCompraByNombreRoute);

const createCompraRoute = async (req: Request, res: Response) => {
  try {
    const compra: Compra = req.body;
    const response: ServerResponse = await createCompra(compra);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createCompraRoute);

const deleteCompraRoute = async (req: Request, res: Response) => {
  try {
    const { CompraID } = req.params;
    const response: ServerResponse = await deleteCompraWithID(
      parseInt(CompraID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:CompraID", deleteCompraRoute);

const updateCompraRoute = async (req: Request, res: Response) => {
  try {
    const compra: Compra = req.body;
    const response: ServerResponse = await updateCompraWithID(compra);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateCompraRoute);
