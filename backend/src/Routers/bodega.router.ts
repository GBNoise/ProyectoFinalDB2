import { Router, Request, Response } from "express";
import { Bodega, ServerResponse } from "../Models/models.js";
import {
  createBodega,
  deleteBodegaWithID,
  getAllBodega,
  getBodegaByID,
  getBodegaByNombre,
  updateBodegaWithID,
} from "../Service/Bodega.service.js";

export const router = Router();

const getBodegaRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllBodega(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getBodegaRoute);

const getBodegaByIDRoute = async (req: Request, res: Response) => {
  try {
    const { BodegaID } = req.params;
    const response: ServerResponse = await getBodegaByID(parseInt(BodegaID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:BodegaID", getBodegaByIDRoute);

const getBodegaByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getBodegaByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getBodegaByNombreRoute);

const createBodegaRoute = async (req: Request, res: Response) => {
  try {
    const bodega: Bodega = req.body;
    const response: ServerResponse = await createBodega(bodega);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createBodegaRoute);

const deleteBodegaRoute = async (req: Request, res: Response) => {
  try {
    const { BodegaID } = req.params;
    const response: ServerResponse = await deleteBodegaWithID(
      parseInt(BodegaID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:BodegaID", deleteBodegaRoute);

const updateBodegaRoute = async (req: Request, res: Response) => {
  try {
    const bodega: Bodega = req.body;
    const response: ServerResponse = await updateBodegaWithID(bodega);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateBodegaRoute);
