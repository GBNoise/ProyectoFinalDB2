const auto = (name) => `
import {
    executeInsert,
    executeSelect,
    DBTables,
    executeDeleteWhereID,
    executeUpdateWhereID,
  } from "../database/dbconfig";
  import { ${name}, ServerResponse } from "../Models/models";
  
  export const getAll${name} = (page: number): Promise<ServerResponse> => {
    return executeSelect({ from: DBTables.${name}, page });
  };
  
  export const get${name}ByID = (id: number): Promise<ServerResponse> => {
    return executeSelect({ from: DBTables.${name}, whereID: id });
  };
  
  export const get${name}ByNombre = (nombre: string): Promise<ServerResponse> => {
    return executeSelect({
      from: DBTables.${name},
      whereProps: { Nombre: nombre },
      includeSimilar: true,
    });
  };
  
  export const create${name} = (
    ${name.toLowerCase()}: ${name}
  ): Promise<ServerResponse> | ServerResponse => {
    return executeInsert(DBTables.${name}, ${name.toLowerCase()});
  };
  
  export const delete${name}WithID = (id: number): Promise<ServerResponse> => {
    return executeDeleteWhereID(DBTables.${name}, id);
  };
  
  export const update${name}WithID = (${name.toLowerCase()}: ${name}): Promise<ServerResponse> => {
    return executeUpdateWhereID(DBTables.${name}, ${name.toLowerCase()});
  };
  


  import { Router, Request, Response } from "express";
import { ${name}, ServerResponse } from "../Models/models.js";
import {
  create${name},
  delete${name}WithID,
  getAll${name},
  get${name}ByID,
  get${name}ByNombre,
  update${name}WithID,
} from "../Service/${name}.service.js";

export const router = Router();

const get${name}Route = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const response: ServerResponse = await getAll${name}(parseInt(page));
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.send(e);
  }
};
router.get("/", get${name}Route);

const get${name}ByIDRoute = async (req: Request, res: Response) => {
  try {
    const { ${name}ID } = req.params;
    const response: ServerResponse = await get${name}ByID(
      parseInt(${name}ID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/:${name}ID", get${name}ByIDRoute);

const get${name}ByNombreRoute = async (req: Request, res: Response) => {
  try {
    const { Nombre } = req.params;
    const response: ServerResponse = await get${name}ByNombre(Nombre);
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.get("/nombre/:Nombre", get${name}ByNombreRoute);

const create${name}Route = async (req: Request, res: Response) => {
  try {
    const ${name.toLowerCase()}: ${name} = req.body;
    const response: ServerResponse = await create${name}(${name.toLowerCase()});
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.post("/create", create${name}Route);

const delete${name}Route = async (req: Request, res: Response) => {
  try {
    const { ${name}ID } = req.params;
    const response: ServerResponse = await delete${name}WithID(
      parseInt(${name}ID)
    );
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.delete("/delete/:${name}ID", delete${name}Route);

const update${name}Route = async (req: Request, res: Response) => {
  try {
    const ${name.toLowerCase()}: ${name} = req.body;
    const response: ServerResponse = await update${name}WithID(${name.toLowerCase()});
    return res.status(response.statusCode).send(response);
  } catch (e) {
    return res.status(500).send(e);
  }
};
router.put("/update", update${name}Route);

`;

console.log(auto("Deposito"));
