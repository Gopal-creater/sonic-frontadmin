import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomToolTip from "../../../components/common/CustomToolTip";
import TableMenu from "../../../components/common/Table/components/TableMenu";
import { ActionMenuItem } from "../../../components/common/Table/TableStyled";
import { userRoles } from "../../../constants/constants";
import {
  ActiveBox,
  AlternateStyledTableData,
  StyledTableData,
  StyledTableHead,
  StyledTableRow,
  SuspendedBox,
} from "../../../StyledComponents/StyledTable/StyledTable";
import theme from "../../../theme";

export default function UsersTable({ data, usersTableHead }) {
  const users = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getAccountType = (roles) => {
    if (roles === userRoles.PARTNER_ADMIN || roles === userRoles.PARTNER_USER) {
      return "Partner";
    } else if (
      roles === userRoles.COMPANY_ADMIN ||
      roles === userRoles.COMPANY_USER
    ) {
      return "Company";
    }
    return null;
  };

  const getAccountName = (data) => {
    if (
      data?.userRole === userRoles.PARTNER_ADMIN ||
      data?.userRole === userRoles.PARTNER_USER
    ) {
      return data?.partner?.name;
    } else if (
      data?.userRole === userRoles.COMPANY_ADMIN ||
      data?.userRole === userRoles.COMPANY_USER
    ) {
      return data?.company?.name;
    }
    return null;
  };

  return (
    <Grid>
      <TableContainer style={{ padding: "0rem 1rem 1rem 1rem" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {usersTableHead?.map((data, index) => {
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
                <StyledTableData colSpan={9} style={{ textAlign: "center" }}>
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
                    {SelectedColumn("USERNAME") && (
                      <CustomToolTip title={data?.username || "---"}>
                        <StyledTableData
                          style={{
                            color: theme.colors.primary.navy,
                            fontSize: theme.fontSize.h4,
                            fontFamily: theme.fontFamily.nunitoSansBold,
                          }}
                        >
                          {data?.username || "---"}
                        </StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("USER ID") && (
                      <CustomToolTip title={data?._id || "---"}>
                        <StyledTableData>{data?._id || "---"}</StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("EMAIL") && (
                      <CustomToolTip title={data?.email || "---"}>
                        <StyledTableData>
                          {data?.email || "---"}
                        </StyledTableData>
                      </CustomToolTip>
                    )}
                    {SelectedColumn("PHONE NUMBER") && (
                      <StyledTableData>
                        {data?.phone_number || "---"}
                      </StyledTableData>
                    )}
                    {SelectedColumn("ACCOUNT TYPE") &&
                      users?.userProfile?.data?.userRole ===
                        userRoles.PARTNER_ADMIN && (
                        <StyledTableData>
                          {getAccountType(data?.userRole)}
                        </StyledTableData>
                      )}
                    {SelectedColumn("ACCOUNT NAME") &&
                      users?.userProfile?.data?.userRole ===
                        userRoles.PARTNER_ADMIN && (
                        <CustomToolTip title={getAccountName(data)}>
                          <StyledTableData>
                            {getAccountName(data)}
                          </StyledTableData>
                        </CustomToolTip>
                      )}
                    {SelectedColumn("COMPANY NAME") &&
                      users?.userProfile?.data?.userRole ===
                        userRoles.COMPANY_ADMIN && (
                        <CustomToolTip title={data?.company?.name || "---"}>
                          <AlternateStyledTableData>
                            {data?.company?.name || "---"}
                          </AlternateStyledTableData>
                        </CustomToolTip>
                      )}
                    {SelectedColumn("USER TYPE") && (
                      <StyledTableData>
                        {data?.userRole === userRoles.PARTNER_ADMIN ||
                        data?.userRole === userRoles.COMPANY_ADMIN
                          ? "Admin"
                          : "Standard"}
                      </StyledTableData>
                    )}
                    {SelectedColumn("STATUS") && (
                      <StyledTableData>
                        {data?.enabled === true ? (
                          <ActiveBox>ACTIVE</ActiveBox>
                        ) : (
                          <SuspendedBox>INACTIVE</SuspendedBox>
                        )}
                      </StyledTableData>
                    )}
                    {SelectedColumn("ACTION") && (
                      <StyledTableData>
                        <TableMenu>
                          <ActionMenuItem
                            onClick={() =>
                              navigate(`/user-profile/${data?._id}`, {
                                state: data,
                              })
                            }
                          >
                            View User
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
