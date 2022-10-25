import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  StyledTableData,
  StyledTableHead,
  StyledTableRow,
} from "../../../../StyledComponents/StyledTable/StyledTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actionTypes from "../../../../stores/actions/actionTypes";
import theme from "../../../../theme";

export default function MonitorCompaniesTable({
  data,
  companiesTableHeads,
  onCompaniesSorting,
}) {
  const dispatch = useDispatch();
  const monitor = useSelector((state) => state.monitor);
  const navigate = useNavigate();

  const sorting = (sortBy, isAscending, isActive) => {
    if (isActive) {
      if (isAscending === true) {
        onCompaniesSorting(sortBy, false, false);
      } else if (isAscending === false) {
        onCompaniesSorting(sortBy, true, false);
      } else if (isAscending === null) {
        onCompaniesSorting(sortBy, true, false);
      }
    } else {
      if (isAscending === true) {
        onCompaniesSorting(sortBy, false, true);
      } else if (isAscending === false) {
        onCompaniesSorting(sortBy, true, true);
      } else if (isAscending === null) {
        onCompaniesSorting(sortBy, true, true);
      }
    }
  };

  const onPlaysClick = (company) => {
    dispatch({
      type: actionTypes.SET_MONITOR_FILTERS,
      data: { ...monitor?.filters, company: company },
    });
    navigate("/monitor/plays");
  };

  return (
    <Grid>
      <TableContainer style={{ padding: "0rem 1rem 1rem 1rem" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {companiesTableHeads?.map((data, index) => {
                return (
                  <StyledTableHead
                    key={index}
                    onClick={() =>
                      sorting(data?.sortBy, data?.isAscending, data?.isActive)
                    }
                  >
                    {data?.title}{" "}
                    <i className="fa fa-sort" style={{ marginLeft: "5px" }}></i>
                  </StyledTableHead>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow key={0}>
                <StyledTableData colSpan={5} style={{ textAlign: "center" }}>
                  No Data
                </StyledTableData>
              </TableRow>
            ) : (
              data?.map((row, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    onClick={() => onPlaysClick(row?.comID)}
                    style={{ cursor: "pointer" }}
                    bgColor={
                      index % 2 !== 0 && theme.colors.secondary.tableColor
                    }
                  >
                    <StyledTableData
                      style={{
                        color: theme.colors.primary.main,
                        fontSize: theme.fontSize.subHeading,
                        fontFamily: theme.fontFamily.robotoBold,
                      }}
                    >
                      {row?.companyName || "---"}
                    </StyledTableData>
                    <StyledTableData
                      style={{
                        color: theme.colors.primary.main,
                        fontSize: theme.fontSize.subHeading,
                        fontFamily: theme.fontFamily.robotoBold,
                      }}
                    >
                      {row?.companyType || "---"}
                    </StyledTableData>
                    <StyledTableData>{row?.artist || "---"}</StyledTableData>
                    <StyledTableData>{row?.plays || "---"}</StyledTableData>
                    <StyledTableData>
                      {row?.uniquePlaysCount || "---"}
                    </StyledTableData>
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
