import { Router, Request, Response } from "express";
import { Inventario, ServerResponse } from "../Models/models.js";
import {
  createInventario,
  deleteInventarioWithID,
  getAllInventario,
  getInventarioByID,
  getInventarioByNombre,
  updateInventarioWithID,
} from "../Service/Inventario.service.js";

export const router = Router();

const getInventarioRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllInventario(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getInventarioRoute);

const getInventarioByIDRoute = async (req: Request, res: Response) => {
  try {
    const { InventarioID } = req.params;
    const response: ServerResponse = await getInventarioByID(
      parseInt(InventarioID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:InventarioID", getInventarioByIDRoute);

const getInventarioByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getInventarioByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getInventarioByNombreRoute);

const createInventarioRoute = async (req: Request, res: Response) => {
  try {
    const inventario: Inventario = req.body;
    const response: ServerResponse = await createInventario(inventario);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createInventarioRoute);

const deleteInventarioRoute = async (req: Request, res: Response) => {
  try {
    const { InventarioID } = req.params;
    const response: ServerResponse = await deleteInventarioWithID(
      parseInt(InventarioID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:InventarioID", deleteInventarioRoute);

const updateInventarioRoute = async (req: Request, res: Response) => {
  try {
    const inventario: Inventario = req.body;
    const response: ServerResponse = await updateInventarioWithID(inventario);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateInventarioRoute);
