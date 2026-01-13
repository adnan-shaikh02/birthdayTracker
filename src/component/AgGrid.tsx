import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo, useRef } from "react";
import { themeQuartz } from "ag-grid-community";
import type { header } from "./vaiableTypes";
import eventDetailJson from "../data/source.json";
import * as XLSX from "xlsx";

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

  const gridRef = useRef(null);

  const handleExportToExcel = () => {
    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(rowData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Birthday Events");

    // Generate filename with current date
    const fileName = `birthday-tracker-${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    // Download the file
    XLSX.writeFile(wb, fileName);
  };

  // Column Definitions: Responsive columns
  const isSmallScreen = window.innerWidth < 768;
  const [colDefs] = useState<ColDef<header>[]>([
    {
      field: "Month",
      resizable: false,
      flex: isSmallScreen ? 0 : 1,
      rowDrag: false,
      suppressMovable: true,
    },
    {
      field: "Name",
      resizable: false,
      flex: isSmallScreen ? 0 : 1,
      rowDrag: false,
      suppressMovable: true,
    },
    {
      field: "Date",
      resizable: false,
      flex: isSmallScreen ? 0 : 1,
      rowDrag: false,
      suppressMovable: true,
    },
    {
      field: "Event",
      resizable: false,
      flex: isSmallScreen ? 0 : 1,
      rowDrag: false,
      suppressMovable: true,
    },
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
    <>
      <div style={containerStyle}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          theme={themeQuartz}
          domLayout="autoHeight"
          suppressHorizontalScroll={false}
        />
      </div>
      <div className="subsBtn">
        <button onClick={handleExportToExcel} className="export-button">
          Export as Excel
        </button>
        <a
          href="https://calendar.google.com/calendar/u/0?cid=OTFmYWNjZmM2NDM0OTI1NjZhZWZjMTc2NDUyMWVkODU3YWQ2ZjNmZDRhM2RhYWJjMzBkMWEyNWU3OTQyZGEzMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          target="_blank"
          className="subscribe-button"
        >
          Follow Calendar
        </a>
      </div>
    </>
  );
}

export default AgGrid;
