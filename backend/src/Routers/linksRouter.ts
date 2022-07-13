import { Router, Request, Response } from "express";
import { DBViews, executeSelect } from "../database/dbconfig";
import { Link } from "../Models/models";
import {
  getLinks,
  getUserLinks,
  createLink,
  deleteLink,
  updateLink,
} from "../Service/link.service";

export const router = Router();

// need to handle better statusCodes in case of errors in all of the routers!!!

const getLinksRoute = async (req: Request, res: Response) => {
  try {
    const response = await getLinks();
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", getLinksRoute);

const getUserLinksRoute = async (req: Request, res: Response) => {
  try {
    const response = await getUserLinks(req.params.id);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/user/:id", getUserLinksRoute);

const createLinkRoute = async (req: Request, res: Response) => {
  try {
    const link: Link = req.body;
    const response = await createLink(link);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/", createLinkRoute);

const deleteLinkRoute = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const response = await deleteLink(id);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/:id", deleteLinkRoute);

const updateLinkRoute = async (req: Request, res: Response) => {
  try {
    const link: Link = req.body;
    const response = await updateLink(link);
    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/", updateLinkRoute);
