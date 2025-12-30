import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo } from "react";
import { themeQuartz } from "ag-grid-community";
import type { header } from "./vaiableTypes";
import eventDetailJson from "../data/source.json";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function AgGrid() {
  const [rowData] = useState<header[]>(
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventDetailJson.map((item: any) => ({
      Month: item.month,
      Name: item.name,
      Date: item.date,
      Event: item.event,
    }))
  );

  // Column Definitions: Responsive columns
  const isSmallScreen = window.innerWidth < 768;
  const [colDefs] = useState<ColDef<header>[]>([
    { field: "Month", resizable: false, flex: isSmallScreen ? 0 : 1, rowDrag: false, suppressMovable: true },
    { field: "Name", resizable: false, flex: isSmallScreen ? 0 : 1, rowDrag: false, suppressMovable: true },
    { field: "Date", resizable: false, flex: isSmallScreen ? 0 : 1, rowDrag: false, suppressMovable: true },
    { field: "Event", resizable: false, flex: isSmallScreen ? 0 : 1, rowDrag: false, suppressMovable: true },
  ]);

  // Responsive container styles
  const containerStyle = useMemo(() => {
    const isSmallScreen = window.innerWidth < 768;
    return {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
      padding: isSmallScreen ? "10px" : "20px",
      flexgrow: isSmallScreen ? 0 : 1,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs}
        theme={themeQuartz}
        domLayout="autoHeight"
        suppressHorizontalScroll={false}
      />
    </div>
  );
}

export default AgGrid;
