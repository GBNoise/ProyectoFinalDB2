import { Router, Request, Response } from "express";
import { TipoDeMoneda, ServerResponse } from "../Models/models.js";
import {
  createTipoDeMoneda,
  deleteTipoDeMonedaWithID,
  getAllTipoDeMoneda,
  getTipoDeMonedaByID,
  getTipoDeMonedaByNombre,
  updateTipoDeMonedaWithID,
} from "../Service/TipoDeMoneda.service.js";

export const router = Router();

const getTipoDeMonedaRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllTipoDeMoneda(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getTipoDeMonedaRoute);

const getTipoDeMonedaByIDRoute = async (req: Request, res: Response) => {
  try {
    const { TipoDeMonedaID } = req.params;
    const response: ServerResponse = await getTipoDeMonedaByID(
      parseInt(TipoDeMonedaID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:TipoDeMonedaID", getTipoDeMonedaByIDRoute);

const getTipoDeMonedaByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getTipoDeMonedaByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getTipoDeMonedaByNombreRoute);

const createTipoDeMonedaRoute = async (req: Request, res: Response) => {
  try {
    const tipodemoneda: TipoDeMoneda = req.body;
    const response: ServerResponse = await createTipoDeMoneda(tipodemoneda);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createTipoDeMonedaRoute);

const deleteTipoDeMonedaRoute = async (req: Request, res: Response) => {
  try {
    const { TipoDeMonedaID } = req.params;
    const response: ServerResponse = await deleteTipoDeMonedaWithID(
      parseInt(TipoDeMonedaID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:TipoDeMonedaID", deleteTipoDeMonedaRoute);

const updateTipoDeMonedaRoute = async (req: Request, res: Response) => {
  try {
    const tipodemoneda: TipoDeMoneda = req.body;
    const response: ServerResponse = await updateTipoDeMonedaWithID(
      tipodemoneda
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateTipoDeMonedaRoute);
