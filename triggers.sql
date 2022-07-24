-- TRIGGERS

-- 1. Trigger to delete Productor
-- deletes Productor, Finca Related to Productor and Lotes related to Finca
CREATE TRIGGER dbo.triggerDeleteProductor ON Productor
    INSTEAD OF DELETE
    as
    begin
        declare @productorID int, @fincaID int
        select @productorID = ProductorID from deleted;

        declare crsFinca cursor for select FincaID from Finca where Finca.ProductorID  = @productorID;

        open crsFinca
        fetch next from crsFinca into @fincaID

        while @@FETCH_STATUS = 0
            begin
                declare crsLote cursor for select LoteID from Lote where Lote.FincaID = @fincaID
                declare @loteID int

                open crsLote; fetch next from crsLote into @loteID;

                while @@fetch_status = 0
                    begin
                        delete from Lote where LoteID = @loteID
                        fetch next from crsLote into @loteID
                    end

                close crsLote; deallocate crsLote;

                delete from Finca where FincaID = @fincaID;
                fetch next from crsFinca into @fincaID
            end
        close crsFinca; deallocate crsFinca;

        delete from Productor where ProductorID = @productorID
    end
go


