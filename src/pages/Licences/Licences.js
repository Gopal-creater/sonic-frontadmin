import React from "react";
import { Grid } from "@material-ui/core";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../components/common/AppButton/AppButton";
import { H1, H4 } from "../../StyledComponents/StyledHeadings";
import { LicenseContainer, LicenseBox } from "./LicenseStyled";
import theme from "../../theme";
import Columns from "../../components/common/Columns/Columns";
import { licenseTableHeads } from "../../constants/constants";
import { log } from "../../utils/app.debug";
import { TuneOutlined } from "@material-ui/icons";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import LicenceTable from "./components/LicenceTable";
import LicenseFilter from "./components/LicenseFilter";
import { useNavigate } from "react-router-dom";

function Licences() {
  const [state, setState] = React.useState({
    tableHead: licenseTableHeads,
    open: false,
    openFilter: false,
  })

  const license = useSelector(state => state.licenceKey)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  log("LICENSE", license)

  React.useEffect(() => {
    dispatch(fetchLicenceKeys())
  }, []);

  const createStableLicenseData = () => {
    const licenseKey = license?.data?.docs?.map((data) => {
      return (
        {
          maxUsesEncode: data?.isUnlimitedEncode === true ? "Unlimited" : data?.encodeUses,
          maxUsesMonitor: data?.isUnlimitedMonitor === true ? "Unlimited" : data?.monitoringUses,
          accountType: data?.type,
          renewalDate: data?.validity,
          licenseName: data?.name,
          licenseKey: data?.key,
          status: data?.suspended ? "SUSPENDED" : "ACTIVE",
        }
      )
    })
    // var arr = [{ key: "11", value: "1100" }, { key: "22", value: "2200" }];
    // var object = licenseKey.reduce(
    //   (obj, item) => Object.assign(obj, { [item]: item }), {});

    // console.log("Object-Array", object);
    // const customBody = [...licenseKey.keys()]
    // log("TABLE", customBody);
    return licenseKey
  }

  log("TABLE COMPONENT", createStableLicenseData());

  return (
    <LicenseContainer>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <H1>Licenses</H1>
          <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
            List of all licenses
          </H4>
        </Grid>
        <Grid item>
          <Columns columns={state.tableHead} />
        </Grid>
      </Grid>
      <LicenseBox>
        <AppButton
          variant={"none"}
          fontSize={18}
          startIcon={<TuneOutlined />}
          onClick={() => setState({ ...state, openFilter: true })}
        >
          Filter
        </AppButton>
        <AppButton
          variant="fill"
          fontSize={15}
          onClick={() => navigate('/add-licences')}
          style={{ height: 45, padding: "0px 30px" }}
        >
          Create new license
        </AppButton>
      </LicenseBox>

      <CommonDataLoadErrorSuccess
        error={license.error}
        loading={license.loading}
        onClickTryAgain={() => dispatch(fetchLicenceKeys())}
      >
        <LicenceTable data={license.data?.docs} licenseTableHead={state.tableHead} />
      </CommonDataLoadErrorSuccess>

      <LicenseFilter open={state?.openFilter} setOpen={(flag) => setState({ ...state, openFilter: flag })} />
    </LicenseContainer>
  );
}

export default Licences;
