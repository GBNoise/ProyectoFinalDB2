export type AppUser = {
  AppUserID?: number;
  Username: string;
  Pass: string;
  Email: string;
  isVerified?: boolean;
  isActivated?: boolean;
  isBlocked?: boolean;
};

export type Link = {
  LinkID?: number;
  Link: string;
  AppUserID: number;
};

export type Productor = {
  ProductorID?: number;
  Nombre: string;
  Identidad: string;
};

export type TipoDeSuelo = {
  TipoDeSueloID?: number;
  Nombre: string;
  Descripcion: string;
};

export type TipoDeRiego = {
  TipoDeRiegoID?: number;
  Nombre: string;
  Descripcion: string;
};

export type Finca = {
  FincaID?: number;
  Nombre: string;
  ProductorID: number;
};

export type Producto = {
  ProductoID?: number;
  Nombre: string;
  TipoDeSueloID: number;
};

export type Lote = {
  LoteID?: number;
  Extension: string;
  CantidadDeCosechas: number;
  TipoDeSueloID: number;
  TipoDeRiegoID: number;
  ProductoID: number;
  FincaID: number;
};

export type Cliente = {
  ClienteID?: number;
  Nombre: string;
};

export type Banco = {
  BancoID?: number;
  Nombre: string;
};

export type TipoDeMoneda = {
  TipoDeMonedaID?: number;
  Nombre: string;
};

export type CuentaBancaria = {
  CuentaBancariaID?: number;
  NumeroDeCuenta: number;
  TipoDeMonedaID: number;
};

export type Bodega = {
  BodegaID?: number;
  Nombre: string;
};

export type Inventario = {
  InventarioID?: number;
  ProductoID: number;
  BodegaID: number;
  Cantidad: number;
};

export type Proveedor = {
  ProveedorID?: number;
  Nombre: string;
};

// need to change
type ChequeEstado = "N" | "P";
type ChequeTipo = "A" | "B";

export type Cheque = {
  ChequeID?: number;
  Fecha?: Date;
  CuentaBancariaID: number;
  Descripcion: string;
  Valor: number;
  ProveedorID?: number;
  ProductorID?: number;
  Estado: ChequeEstado;
  Tipo: ChequeTipo;
};

//need to change
type CompraTipo = "C" | "A";
export type Compra = {
  CompraID?: number;
  Fecha?: Date;
  ProveedorID: number;
  ProductoID: number;
  Cantidad: number;
  Costo: number;
  ISV: number;
  Total?: number;
  Tipo: CompraTipo;
  SemanasDePlazo: number;
};

//need to change
type TipoVenta = "A";
export type Venta = {
  VentaID?: number;
  Fecha?: Date;
  ProductoID: number;
  Cantidad: number;
  Valor: number;
  ISV: number;
  Extra: number;
  Tipo: TipoVenta;
  ProveedorID?: number;
  ClienteID?: number;
};

// need to change
type TipoDeposito = "C" | "N";
export type Deposito = {
  DepositoID?: number;
  CuentaBancariaID: number;
  Descripcion: string;
  Valor: number;
  Fecha?: Date;
  Tipo: TipoDeposito;
};

export type Tables =
  | Productor
  | AppUser
  | Link
  | TipoDeSuelo
  | TipoDeRiego
  | Finca
  | Producto
  | Lote
  | Cliente
  | Banco
  | TipoDeMoneda
  | CuentaBancaria
  | Bodega
  | Inventario
  | Proveedor
  | Cheque
  | Compra
  | Venta
  | Deposito;

export interface ServerResponse {
  message: string;
  object?: any;
  statusCode: number;
}
