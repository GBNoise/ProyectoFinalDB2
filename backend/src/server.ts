import express, { Application } from "express";
import { router as userRouter } from "./Routers/usersRouter";
import { router as linksRouter } from "./Routers/linksRouter";
import { router as productorRouter } from "./Routers/productorRouter";
import { router as tipoDeSueloRouter } from "./Routers/tipodesueloRouter";
import { router as tipoDeRiegoRouter } from "./Routers/tipoderiegoRouter";
import { router as fincaRouter } from "./Routers/finca.router";
import { router as productoRouter } from "./Routers/producto.router";
import { router as loteRouter } from "./Routers/lote.router";
import { router as clienteRouter } from "./Routers/cliente.router";
import { router as bancoRouter } from "./Routers/banco.router";
import { router as tipoDeMonedaRouter } from "./Routers/tipodemoneda.router";
import { router as cuentaBancariaRouter } from "./Routers/cuentabancaria.router";
import { router as bodegaRouter } from "./Routers/bodega.router";
import { router as inventarioRouter } from "./Routers/inventario.router";
import { router as proveedorRouter } from "./Routers/proveedor.router";
import { router as chequeRouter } from "./Routers/cheque.router";
import { router as compraRouter } from "./Routers/compra.router";
import { router as ventaRouter } from "./Routers/venta.router";
import { router as depositoRouter } from "./Routers/deposito.router";
import { router as viewsRouter } from "./Routers/views.router";
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
app.use("/finca", fincaRouter);
app.use("/producto", productoRouter);
app.use("/lote", loteRouter);
app.use("/cliente", clienteRouter);
app.use("/banco", bancoRouter);
app.use("/tipodemoneda", tipoDeMonedaRouter);
app.use("/cuentabancaria", cuentaBancariaRouter);
app.use("/bodega", bodegaRouter);
app.use("/inventario", inventarioRouter);
app.use("/proveedor", proveedorRouter);
app.use("/cheque", chequeRouter);
app.use("/compra", compraRouter);
app.use("/venta", ventaRouter);
app.use("/deposito", depositoRouter);
app.use("/views", viewsRouter);

const PORT = process.env.PORT || 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world!");
});

app.listen(PORT, () =>
  console.log(`app listening on port ${PORT}, ${process.env.SERVER}`)
);
