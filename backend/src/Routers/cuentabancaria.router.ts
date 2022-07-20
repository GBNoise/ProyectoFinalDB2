import { Router, Request, Response } from "express";
import { CuentaBancaria, ServerResponse } from "../Models/models.js";
import {
  createCuentaBancaria,
  deleteCuentaBancariaWithID,
  getAllCuentaBancaria,
  getCuentaBancariaByID,
  getCuentaBancariaByNombre,
  updateCuentaBancariaWithID,
} from "../Service/CuentaBancaria.service.js";

export const router = Router();

const getCuentaBancariaRoute = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAllCuentaBancaria(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getCuentaBancariaRoute);

const getCuentaBancariaByIDRoute = async (req: Request, res: Response) => {
  try {
    const { CuentaBancariaID } = req.params;
    const response: ServerResponse = await getCuentaBancariaByID(
      parseInt(CuentaBancariaID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:CuentaBancariaID", getCuentaBancariaByIDRoute);

const getCuentaBancariaByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await getCuentaBancariaByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", getCuentaBancariaByNombreRoute);

const createCuentaBancariaRoute = async (req: Request, res: Response) => {
  try {
    const cuentabancaria: CuentaBancaria = req.body;
    const response: ServerResponse = await createCuentaBancaria(cuentabancaria);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", createCuentaBancariaRoute);

const deleteCuentaBancariaRoute = async (req: Request, res: Response) => {
  try {
    const { CuentaBancariaID } = req.params;
    const response: ServerResponse = await deleteCuentaBancariaWithID(
      parseInt(CuentaBancariaID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:CuentaBancariaID", deleteCuentaBancariaRoute);

const updateCuentaBancariaRoute = async (req: Request, res: Response) => {
  try {
    const cuentabancaria: CuentaBancaria = req.body;
    const response: ServerResponse = await updateCuentaBancariaWithID(
      cuentabancaria
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", updateCuentaBancariaRoute);
