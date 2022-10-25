import { Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import AppTable from "../../components/common/AppTable";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import { getAllCompaniesAction } from "../../stores/actions/CompanyActions";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import CompanyFilter from "./components/CompanyFilter";
import VisibilityIcon from "@material-ui/icons/Visibility";

export default function Companies() {
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(getAllCompaniesAction(5, company?.data?.page));
  }, []);

  const columns = [
    {
      name: "company",
      label: "COMPANY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "companyType",
      label: "COMPANY TYPE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "companyId",
      label: "COMPANY ID",
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
      name: "admin",
      label: "ADMIN",
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
          if (value) {
            return "active";
          } else {
            return "suspended";
          }
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
                style={{ color: theme.colors.primary.teal, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/company-profile/${value?._id}`, {
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

  const createStableCompanyData = () => {
    const companyData = company.getAllCompanies?.data?.docs?.map((data) => ({
      company: data?.name,
      companyType: data?.companyType,
      companyId: data?._id,
      email: data?.owner?.email,
      phoneNumber: data?.owner?.phone_number,
      admin: data?.owner?.username,
      status: data?.enabled,
      actionData: data,
    }));
    return companyData;
  };

  return (
    <MainContainer>
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Companies</SubHeading>
          <Content>Manage all companies</Content>
        </Grid>
      </Grid>

      <FilterCreate
        filterComponent={<CompanyFilter />}
        createComponent={() => navigate("/create-company")}
        btnTitle={"Create new company"}
      />

      <CommonDataLoadErrorSuccess
        error={company.getAllCompanies.error}
        loading={company.getAllCompanies.loading}
        onClickTryAgain={() => dispatch(getAllCompaniesAction())}
      >
        <AppTable
          title={
            <PaginationCount
              name="users"
              total={company?.getAllCompanies?.data?.totalDocs}
              start={company?.getAllCompanies?.data?.offset}
              end={company?.getAllCompanies?.data?.docs?.length}
            />
          }
          columns={columns}
          data={createStableCompanyData()}
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
              total={company?.getAllCompanies?.data?.totalDocs}
              start={company?.getAllCompanies?.data?.offset}
              end={company?.getAllCompanies?.data?.docs?.length}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={company?.getAllCompanies?.data?.totalPages}
              page={company?.getAllCompanies?.data?.page}
              onChange={(e, value) => dispatch(getAllCompaniesAction(5, value))}
            />
          </Grid>
        </Grid>
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
