import React from "react";
import { Grid, Tooltip } from "@material-ui/core";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { useDispatch, useSelector } from "react-redux";
import { Content, Heading, SubHeading } from "../../StyledComponents/StyledHeadings";
import { userRoles } from "../../constants/constants";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import LicenseFilter from "./components/LicenseFilter";
import { useNavigate } from "react-router-dom";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import AppTable from "../../components/common/AppTable";
import { format } from "date-fns";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTheme } from "styled-components";

function Licences() {
  const license = useSelector((state) => state.licenceKey);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(fetchLicenceKeys(5, license?.getLicenseKey?.data?.page));
  }, []);

  let columns = [
    {
      name: "accountName",
      label: "ACCOUNT NAME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "maxUsesEncode",
      label: "MAX USES ENCODE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "maxUsesMonitor",
      label: "MAX USES MONITOR",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "accountType",
      label: "ACCOUNT TYPE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "users",
      label: "USERS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "renewalDate",
      label: "RENEWAL DATE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "licenseName",
      label: "LICENSE NAME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "key",
      label: "KEY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "actionData",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <Tooltip title="View Licenses">
              <VisibilityIcon
                fontSize={"small"}
                style={{ color: theme.colors.secondary.main, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/edit-licences/${value?._id}`, { state: value })
                }
              />
            </Tooltip>
          );
        },
      },
    },
  ];

  const getStableTableColumnHead = () => {
    if (
      user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN &&
      user?.userProfile?.data?.userRole !== userRoles.COMPANY_ADMIN
    ) {
      return columns.filter(
        (itm) => itm?.label !== "ACCOUNT NAME" && itm?.label !== "ACTION"
      );
    } else if (user?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) {
      return columns.filter((itm) => itm?.label !== "ACCOUNT NAME");
    }
    return columns;
  };

  const createStableLicenseTableData = () => {
    const licenses = license?.getLicenseKey?.data?.docs?.map((row) => ({
      accountName: row?.company?.name || row?.users?.map((u) => u.username),
      maxUsesEncode:
        row?.isUnlimitedEncode === true ? "Unlimited" : row?.encodeUses,
      maxUsesMonitor:
        row?.isUnlimitedMonitor === true ? "Unlimited" : row?.monitoringUses,
      accountType: row?.type,
      users: row?.users?.length,
      renewalDate: format(new Date(row?.validity), "dd/MM/yyyy"),
      licenseName: row?.name,
      key: row?.key,
      status: row?.suspended === true ? "SUSPENDED" : "ACTIVE",
      actionData: row,
    }));
    return licenses;
  };

  return (
    <MainContainer>
      {/* Header------------------------------------------------------- */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Licenses</SubHeading>
          <Content
            
          >
            List of all licenses
          </Content>
        </Grid>
      </Grid>
      {/* Header------------------------------------------------------- */}

      {/* Filter--------------------------------------------------------- */}
      {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ? (
        <FilterCreate
          filterComponent={<LicenseFilter />}
          createComponent={() => navigate("/add-licences")}
          btnTitle={"Create new license"}
        />
      ) : (
        <Grid style={{ margin: "30px 0px" }} />
      )}
      {/* Filter--------------------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={license?.getLicenseKey?.error}
        loading={license?.getLicenseKey?.loading}
        onClickTryAgain={() => dispatch(5, license?.getLicenseKey?.data?.page)}
      >
        {/* Table----------------------------------------------- */}
        <AppTable
          title={
            <PaginationCount
              name="license"
              total={license?.getLicenseKey?.data?.totalDocs}
              start={license?.getLicenseKey?.data?.offset}
              end={license?.getLicenseKey?.data?.docs?.length}
            />
          }
          columns={getStableTableColumnHead()}
          data={createStableLicenseTableData()}
          options={{
            count: license?.getLicenseKey?.data?.docs?.length || 0,
            customFooter: () => {
              return null;
            },
          }}
        />
        {/* Table----------------------------------------------- */}

        {/* Pagination------------------------------------------- */}
        {license?.getLicenseKey?.data?.totalDocs <= 5 ? (
          ""
        ) : (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            style={{ marginTop: "30px" }}
          >
            <Grid item xs={12} sm={4} md={6}>
              <PaginationCount
                name="license"
                total={license?.getLicenseKey?.data?.totalDocs}
                start={license?.getLicenseKey?.data?.offset}
                end={license?.getLicenseKey?.data?.docs?.length}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
              <CustomPagination
                count={license?.getLicenseKey?.data?.totalPages}
                page={license?.getLicenseKey?.data?.page}
                onChange={(e, value) => dispatch(fetchLicenceKeys(5, value))}
              />
            </Grid>
          </Grid>
        )}
        {/* Pagination------------------------------------------- */}
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}

export default Licences;
