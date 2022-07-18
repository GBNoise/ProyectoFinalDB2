import { Router, Request, Response } from "express";
import { TipoDeSuelo } from "../Models/models";
import {
  createTipoDeSuelo,
  deleteTipoDeSueloWithID,
  getAllTipoDeSuelo,
  getTipoDeSueloByID,
  updateTipoDeSuelo,
} from "../Service/tipodesuelo.service";

export const router = Router();

const getAllTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response = await getAllTipoDeSuelo(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};

router.get("/", getAllTipoDeSueloRoute);

const getTipoDeSueloWithIDRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getTipoDeSueloByID(parseInt(id));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:id", getTipoDeSueloWithIDRoute);

const createTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const tipoDeSuelo: TipoDeSuelo = req.body;
    const response = await createTipoDeSuelo(tipoDeSuelo);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createTipoDeSueloRoute);

const updateTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const tipoDeSuelo: TipoDeSuelo = req.body;
    const response = await updateTipoDeSuelo(tipoDeSuelo);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateTipoDeSueloRoute);

const deleteTipoDeSueloWithIDRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteTipoDeSueloWithID(parseInt(id));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete", deleteTipoDeSueloWithIDRoute);
