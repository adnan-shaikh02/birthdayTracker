import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { themeQuartz } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AgGrid() {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs}
        theme={themeQuartz}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default AgGrid;
