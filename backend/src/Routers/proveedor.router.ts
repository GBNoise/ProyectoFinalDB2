import { Router, Request, Response } from "express";
import { Proveedor, ServerResponse } from "../Models/models.js";
import {
  createProveedor,
  deleteProveedorWithID,
  getAllProveedor,
  getProveedorByID,
  getProveedorByNombre,
  updateProveedorWithID,
} from "../Service/Proveedor.service.js";

export const router = Router();

const getProveedorRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllProveedor(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getProveedorRoute);

const getProveedorByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ProveedorID } = req.params;
    const response: ServerResponse = await getProveedorByID(
      parseInt(ProveedorID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ProveedorID", getProveedorByIDRoute);

const getProveedorByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getProveedorByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getProveedorByNombreRoute);

const createProveedorRoute = async (req: Request, res: Response) => {
  try {
    const proveedor: Proveedor = req.body;
    const response: ServerResponse = await createProveedor(proveedor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createProveedorRoute);

const deleteProveedorRoute = async (req: Request, res: Response) => {
  try {
    const { ProveedorID } = req.params;
    const response: ServerResponse = await deleteProveedorWithID(
      parseInt(ProveedorID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:ProveedorID", deleteProveedorRoute);

const updateProveedorRoute = async (req: Request, res: Response) => {
  try {
    const proveedor: Proveedor = req.body;
    const response: ServerResponse = await updateProveedorWithID(proveedor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateProveedorRoute);
