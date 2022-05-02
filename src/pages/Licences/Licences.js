import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import AddLicence from "./components/AddLicence";
import { fetchLicenceKeys } from "../../stores/actions/licenceKey";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import SonicSpinner from "../../components/common/SonicSpinner";
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

const useStyles = makeStyles((theme) => ({
  //TABLE
  table: {
    minWidth: 700,
    marginTop: 30,
    width: "100%",
  },
  tableHead: {
    color: "#ACACAC",
    fontSize: 12,
    fontFamily: "NunitoSans-Bold",
  },
  key: {
    color: "#343F84",
    fontSize: 18,
    fontFamily: "NunitoSans-Bold",
    paddingTop: 25,
    paddingBottom: 25,
  },
  tableCellColor: {
    color: "#343F84",
    fontSize: 14,
    fontFamily: "NunitoSans-Bold",
  },
  tableCellNormalText: {
    fontSize: 14,
    fontFamily: "NunitoSans-Regular",
    color: "#757575",
  },
}));

function Licences(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    tableHead: licenseTableHeads,
    open: false,
  })

  const license = useSelector(state => state.licenceKey)
  const dispatch = useDispatch()
  log("LICENSE", license)

  React.useEffect(() => {
    dispatch(fetchLicenceKeys())
  }, []);

  // const createStableLicenseData = () => {
  //   const licenseKey = license?.data?.docs?.map((data) => {
  //     return (
  //       {
  //         id: data?._id,
  //         key: data?.key,
  //         encodeUses: data?.encodeUses,
  //         maxEncodeUses: data?.maxEncodeUses,
  //         isUnlimitedMonitor: data?.isUnlimitedMonitor,
  //         monitoringUses: data?.monitoringUses,
  //         validity: data?.validity,
  //         suspended: data?.suspended
  //       }
  //     )
  //   })
  //   return licenseKey
  // }

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
        >
          Filter
        </AppButton>
        <AppButton
          variant="fill"
          fontSize={15}
          onClick={() => setState({ ...state, open: true })}
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

      <AddLicence open={state?.open} setOpen={(flag) => setState({ ...state, open: flag })} />
    </LicenseContainer>
  );
}

export default Licences;
