import { Application } from "express";
import express from "express";
import { router as userRouter } from "./Routers/usersRouter";
import { router as linksRouter } from "./Routers/linksRouter";
import { router as productorRouter } from "./Routers/productorRouter";
import { router as tipoDeSueloRouter } from "./Routers/tipodesueloRouter";
import { router as tipoDeRiegoRouter } from "./Routers/tipoderiegoRouter";
import cors from "cors";
import { config } from "dotenv";

config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/links", linksRouter);
app.use("/productor", productorRouter);
app.use("/tipodesuelo", tipoDeSueloRouter);
app.use("/tipoderiego", tipoDeRiegoRouter);

const PORT = process.env.PORT || 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!");
});

app.listen(PORT, () =>
  console.log(`app listening on port ${PORT}, ${process.env.SERVER}`)
);
