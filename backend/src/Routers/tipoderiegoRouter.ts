import { Router, Request, Response } from "express";
import { TipoDeRiego } from "../Models/models";
import {
  createTipoDeRiego,
  deleteTipoDeRiegoWithID,
  getAllTipoDeRiego,
  getTipoDeRiegoByID,
  updateTipoDeRiego,
} from "../Service/tipoderiego.service";

export const router = Router();

const getAllTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response = await getAllTipoDeRiego(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};

router.get("/", getAllTipoDeSueloRoute);

const getTipoDeSueloWithIDRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await getTipoDeRiegoByID(parseInt(id));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:id", getTipoDeSueloWithIDRoute);

const createTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const tipoDeSuelo: TipoDeRiego = req.body;
    const response = await createTipoDeRiego(tipoDeSuelo);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createTipoDeSueloRoute);

const updateTipoDeSueloRoute = async (req: Request, res: Response) => {
  try {
    const tipoDeSuelo: TipoDeRiego = req.body;
    const response = await updateTipoDeRiego(tipoDeSuelo);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateTipoDeSueloRoute);

const deleteTipoDeSueloWithIDRoute = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await deleteTipoDeRiegoWithID(parseInt(id));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete", deleteTipoDeSueloWithIDRoute);
