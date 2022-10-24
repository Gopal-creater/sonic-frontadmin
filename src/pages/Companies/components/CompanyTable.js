import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import CustomToolTip from "../../../components/common/CustomToolTip";
import {
  ActiveBox,
  StyledTableData,
  StyledTableHead,
  StyledTableRow,
  SuspendedBox,
} from "../../../StyledComponents/StyledTable/StyledTable";

export default function CompanyTable({ data, companyTableHead }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid>
      <TableContainer style={{ padding: "0rem 1rem 1rem 1rem" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {companyTableHead?.map((data, index) => {
                const isChecked = SelectedColumn(data?.title);
                if (isChecked)
                  return (
                    <StyledTableHead align="left" key={index}>
                      {data?.title}
                    </StyledTableHead>
                  );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.length === 0 ? (
              <TableRow key={0}>
                <StyledTableData colSpan={8} style={{ textAlign: "center" }}>
                  No Data
                </StyledTableData>
              </TableRow>
            ) : (
              data?.map((data, index) => {
                return (
                  <StyledTableRow
                    key={index}
                    bgColor={
                      index % 2 !== 0 && theme.colors.secondary.tableColor
                    }
                  >
                    {SelectedColumn("COMPANY") && (
                      <CustomToolTip title={data?.name || "---"}>
                        <StyledTableData>{data?.name || "---"}</StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("COMPANY TYPE") && (
                      <CustomToolTip title={data?.companyType || "---"}>
                        <StyledTableData>
                          {data?.companyType || "---"}
                        </StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("COMPANY ID") && (
                      <CustomToolTip title={data?._id || "---"}>
                        <StyledTableData>{data?._id || "---"}</StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("EMAIL") && (
                      <CustomToolTip title={data?.owner?.email || "---"}>
                        <StyledTableData>
                          {data?.owner?.email || "---"}
                        </StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("PHONE NUMBER") && (
                      <StyledTableData>
                        {data?.owner?.phone_number || "---"}
                      </StyledTableData>
                    )}
                    {SelectedColumn("ADMIN") && (
                      <CustomToolTip title={data?.owner?.username || "---"}>
                        <StyledTableData>
                          {data?.owner?.username || "---"}
                        </StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("STATUS") && (
                      <StyledTableData>
                        {data?.enabled === true ? (
                          <ActiveBox>ACTIVE</ActiveBox>
                        ) : (
                          <SuspendedBox>SUSPENDED</SuspendedBox>
                        )}
                      </StyledTableData>
                    )}
                    {SelectedColumn("ACTION") && (
                      <StyledTableData>
                        <TableMenu>
                          <ActionMenuItem
                            onClick={() =>
                              navigate(`/company-profile/${data?._id}`, {
                                state: data,
                              })
                            }
                          >
                            View Company
                          </ActionMenuItem>
                        </TableMenu>
                      </StyledTableData>
                    )}
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
