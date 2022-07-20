import { Router, Request, Response } from "express";
import { Venta, ServerResponse } from "../Models/models.js";
import {
  createVenta,
  deleteVentaWithID,
  getAllVenta,
  getVentaByID,
  getVentaByNombre,
  updateVentaWithID,
} from "../Service/Venta.service.js";

export const router = Router();

const getVentaRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllVenta(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getVentaRoute);

const getVentaByIDRoute = async (req: Request, res: Response) => {
  try {
    const { VentaID } = req.params;
    const response: ServerResponse = await getVentaByID(parseInt(VentaID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:VentaID", getVentaByIDRoute);

const getVentaByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getVentaByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getVentaByNombreRoute);

const createVentaRoute = async (req: Request, res: Response) => {
  try {
    const venta: Venta = req.body;
    const response: ServerResponse = await createVenta(venta);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createVentaRoute);

const deleteVentaRoute = async (req: Request, res: Response) => {
  try {
    const { VentaID } = req.params;
    const response: ServerResponse = await deleteVentaWithID(parseInt(VentaID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:VentaID", deleteVentaRoute);

const updateVentaRoute = async (req: Request, res: Response) => {
  try {
    const venta: Venta = req.body;
    const response: ServerResponse = await updateVentaWithID(venta);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateVentaRoute);
