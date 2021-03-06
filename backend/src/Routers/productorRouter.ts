import { Router, Request, Response } from "express";
import { Productor, ServerResponse } from "../Models/models.js";
import {
  createProductor,
  deleteProductorWithID,
  getAllProductores,
  getProductorByID,
  getProductorByNombre,
  updateProductorWithID,
} from "../Service/productor.service.js";

export const router = Router();

const getProductoresRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllProductores(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getProductoresRoute);

const getProductorByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ProductorID } = req.params;
    const response: ServerResponse = await getProductorByID(
      parseInt(ProductorID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ProductorID", getProductorByIDRoute);

const getProductorByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getProductorByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getProductorByNombreRoute);

const createProductorRoute = async (req: Request, res: Response) => {
  try {
    const productor: Productor = req.body;
    const response: ServerResponse = await createProductor(productor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
router.post("/create", createProductorRoute);

const deleteProductorRoute = async (req: Request, res: Response) => {
  try {
    const { ProductorID } = req.params;
    const response: ServerResponse = await deleteProductorWithID(
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
    const productor: Productor = req.body;
    const response: ServerResponse = await updateProductorWithID(productor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateProductorRoute);
