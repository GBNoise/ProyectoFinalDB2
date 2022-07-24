-- funcion para obtener el productorID con mas fincas
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

-- funcion para obtener la fincaID con mas lotes
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

-- funcion para obtener la bodegaID con mayor inventario de un producto especifico
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

-- funcion para obtener la bodegaID con mas productos
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

-- funcion para obtener el proveedorID al que se le han hecho mas compras
CREATE FUNCTION dbo.getProveedorWithMostCompras()
returns int
as
    begin
        declare @id int

        select TOP 1 @id = ProveedorID from Compra
        GROUP BY ProveedorID
        ORDER BY COUNT(*) DESC

        return @id
    end

go

-- funcion para obtener la fecha de la ultima compra
CREATE FUNCTION dbo.getLatestCompraDate()
returns date
as
    begin
        declare @date date

        select top 1 @date=Fecha from Compra
        ORDER BY Fecha, CompraID DESC

        return @date
    end
go

-- funcion para obtener el id de la venta con mas valor
CREATE FUNCTION dbo.getVentaWithMostValor()
returns int
as
    begin
        declare @id int
        SELECT TOP 1 @id = VentaID from Venta
        ORDER BY Valor DESC

        return @id
    end
go

-- funcion para obtener el DepositoID con mas valor
CREATE FUNCTION dbo.getDepositoWithMostValor()
returns int
as
    begin
        declare @id int
        SELECT TOP 1 @id = DepositoID from Deposito
        ORDER BY Valor DESC

        return @id
    end
go

-- funcion para obtener la cuentabancariaID con mas depositos
CREATE FUNCTION dbo.getCuentaWithMostDepositos()
returns int
as
    begin
        declare  @id int
        select top 1 @id = CuentaBancariaID  from Deposito
        GROUP BY CuentaBancariaID
        order by count(*) desc

        return @id
    end
go

-- funcion para obtener ultima fecha en la que se deposito
CREATE FUNCTION dbo.getLatestDepositoDate()
    returns date
as
begin
    declare @date date

    select top 1 @date=Fecha from Deposito
    ORDER BY Fecha, DepositoID DESC

    return @date
end
go




