import React from "react";
import { Grid } from "@material-ui/core";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { useDispatch, useSelector } from "react-redux";
import { H1, H4 } from "../../StyledComponents/StyledHeadings";
import theme from "../../theme";
import Columns from "../../components/common/Columns/Columns";
import { licenseTableHeads, userRoles } from "../../constants/constants";
import { log } from "../../utils/app.debug";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import LicenceTable from "./components/LicenceTable";
import LicenseFilter from "./components/LicenseFilter";
import { useNavigate } from "react-router-dom";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import CustomPagination from "../../components/common/Pagination/CustomPagination";

function Licences() {
  const license = useSelector(state => state.licenceKey)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  log("LIcEnSE..", license)

  React.useEffect(() => {
    dispatch(fetchLicenceKeys(5, license?.getLicenseKey?.data?.page))
  }, []);

  const getStableTableColumnHead = () => {
    let tableHead = licenseTableHeads;
    if (user?.userProfile?.data?.userRole !== userRoles.PARTNER_ADMIN) {
      return tableHead.filter((itm) => itm.title !== "ACCOUNT NAME")
    }
    return tableHead
  }

  return (
    <MainContainer>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <H1>Licenses</H1>
          <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
            List of all licenses
          </H4>
        </Grid>
        <Grid item>
          <Columns columns={getStableTableColumnHead()} />
        </Grid>
      </Grid>

      {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ?
        <FilterCreate
          filterComponent={<LicenseFilter />}
          createComponent={() => navigate('/add-licences')}
          btnTitle={"Create new license"}
        /> :
        <Grid style={{ margin: '30px 0px' }} />
      }

      <CommonDataLoadErrorSuccess
        error={license?.getLicenseKey?.error}
        loading={license?.getLicenseKey?.loading}
        onClickTryAgain={() => dispatch(5, license?.getLicenseKey?.data?.page)}
      >
        <LicenceTable data={license?.getLicenseKey?.data?.docs || []} licenseTableHead={getStableTableColumnHead()} />
        {license?.getLicenseKey?.data?.totalDocs <= 5 ? "" :
          <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
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
          </Grid>}
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}

export default Licences;
