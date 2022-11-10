import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDataLoadErrorSuccess from "../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterComponent from "../../../components/common/FilterComponent/FilterComponent";
import CustomPagination from "../../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../../components/common/Pagination/PaginationCount";
import {
  getCompanyEncodesAction,
  getCompanyEncodesExportsAction,
} from "../../../stores/actions/CompanyActions";
import { SubHeading } from "../../../StyledComponents/StyledHeadings";
import * as actionTypes from "../../../stores/actions/actionTypes";
import CompanyEncodesFilter from "./Components/CompanyEncodesFilter";
import AppTable from "../../../components/common/AppTable";

export default function EncodesByCompany() {
  const dispatch = useDispatch();
  const companyEncodes = useSelector((state) => state.company.companyEncodes);

  // const [state, setState] = React.useState({
  //   currentSortBy: "",
  //   currentIsAscending: "",
  // });

  React.useEffect(() => {
    dispatch(getCompanyEncodesAction(10, companyEncodes?.data?.page));
  }, [companyEncodes?.dates?.startDate, companyEncodes?.dates?.endDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExport = (format) => {
    dispatch(getCompanyEncodesExportsAction(format, 2000, 1));
  };

  const columns = [
    {
      name: "companyName",
      label: "COMPANY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "encodes",
      label: "ENCODES",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
  ];

  const createStableEncodeByCompanyData = () => {
    const companyEncodedData = companyEncodes?.data?.docs?.map((data) => ({
      companyName: data?.name,
      encodes: data?.encodesCount,
    }));
    return companyEncodedData;
  };

  return (
    <Grid style={{ backgroundColor: "white", padding: "30px 40px" }}>
      <SubHeading>Encodes by company</SubHeading>
      <PaginationCount
        name="encodes by company"
        heading={true}
        total={companyEncodes?.data?.totalDocs}
        start={companyEncodes?.data?.offset}
        end={companyEncodes?.data?.docs?.length}
      />

      <Grid style={{ marginTop: "40px" }}>
        <FilterComponent
          startDate={companyEncodes?.dates?.startDate}
          onChangeStartDate={(date) =>
            dispatch({
              type: actionTypes.SET_COMPANYENCODES_DATES,
              data: { ...companyEncodes?.dates, startDate: date },
            })
          }
          endDate={companyEncodes?.dates?.endDate}
          onChangeEndDate={(date) =>
            dispatch({
              type: actionTypes.SET_COMPANYENCODES_DATES,
              data: { ...companyEncodes?.dates, endDate: date },
            })
          }
          filterComponent={<CompanyEncodesFilter />}
          exportData={(value) => handleExport(value)}
        />
      </Grid>

      <CommonDataLoadErrorSuccess
        error={companyEncodes?.error}
        loading={companyEncodes?.loading}
        onClickTryAgain={() =>
          dispatch(getCompanyEncodesAction(10, companyEncodes?.data?.page))
        }
      >
        <AppTable
          title={
            <PaginationCount
              name="encodes by company"
              total={companyEncodes?.data?.totalDocs}
              start={companyEncodes?.data?.offset}
              end={companyEncodes?.data?.docs?.length}
            />
          }
          columns={columns}
          data={createStableEncodeByCompanyData()}
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
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <PaginationCount
              name="encodes by company"
              total={companyEncodes?.data?.totalDocs}
              start={companyEncodes?.data?.offset}
              end={companyEncodes?.data?.docs?.length}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={companyEncodes?.data?.totalPages}
              page={companyEncodes?.data?.page}
              onChange={(e, value) =>
                dispatch(getCompanyEncodesAction(10, value))
              }
            />
          </Grid>
        </Grid>
      </CommonDataLoadErrorSuccess>
    </Grid>
  );
}
