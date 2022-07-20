import { Router, Request, Response } from "express";
import { Cliente, ServerResponse } from "../Models/models.js";
import {
  createCliente,
  deleteClienteWithID,
  getAllCliente,
  getClienteByID,
  getClienteByNombre,
  updateClienteWithID,
} from "../Service/Cliente.service.js";

export const router = Router();

const getClienteRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllCliente(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getClienteRoute);

const getClienteByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ClienteID } = req.params;
    const response: ServerResponse = await getClienteByID(parseInt(ClienteID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ClienteID", getClienteByIDRoute);

const getClienteByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getClienteByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getClienteByNombreRoute);

const createClienteRoute = async (req: Request, res: Response) => {
  try {
    const cliente: Cliente = req.body;
    const response: ServerResponse = await createCliente(cliente);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createClienteRoute);

const deleteClienteRoute = async (req: Request, res: Response) => {
  try {
    const { ClienteID } = req.params;
    const response: ServerResponse = await deleteClienteWithID(
      parseInt(ClienteID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:ClienteID", deleteClienteRoute);

const updateClienteRoute = async (req: Request, res: Response) => {
  try {
    const cliente: Cliente = req.body;
    const response: ServerResponse = await updateClienteWithID(cliente);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateClienteRoute);
