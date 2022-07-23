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
    insert into TipoDeRiego values (@nombre,@descrripcion);
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