-- VIEWS

-- Fincas (Dueños, Lotes, Productos Cosechados)
CREATE VIEW vFinca
as
    SELECT f.Nombre as NombreFinca,
           p.Nombre as 'Dueño', pdt.Nombre as NombreProducto,
           l.Extension, l.CantidadDeCosechas,
           TDR.Nombre as TipoDeRiego,
           TDS.Nombre as TipoDeSuelo
    from Productor p
             JOIN Finca f ON f.ProductorID = p.ProductorID
             JOIN Lote l ON l.FincaID = f.FincaID
             JOIN Producto pdt ON l.ProductoID = pdt.ProductoID
             JOIN TipoDeRiego TDR on l.TipoDeRiegoID = TDR.TipoDeRiegoID
             JOIN TipoDeSuelo TDS on l.TipoDeSueloID = TDS.TipoDeSueloID
go

--Existencias x Bodega
CREATE VIEW vExistenciaBodega
as
    SELECT b.Nombre as Bodega, p.Nombre as Producto, SUM(i.Cantidad) as Cantidad
           FROM Inventario i
    JOIN Bodega b ON i.BodegaID = b.BodegaID
    JOIN Producto p on i.ProductoID = P.ProductoID
    GROUP BY b.Nombre, p.Nombre
go

-- Saldos Proveedores y Productores
-- se ocupa manejar en algun lado los saldos de los proveedores y productores