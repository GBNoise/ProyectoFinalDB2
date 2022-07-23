CREATE TABLE Productor (
    ProductorID int IDENTITY(1,1),
    Nombre varchar(100) not null,
    Identidad varchar(40) unique not null,
    CONSTRAINT pkProductor PRIMARY KEY(ProductorID)
)

CREATE TABLE TipoDeSuelo(
    TipoDeSueloID int IDENTITY(1,1),
    Nombre varchar(50) unique not null,
    Descripcion varchar(100) not null,
    CONSTRAINT pkTipoDeSuelo PRIMARY KEY(TipoDeSueloID)
)


ALTER TABLE TipoDeSuelo 
    ADD CONSTRAINT chkNombreDescripcionNotBlank 
        CHECK(not Nombre = '' and not Descripcion = '')


CREATE TABLE TipoDeRiego(
    TipoDeRiegoID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    Descripcion varchar(100) not null,
    CONSTRAINT pkTipoDeRiego PRIMARY KEY(TipoDeRiegoID)
)

CREATE TABLE Finca (
    FincaID int IDENTITY(1,1),
    Nombre varchar(100) not null,
    ProductorID int not null,
    CONSTRAINT pkFinca PRIMARY KEY(FincaID),
    CONSTRAINT fkFincaProductor
        FOREIGN KEY(ProductorID)
            REFERENCES Productor
)

CREATE TABLE Producto (
    ProductoID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    TipoDeSueloID int not null,
    CONSTRAINT pkProducto PRIMARY KEY(ProductoID),
    CONSTRAINT fkProductoTipoDeSuelo 
        FOREIGN KEY(TipoDeSueloID)
            REFERENCES TipoDeSuelo
)

CREATE TABLE Lote (
    LoteID int IDENTITY(1,1),
    Extension VARCHAR(30) not null,
    CantidadDeCosechas int not null,
    TipoDeSueloID int not null,
    TipoDeRiegoID int not null,
    ProductoID int not null,
    FincaID int not null,
    CONSTRAINT pkLote PRIMARY KEY(LoteID),
    CONSTRAINT fkLoteTipoDeSueloID 
        FOREIGN KEY(TipoDeSueloID)
            REFERENCES TipoDeSuelo,
    CONSTRAINT fkLoteTipoDeRiegoID
        FOREIGN KEY(TipoDeRiegoID)
            REFERENCES TipoDeRiego,
    CONSTRAINT fkLoteProducto
        FOREIGN KEY(ProductoID)
            REFERENCES Producto,
    CONSTRAINT fkLoteFinca
        FOREIGN KEY(FincaID)
            REFERENCES Finca
)

CREATE TABLE Cliente(
    ClienteID int IDENTITY(1,1),
    Nombre VARCHAR(100) unique not null,
    CONSTRAINT pkCliente PRIMARY KEY(ClienteID)
)

CREATE TABLE Banco(
    BancoID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    CONSTRAINT pkBanco 
        PRIMARY KEY(BancoID)
)

-- alter table Banco add     CONSTRAINT pkBanco 
--         PRIMARY KEY(BancoID)

CREATE TABLE TipoDeMoneda(
    TipoDeMonedaID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    constraint pkTipoDeMoneda primary key(TipoDeMonedaID)
)

CREATE TABLE CuentaBancaria(
    CuentaBancariaID int IDENTITY(1,1),
    NumeroDeCuenta int not null,
    TipoDeMonedaID int not null,
    BancoID int not null,
    CONSTRAINT pkCuentaBancaria PRIMARY KEY(CuentaBancariaID),
    CONSTRAINT fkCuentaBancariaTipoDeMoneda 
        FOREIGN KEY(TipoDeMonedaID)
            REFERENCES TipoDeMoneda,
    CONSTRAINT fkCuentaBancariaBanco 
        FOREIGN KEY(BancoID)
            REFERENCES Banco
)

-- alter table CuentaBancaria
--     -- ADD BancoID int not null
--     ADD CONSTRAINT fkCuentaBancariaBanco
--         FOREIGN KEY(BancoID)
--             REFERENCES Banco

CREATE TABLE Bodega(
    BodegaID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    CONSTRAINT pkBodegaID PRIMARY KEY(BodegaID)
)

CREATE TABLE Inventario (
    InventarioID int IDENTITY(1,1),
    ProductoID int not null,
    BodegaID int not null,
    Cantidad int not null,
    CONSTRAINT pkInventario PRIMARY KEY(InventarioID),
    CONSTRAINT fkInventarioProducto 
        FOREIGN KEY(ProductoID)
            REFERENCES Producto,
    CONSTRAINT fkInventarioBodega
        FOREIGN KEY(BodegaID)
            REFERENCES Bodega
)
CREATE TABLE Proveedor(
    ProveedorID int IDENTITY(1,1),
    Nombre varchar(100) unique not null,
    CONSTRAINT pkProveedor PRIMARY KEY(ProveedorID)
)

CREATE TABLE Cheque(
    ChequeID int IDENTITY(1,1),
    Fecha date DEFAULT GETDATE(),
    CuentaBancariaID int not null,
    Descripcion varchar(100) not null,
    Valor float not null,
    ProveedorID int,
    ProductorID int,
    Estado varchar not null default 'N',
    Tipo varchar not null,
    CONSTRAINT pkCheque PRIMARY KEY(ChequeID),
    CONSTRAINT fkChequeProveedor 
        FOREIGN KEY(ProveedorID)
            REFERENCES Proveedor,
    CONSTRAINT fkChequeProductor    
        FOREIGN KEY(ProductorID)
            REFERENCES Productor
)

CREATE TABLE Compra(
    CompraID int IDENTITY(1,1),
    Fecha date default getDate(),
    ProveedorID int not null,
    ProductoID int not null,
    Cantidad int not null,
    Costo float not null,
    ISV float not null,
    Total float,
    Tipo varchar default 'C',
    SemanasDePlazo int not null,
    CONSTRAINT pkCompra PRIMARY KEY(CompraID),
    CONSTRAINT fkCompraProveedor 
        FOREIGN KEY(ProveedorID)
            REFERENCES Proveedor,
    CONSTRAINT fkCompraProducto
        FOREIGN KEY(ProductoID)
            REFERENCES Producto
)


CREATE TABLE Venta(
    VentaID int IDENTITY(1,1),
    Fecha date default getDate(),
    ProductoID int not null,
    Cantidad int not null,
    Valor float not null,
    ISV float not null,
    Extra float not null,
    Tipo varchar not null,
    ProveedorID int,
    ClienteID int,
    CONSTRAINT pkVenta PRIMARY KEY(VentaID),
    CONSTRAINT fkVentaProducto 
        FOREIGN KEY(ProductoID)
            REFERENCES Producto,
    CONSTRAINT fkVentaProveedor
        FOREIGN KEY(ProveedorID)
            REFERENCES Proveedor,
    CONSTRAINT fkClienteID
        FOREIGN KEY(ClienteID)
            REFERENCES Cliente
)

CREATE TABLE Deposito(
    DepositoID int IDENTITY(1,1),
    CuentaBancariaID int not null,
    Descripcion varchar(100) not null,
    Valor float not null,
    Fecha date default getdate(),
    Tipo varchar not null,
    constraint pkDeposito primary key(DepositoID),
    constraint fkDepositoCuentaBancaria 
        FOREIGN KEY(CuentaBancariaID)
            references CuentaBancaria
)

