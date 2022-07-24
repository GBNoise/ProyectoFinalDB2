import { Request, Response, Router } from "express";
import { execVExistenciaBodega, execVFinca } from "../Service/views.service";

export const router = Router();

const execVFincaRoute = async (req: Request, res: Response) => {
  try {
    const response = await execVFinca();
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/vfinca", execVFincaRoute);

const execVExistenciaBodegaRoute = async (req: Request, res: Response) => {
  try {
    const response = await execVExistenciaBodega();
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/vexistenciabodega", execVExistenciaBodegaRoute);
