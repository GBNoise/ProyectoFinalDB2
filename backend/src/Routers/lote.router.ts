import { Router, Request, Response } from "express";
import { Lote, ServerResponse } from "../Models/models.js";
import {
  createLote,
  deleteLoteWithID,
  getAllLote,
  getLoteByID,
  updateLoteWithID,
} from "../Service/Lote.service.js";

export const router = Router();

const getLoteRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllLote(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getLoteRoute);

const getLoteByIDRoute = async (req: Request, res: Response) => {
  try {
    const { LoteID } = req.params;
    const response: ServerResponse = await getLoteByID(parseInt(LoteID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:LoteID", getLoteByIDRoute);

const createLoteRoute = async (req: Request, res: Response) => {
  try {
    const lote: Lote = req.body;
    const response: ServerResponse = await createLote(lote);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createLoteRoute);

const deleteLoteRoute = async (req: Request, res: Response) => {
  try {
    const { LoteID } = req.params;
    const response: ServerResponse = await deleteLoteWithID(parseInt(LoteID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:LoteID", deleteLoteRoute);

const updateLoteRoute = async (req: Request, res: Response) => {
  try {
    const lote: Lote = req.body;
    const response: ServerResponse = await updateLoteWithID(lote);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateLoteRoute);
