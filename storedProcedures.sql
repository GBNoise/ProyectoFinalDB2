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
    where TipoDeRiego = @id
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

CREATE PROCEDURE spFincaUpdate @id int, @nombre(100), @productorID int
as
    update Finca set Nombre = @nombre, ProductorID = @productorID
    where Finca = @id
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
    where Producto = @id
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
    where Lote = @id
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
    where Cliente = @id
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
    where Banco = @id
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
    where TipoDeMoneda = @id
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
    where CuentaBancaria = @id
go

