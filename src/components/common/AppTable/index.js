import MUIDataTable from "mui-datatables";
import React from "react";
import { useTheme } from "styled-components";
import { log } from "../../../utils/app.debug";

export default function AppTable({ title, data, columns, options }) {
  const theme = useTheme();

  const defaultTableOptions = {
    selectableRows: false,
    elevation: 0,
    filter: false,
    download: false,
    rowHover: false,
    print: false,
    search: false,
    resizableColumns: false,
    setTableProps: () => {
      return {
        size: "small",
      };
    },
    textLabels: {
      body: {
        noMatch: "No records",
      },
    },
  };

  const defaultColumnOptions = {
    setCellProps: () => ({
      style: {
        whiteSpace: "normal",
        wordWrap: "break-word",
        fontSize: 12,
      },
    }),
    setCellHeaderProps: (value) => ({
      style: { color: theme.colors.primary.graphite },
    }),
  };

  var newColumns = columns?.map((col, index) => {
    if (typeof col == "string") {
      const newCol = {
        label: col,
        options: defaultColumnOptions,
      };
      return newCol;
    } else {
      const { options, ...rest } = col;
      const newCol = {
        ...rest,
        options: {
          ...defaultColumnOptions,
          ...options,
        },
      };
      return newCol;
    }
  });

  log("AppTable Columns", columns);
  log("AppTable Data", data);

  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={newColumns}
      options={{ ...defaultTableOptions, ...options }}
    />
  );
}
