import { Router, Request, Response } from "express";
import { Producto, ServerResponse } from "../Models/models.js";
import {
  createProducto,
  deleteProductoWithID,
  getAllProductos,
  getProductoByID,
  getProductoByNombre,
  updateProductoWithID,
} from "../Service/Producto.service.js";

export const router = Router();

const getProductoRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllProductos(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getProductoRoute);

const getProductoByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ProductoID } = req.params;
    const response: ServerResponse = await getProductoByID(
      parseInt(ProductoID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:ProductoID", getProductoByIDRoute);

const getProductoByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getProductoByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getProductoByNombreRoute);

const createProductoRoute = async (req: Request, res: Response) => {
  try {
    const producto: Producto = req.body;
    const response: ServerResponse = await createProducto(producto);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
};
router.post("/create", createProductoRoute);

const deleteProductoRoute = async (req: Request, res: Response) => {
  try {
    const { ProductoID } = req.params;
    const response: ServerResponse = await deleteProductoWithID(
      parseInt(ProductoID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:ProductoID", deleteProductoRoute);

const updateProductoRoute = async (req: Request, res: Response) => {
  try {
    const productor: Producto = req.body;
    const response: ServerResponse = await updateProductoWithID(productor);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateProductoRoute);
