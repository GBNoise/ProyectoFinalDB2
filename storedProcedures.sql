-- Procedimientos almacenados (insert, update, delete)

-- Productor
CREATE PROCEDURE spProductorInsert  @nombre varchar(100), @identidad varchar(40)
as 
    insert into Productor values (@nombre,@identidad);
go

CREATE PROCEDURE spProductorDelete @id int 
as 
    delete from Productor where ProductorID = @id;
go

CREATE PROCEDURE spProductorUpdate @id int, @nombre varchar(100), @identidad varchar(40)
as 
    update  Productor set Nombre = @nombre, Identidad = @identidad
    where ProductorID = @id;
go

-- Tipo de suelo
CREATE  PROCEDURE spTipoDeSueloInsert @nombre varchar(50), @descripcion varchar(100)
as 
    insert into TipoDeSuelo values (@nombre,@descripcion);
go

CREATE PROCEDURE spTipoDeSueloDelete @id int 
as 
    delete from TipoDeSuelo where TipoDeSueloID = @id
go

CREATE PROCEDURE spTipoDeSueloUpdate @id int,@nombre varchar(50), @descripcion varchar(100)
AS
    update TipoDeSuelo set Nombre = @nombre, Descripcion = @descripcion
    where TipoDeSueloID = @id
go

-- Tipo de riego
CREATE PROCEDURE spTipoDeRiegoInsert @nombre varchar(100), @descripcion varchar (100)
as
    insert into TipoDeRiego values (@nombre,@descripcion);
go

CREATE PROCEDURE spTipoDeRiegoDelete @id int
as
    delete from TipoDeRiego where TipoDeRiegoID = @id
go

CREATE PROCEDURE spTipoDeRiegoUpdate @id int, @nombre varchar(100), @descripcion varchar(100)
as 
    update TipoDeRiego set Nombre = @nombre, Descripcion = @descripcion
    where TipoDeRiegoID = @id
go

-- Finca
CREATE PROCEDURE spFincaInsert @nombre varchar(100), @productorID int
as
    insert into Finca values (@nombre,@productorID);
go

CREATE PROCEDURE spFincaDelete @id int
as
    delete from Finca where FincaID = @id
go

CREATE PROCEDURE spFincaUpdate @id int, @nombre varchar(100), @productorID int
as
    update Finca set Nombre = @nombre, ProductorID = @productorID
    where FincaID = @id
go

-- Producto
CREATE PROCEDURE spProductoInsert @nombre varchar(100), @tipoDeSueloID int
as 
    insert into Producto values (@nombre,@tipoDeSueloID);
go

CREATE PROCEDURE spProductoDelete @id int
as
    delete from Producto where ProductoID = @id
go

CREATE PROCEDURE spProductoUpdate @id int, @nombre varchar(100), @tipoDeSueloID int
as
    update Producto set Nombre = @nombre, ProdcutoID = @productoID
    where ProductoID = @id
go

-- Lote
CREATE PROCEDURE spLoteInsert @extension varchar(30), @cantidadDeCosechas int, @tipoDeSueloID int, @tipoDeRiegoID int, @productoID int, @fincaID int
as
    insert into Lote values (@extension,@cantidadDeCosechas,@tipoDeSueloID,@tipoDeRiegoID,@productoID);
go

CREATE PROCEDURE spLoteDelete @id int
as 
    delete from Lote where LoteID = @id
go

CREATE PROCEDURE spLoteUpdate @id int, @extension varchar(30), @cantidadDeCosechas int, @tipoDeSueloID int, @tipoDeRiegoID int, @productoID int
as
    update Lote set Extension = @extension, CantidadDeCosechas = @cantidadDeCosechas, TipoDeSueloID = @tipoDeSueloID, TipoDeRiegoID = @tipoDeRiegoID, ProductoID = @productoID
    where LoteID = @id
go

-- Cliente
CREATE PROCEDURE spClienteInsert @nombre varchar(100)
as
    insert into Cliente values (@nombre);
go

CREATE PROCEDURE spClienteDelete @id int
as
    delete from Cliente where  ClienteID = @id
go

CREATE PROCEDURE spClienteUpdate @id int, @nombre varchar(100)
as
    update Cliente set Nombre = @nombre
    where ClienteID = @id
go

--Banco
CREATE PROCEDURE spBancoInsert @nombre varchar(100)
as
    insert into Banco values (@nombre);
go

CREATE PROCEDURE spBancoDelete @id int
as
    delete from Banco where BancoID = @id
go

CREATE PROCEDURE spBancoUpdate @id int, @nombre varchar(100)
as
    update Banco set Nombre = @nombre
    where BancoID = @id
go

--Tipo de moneda
CREATE PROCEDURE spTipoDeMonedaInsert @nombre varchar (100)
as
    insert into TipoDeMoneda values (@nombre);
go

CREATE PROCEDURE spTipoDeMonedaDelete @id int
as
    delete from TipoDeMoneda where TipoDeMonedaID = @id
go

CREATE PROCEDURE spTipoDeMonedaUpdate @id int, @nombre varchar(100)
as
    update TipoDeMoneda set Nombre = @nombre
    where TipoDeMonedaID = @id
go

--Cuenta bancaria
CREATE PROCEDURE spCuentaBancariaInsert @numeroDeCuenta int, @tipoDeMonedaID int, @bancoID int
as
    insert into CuentaBancaria values (@numeroDeCuenta,@tipoDeMonedaID,@bancoID);
go

CREATE PROCEDURE spCuentaBancariaDelete @id int
as
    delete from CuentaBancaria where CuentaBancaria = @id
go

CREATE PROCEDURE spCuentaBancariaUpdate @id int, @numeroDeCuenta int, @tipoDeMonedaID int, @bancoID int
as
    update CuentaBancaria set NumeroDeCuenta = @numeroDeCuenta, TipoDeMonedaID = @tipoDeMonedaID, BancoID = @bancoID
    where CuentaBancariaID = @id
go

-- Bodega
CREATE PROCEDURE spBodegaInsert @nombre varchar(100)
as
    insert into Bodega values (@nombre);
go

CREATE PROCEDURE spBodegaDelete @id int
as
    delete from Bodega where BodegaID = @id
go

CREATE PROCEDURE spBodegaUpdate @id int, @nombre varchar(100)
as 
    update Bodega set Nombre = @nombre
    where BodegaID = @id
go

-- Inventario
CREATE PROCEDURE spInventarioInsert @productoID int, @bodegaID int, @cantidad int
as
    insert into Inventario values (@productoID,@bodegaID,@cantidad);
go

CREATE PROCEDURE spInventarioDelete @id int
as
    delete from Inventario where InventarioID = @id
go

CREATE PROCEDURE spInventarioUpdate @id int,@productoID int, @bodegaID int, @cantidad int 
as
    update Inventario set BodegaID = @bodegaID, ProductoID = @productoID, Cantidad = @cantidad
go

--Proveedor
CREATE PROCEDURE spProveedorInsert @nombre varchar(100)
as
    insert into Proveedor values (@nombre);
go

CREATE PROCEDURE spProveedorDelete @id int
as
    delete from Proveedor  where ProveedorID = @id
go

CREATE PROCEDURE spProveedorUpdate @id int, @nombre varchar(100)
as
    update Proveedor set Nombre = @nombre where ProveedorID = @id
go

--Cheque
CREATE PROCEDURE spChequeInsert @fecha date, @cuentaBancariaID int, @descripcion varchar(100), @valor float, @proveedorID int, @productorID int, @estado varchar, @tipo varchar
as
    insert into Cheque values (@fecha,@cuentaBancariaID,@descripcion,@valor,@proveedorID,@productorID,@estado,@tipo);
go

CREATE PROCEDURE spChequeDelete @id int
as
    delete from Cheque where ChequeID = @id
go

CREATE PROCEDURE spChequeUpdate @id int, @fecha date, @cuentaBancariaID int, @descripcion varchar(100), @valor float, @proveedorID int, @productorID int, @estado varchar, @tipo varchar
as 
    update Cheque set Fecha = @fecha, CuentaBancariaID = @cuentaBancariaID, Descripcion = @descripcion, Valor = @valor, ProveedorID = @proveedorID, ProductorID = @productorID, Estado = @estadoID, Tipo = @tipo
    where ChequeID = @id
go

--Compra
CREATE PROCEDURE spCompraInsert @fecha date, @proveedorID int, @productoID int, @cantidad int, @costo float, @isv float, @total float, @tipo varchar, @semanasDePlazo int
as
    insert into Compra values (@fecha, @proveedorID, @productoID, @cantidad, @costo, @isv, @total, @tipo, @semanasDePlazo);
go

CREATE procedure spCompraDelete @id int
as
    delete from Compra where CompraID = @id
go

CREATE PROCEDURE spCompraUpdate @id int, @fecha date, @proveedorID int, @productoID int, @cantidad int, @costo float, @isv float, @total float, @tipo varchar, @semanasDePlazo int
as
    update Compra set Fecha =@fecha, ProveedorID = @proveedorID, ProductoID = @productoID, Cantidad = @cantidad, Costo = @costo, ISV = @isv, Total = @total, Tipo = @tipo, SemanasDePlazo = @semanasDePlazogo
    where CompraID = @id
go

--Venta
CREATE PROCEDURE spVentaInsert @fecha date, @productoID int, @cantidad int, @valor float, @isv float, @extra float, @tipo varchar, @proveedorID int, @clienteID int
as
    insert into Venta values (@fecha,@productoID,@cantidad,@valor,@isv,@extra,@tipo,@proveedorID,@clienteID);
go

CREATE PROCEDURE spVentaDelete @id int
as
    delete from Venta where VentaID = @id
go

CREATE PROCEDURE spVentaUpdate @id int, @fecha date, @productoID int, @cantidad int, @valor float, @isv float, @extra float, @tipo varchar, @proveedorID int, @clienteID int
as
    update Venta set Fecha = @fecha, ProductoID = @productoID, Cantida = @cantidad, Valor = @valor, ISV = @isv,Extra = @extra, Tipo = @tipo, ProveedorID = @proveedorID, ClienteID = @clienteID
    where VentaID = @id
go


--Deposito
CREATE PROCEDURE spDepositoInsert @cuentaBancariaID int, @descripcion varchar(100), @valor float, @fecha date, @tipo varchar
as
    insert into Deposito values (@cuentaBancariaID, @descripcion, @valor, @fecha, @tipo)
go

CREATE PROCEDURE spDepositoDelete @id int
as
    delete from Deposito where @DepositoID = @id
go

CREATE PROCEDURE spDepositoUpdate @id int, @cuentaBancariaID int, @descripcion varchar(100), @valor float, @fecha date, @tipo varchar
as
    update Deposito set CuentaBancariaID = @cuentaBancariaID, Descripcion = @descripcion, Valor = @valor, Fecha = @fecha, Tipo = @tipo
    where DepositoID = @id
go