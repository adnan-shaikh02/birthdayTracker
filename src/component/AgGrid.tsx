import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo } from "react";
import { themeQuartz } from "ag-grid-community";
import type { header } from "./vaiableTypes";
import rNoorJson from "../data/source.json";
import shaikhJson from "../data/source1.json";
import * as XLSX from "xlsx";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface AgGridProps {
  locationHref: string;
}

function setJsonData(locationHref: string) {
  if (locationHref.includes("shaikh-family")) {
    return shaikhJson;
  } else {
    return rNoorJson;
  }
}

function AgGrid({ locationHref }: AgGridProps) {
  const [rowData] = useState<header[]>(
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    setJsonData(locationHref).map((item: any) => ({
      Month: item.month,
      Name: item.name,
      Date: item.date,
      Event: item.event,
    })),
  );

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
          href={subsButton(locationHref)}
          target="_blank"
          className="subscribe-button"
        >
          Follow Calendar
        </a>
      </div>
    </>
  );
}

function subsButton(locationHref: string) {
  if (locationHref.includes("shaikh-family")) {
    return "https://calendar.google.com/calendar/u/0?cid=ZjlhMzMxMTgzODBlNTRmMTUwZTg5MDg3MmE3YmUzZjQ4MzQ4YWI2NjhjYjZiMzY1NjIyZGQyZTMyN2U3ZmMxN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"; // Shaikh
  } else {
    return "https://calendar.google.com/calendar/u/0?cid=OTFmYWNjZmM2NDM0OTI1NjZhZWZjMTc2NDUyMWVkODU3YWQ2ZjNmZDRhM2RhYWJjMzBkMWEyNWU3OTQyZGEzMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t"; // R Noor
  }
}

export default AgGrid;
