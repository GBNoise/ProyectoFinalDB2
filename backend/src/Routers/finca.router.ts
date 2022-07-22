import { Router, Request, Response } from "express";
import { Finca, ServerResponse } from "../Models/models.js";
import {
  createFinca,
  deleteFincaWithID,
  getAllFincas,
  getFincaByID,
  getFincaByNombre,
  getFincaByProductorID,
  updateFincaWithID,
} from "../Service/finca.service.js";

export const router = Router();

const getProductoresRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllFincas(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getProductoresRoute);

const getProductorByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ProductorID } = req.params;
    const response: ServerResponse = await getFincaByID(parseInt(ProductorID));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ProductorID", getProductorByIDRoute);

const getFincaByProductorIDRoute = async (req: Request, res: Response) => {
  try {
    const { ProductorID } = req.params;
    const response: ServerResponse = await getFincaByProductorID(
      parseInt(ProductorID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/productor/:ProductorID", getFincaByProductorIDRoute);

const getProductorByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getFincaByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getProductorByNombreRoute);

const createProductorRoute = async (req: Request, res: Response) => {
  try {
    const productor: Finca = req.body;
    const response: ServerResponse = await createFinca(productor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createProductorRoute);

const deleteProductorRoute = async (req: Request, res: Response) => {
  try {
    const { ProductorID } = req.params;
    const response: ServerResponse = await deleteFincaWithID(
      parseInt(ProductorID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:ProductorID", deleteProductorRoute);

const updateProductorRoute = async (req: Request, res: Response) => {
  try {
    const productor: Finca = req.body;
    const response: ServerResponse = await updateFincaWithID(productor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateProductorRoute);
