-- funcion para obtener el productor con mas fincas
CREATE FUNCTION dbo.getProductorWithMostFincas()
returns int
as
    begin
        declare @id int

        select top 1
         @id=ProductorID
        from Finca
        GROUP BY ProductorID
        ORDER BY count(*) DESC

        return @id;
    end
go

-- funcion para obtener la finca con mas lotes
CREATE FUNCTION dbo.getFincaWithMostLotes()
returns int
as
    begin
        declare @id int

        select top 1
        @id = FincaID
        from Lote
        GROUP BY FincaID
        order by count(*) DESC

        return @id

    end
go

-- funcion para obtener la bodega con mayor inventario de un producto especifico
CREATE FUNCTION dbo.getBodegaIDWithMostOfCertainProduct(@productoID int)
returns int
as
    begin
        declare @id int

        select TOP 1 @id=BodegaID from Inventario
        WHERE ProductoID = @productoID
        GROUP BY ProductoID, BodegaID
        ORDER BY SUM(Cantidad) desc

        return @id
    end
go

CREATE FUNCTION dbo.getBodegaWithMostProducts()
returns int
as
    begin
        declare @id int

        SELECT TOP 1 @id=BodegaID from Inventario
        GROUP BY BodegaID
        ORDER BY SUM(Cantidad) DESC

        RETURN @id
    end
GO




