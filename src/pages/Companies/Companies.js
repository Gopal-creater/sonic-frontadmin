import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import { companiesTableHeads } from "../../constants/constants";
import { getAllCompaniesAction } from "../../stores/actions/CompanyActions";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import CompanyFilter from "./components/CompanyFilter";
import CompanyTable from "./components/CompanyTable";

export default function Companies() {
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(getAllCompaniesAction(5, company?.data?.page));
  }, []);

  return (
    <MainContainer>
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Companies</SubHeading>
          <Content
            fontFamily={theme.fontFamily.robotoRegular}
            color={theme.colors.primary.teal}
          >
            Manage all companies
          </Content>
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
        <CompanyTable
          data={company.getAllCompanies?.data?.docs}
          companyTableHead={companiesTableHeads}
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
