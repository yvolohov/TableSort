function yvTableSorter(tableId, headRows)
{
    this.tableId = tableId;
    this.headRows = (headRows !== undefined) ? headRows : 0;    
}

yvTableSorter.prototype = 
{
    ASC : true,
    DESC : false,
    
    NUMBER : 1,
    STRING : 0,
       
    /* colIndex : индекс колонки сортировки
     * direction : по-возрастанию ASC или по-убыванию DESC 
     * asNumber : сортировать как NUMBER или STRING */
    sort : function(colIndex, type, direction)
    {
        var table = this.readTable();
        table.sort(this.getSorter(colIndex, type, direction));
        this.writeTable(table);
    },
    
    getSorter : function(colIndex, type, direction)
    {
        return function(a, b)
        {
            var va = (type === this.NUMBER) ? Number(a[colIndex]) : a[colIndex];
            var vb = (type === this.NUMBER) ? Number(b[colIndex]) : b[colIndex];
        
            if (direction && va > vb) return 1;
            else if (direction && va < vb) return -1;
            else if (!(direction) && va > vb) return -1;
            else if (!(direction) && va < vb) return 1;
            else return 0;
        };
    },
    
    readTable : function()
    {
        var table = new Array();
        var rows = $(this.tableId + " tr");
        
        for (var rowCount = this.headRows; rowCount < rows.length; rowCount++)
        {            
            var rowIndex = rowCount - this.headRows;          
            var cells = $(rows[rowCount]).find("th, td");
            table[rowIndex] = new Array();
            
            for (var cellCount = 0; cellCount < cells.length; cellCount++)
            {
                table[rowIndex][cellCount] = cells[cellCount].innerHTML;
            }
        }        
        return table;
    },
    
    writeTable : function(table)
    {
        var rows = $(this.tableId + " tr");
        
        for (var rowCount = this.headRows; rowCount < rows.length; rowCount++)
        {
            var rowIndex = rowCount - this.headRows;
            var cells = $(rows[rowCount]).find("th, td");
            
            for (var cellCount = 0; cellCount < cells.length; cellCount++)
            {
                cells[cellCount].innerHTML = table[rowIndex][cellCount];
            }            
        }       
    }
};