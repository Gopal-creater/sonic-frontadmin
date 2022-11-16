import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import React from "react";
import { useTheme } from "styled-components";
import { log } from "../../../utils/app.debug";
import { ColumnTitle, Title } from "./styles";

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
    viewColumns: true,
    setTableProps: () => {
      return {
        size: "small",
        backgroundColor: "red",
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
        fontSize: theme.fontSize.caption,
        color: theme.background.contrastText,
        fontFamily: theme.fontFamily.robotoRegular,
      },
    }),
    setCellHeaderProps: () => ({
      style: {
        zIndex: 0,
        color: theme.background.contrastText,
        backgroundColor: theme.background.dark4,
      },
    }),
    customHeadLabelRender: (data) => {
      return <ColumnTitle>{data?.label}</ColumnTitle>;
    },
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

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableToolbar: {
          root: {
            backgroundColor: theme.background.dark4,
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: theme.background.dark4,
          },
        },
      },
    });

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title={<Title>{title}</Title>}
        data={data}
        columns={newColumns}
        options={{ ...defaultTableOptions, ...options }}
      />
    </MuiThemeProvider>
  );
}
