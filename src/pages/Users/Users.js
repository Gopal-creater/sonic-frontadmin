import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import { userRoles } from "../../constants/constants";
import { getUsersAction } from "../../stores/actions/UserActions";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import { log } from "../../utils/app.debug";
import UsersFilter from "./components/UsersFilter";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import AppTable from "../../components/common/AppTable";
import Tooltip from "@material-ui/core/Tooltip";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useTheme } from "styled-components";

export default function Users() {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  log("USERS", users);

  React.useEffect(() => {
    dispatch(getUsersAction(5, users?.getUsers?.data?.page));
  }, []);

  let columns = [
    {
      name: "username",
      label: "USERNAME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "userID",
      label: "USER ID",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "email",
      label: "EMAIL",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "phoneNumber",
      label: "PHONE NUMBER",
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
          return (
            (users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
              getAccountType(value)) ||
            "--"
          );
        },
      },
    },
    {
      name: "accountName",
      label: "ACCOUNT NAME",
      options: {
        customBodyRender: (value) => {
          return (
            (users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
              getAccountName(value)) ||
            "--"
          );
        },
      },
    },
    {
      name: "companyName",
      label: "COMPANY NAME",
      options: {
        customBodyRender: (value) => {
          return (
            (users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN &&
              value) ||
            "--"
          );
        },
      },
    },
    {
      name: "userType",
      label: "USER TYPE",
      options: {
        customBodyRender: (value) => {
          return value === userRoles.PARTNER_ADMIN ||
            value === userRoles.COMPANY_ADMIN
            ? "Admin"
            : "Standard" || "--";
        },
      },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        customBodyRender: (value) => {
          return value ? "active" : "inactive";
        },
      },
    },
    {
      name: "actionData",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <Tooltip title="View">
              <VisibilityIcon
                fontSize={"small"}
                style={{ color: theme.colors.secondary.main, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/user-profile/${value?._id}`, {
                    state: value,
                  })
                }
              />
            </Tooltip>
          );
        },
      },
    },
  ];

  const createStableUserData = () => {
    const userData = users?.getUsers?.data?.docs?.map((data) => ({
      username: data?.username,
      userID: data?._id,
      email: data?.email,
      phoneNumber: data?.phone_number,
      accountType: data?.userRole,
      accountName: data,
      companyName: data?.company?.name,
      userType: data?.userRole,
      status: data?.enabled,
      actionData: data,
    }));
    return userData;
  };

  const getStableTableColumnHead = () => {
    if (users?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN) {
      return columns.filter((itm) => itm?.label !== "COMPANY NAME");
    } else if (users?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) {
      return columns.filter(
        (itm) => itm?.label !== "ACCOUNT NAME" && itm?.label !== "ACCOUNT TYPE"
      );
    }
    return columns;
  };

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
    <MainContainer>
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Users</SubHeading>
          <Content>Manage all users</Content>
        </Grid>
      </Grid>

      <FilterCreate
        filterComponent={<UsersFilter />}
        createComponent={() => navigate("/create-user")}
        btnTitle={"Create new user"}
      />

      <CommonDataLoadErrorSuccess
        error={users?.getUsers?.error}
        loading={users?.getUsers?.loading}
        onClickTryAgain={() => dispatch(getUsersAction())}
      >
        <AppTable
          title={
            <PaginationCount
              name="users"
              total={users?.getUsers?.data?.totalDocs}
              start={users?.getUsers?.data?.offset}
              end={users?.getUsers?.data?.docs?.length}
            />
          }
          columns={getStableTableColumnHead()}
          data={createStableUserData()}
          options={{
            customFooter: () => {
              return null;
            },
          }}
        />

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "30px" }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <PaginationCount
              name="users"
              total={users?.getUsers?.data?.totalDocs}
              start={users?.getUsers?.data?.offset}
              end={users?.getUsers?.data?.docs?.length}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={users?.getUsers?.data?.totalPages}
              page={users?.getUsers?.data?.page}
              onChange={(e, value) => dispatch(getUsersAction(5, value))}
            />
          </Grid>
        </Grid>
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
