import React from "react";
import { Grid } from "@material-ui/core";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { useDispatch, useSelector } from "react-redux";
import { H1, H4 } from "../../StyledComponents/StyledHeadings";
import theme from "../../theme";
import Columns from "../../components/common/Columns/Columns";
import { licenseTableHeads } from "../../constants/constants";
import { log } from "../../utils/app.debug";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import LicenceTable from "./components/LicenceTable";
import LicenseFilter from "./components/LicenseFilter";
import { useNavigate } from "react-router-dom";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";

function Licences() {
  const license = useSelector(state => state.licenceKey)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // log("LICENSE", license)

  React.useEffect(() => {
    dispatch(fetchLicenceKeys())
  }, []);

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
          <Columns columns={licenseTableHeads} />
        </Grid>
      </Grid>

      <FilterCreate
        filterComponent={<LicenseFilter />}
        createComponent={() => navigate('/add-licences')}
        btnTitle={"Create new license"}
      />

      <CommonDataLoadErrorSuccess
        error={license.error}
        loading={license.loading}
        onClickTryAgain={() => dispatch(fetchLicenceKeys())}
      >
        <LicenceTable data={license.data?.docs} licenseTableHead={licenseTableHeads} />
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}

export default Licences;
