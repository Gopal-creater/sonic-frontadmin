import React from "react";
import { Avatar, CircularProgress, FormControl, FormLabel, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { MusicNote, PermIdentity } from "@material-ui/icons";
import cogoToast from "cogo-toast";
import { useLocation, useNavigate } from "react-router-dom";
import AppButton from "../../../components/common/AppButton/AppButton";
import { CustomRadioButton } from "../../../components/common/AppRadioButton/AppRadioButton";
import CustomDatePicker from "../../../components/common/FilterComponent/components/CustomDatePicker";
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import theme from "../../../theme";
import { log } from "../../../utils/app.debug";
import { BorderBottom, RadioLabel, TuneBox } from "../LicenseStyled";
import AddNewUser from "./AddNewUser";
import KeyValue from "./KeyValue";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import { updateLicenceKey } from "../../../services/https/resources/License.api";

export default function EditLicense() {
    const { state } = useLocation();
    const navigate = useNavigate()

    const [license, setLicense] = React.useState(state)
    const [values, setValues] = React.useState({
        loading: false,
        isActive: license.suspended ? false : true,
    })

    const handleEditLicense = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true })

        let payload = {
            ...license,
            suspended: values.isActive ? false : true,
        }

        updateLicenceKey(license?._id, payload).then((res) => {
            setLicense(res)
            setValues({ ...values, loading: false })
            cogoToast.success("License updated successfully!")
        }).catch((err) => {
            log("License update error", err)
            setValues({ ...values, loading: false })
            cogoToast.error(err?.message)
        })
    }

    return (
        <MainContainer>
            <H1>Edit license</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Edit license
            </H4>

            <form onSubmit={handleEditLicense}>
                <Grid container spacing={6} direction="row">
                    <Grid item xs={12} md={6}>
                        <Grid container direction="column" className="mt-4">
                            <Grid item container>
                                <TuneBox>
                                    <MusicNote style={{ color: `${theme.colors.primary.teal}` }} />
                                </TuneBox>
                            </Grid>

                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{ color: theme.colors.primary.graphite, fontFamily: theme.fontFamily.nunitoSansBold, fontSize: '18px' }}>
                                    License details
                                </FormLabel>
                                <RadioLabel checked control={<CustomRadioButton />} label={`${license?.type} license`} disabled />
                            </FormControl>

                            <Grid item xs={12} md={12} style={{ marginTop: "15px" }}>
                                <DisabledTextField
                                    label={license?.type === "Company" ? "Company" : "User"}
                                    value={(license?.type === "Company" ? license?.company?.name : license?.users?.map(u => u.username)) || ""}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <StyledTextField
                                    fullWidth
                                    label="License name*"
                                    value={license?.name}
                                    onChange={(e) => setLicense({ ...license, name: e.target.value })}
                                    style={{ marginTop: "15px" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <StyledTextField
                                    fullWidth
                                    label="Max Uses Encode"
                                    spinner={"true"}
                                    type="number"
                                    value={license?.isUnlimitedEncode ? Number.POSITIVE_INFINITY : license?.maxEncodeUses}
                                    placeholder={license?.isUnlimitedEncode ? "Unlimited" : "eg. 100"}
                                    onChange={(e) => setLicense({ ...license, maxEncodeUses: e.target.value })}
                                    style={{ marginTop: "15px" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={license?.isUnlimitedEncode}
                                />
                            </Grid>

                            <Grid item xs={12} md={8}>
                                <StyledTextField
                                    fullWidth
                                    label="Max Uses Monitor"
                                    spinner={"true"}
                                    type="number"
                                    value={license?.isUnlimitedMonitor ? Number.POSITIVE_INFINITY : license?.maxMonitoringUses}
                                    placeholder={license?.isUnlimitedMonitor ? "Unlimited" : "eg. 100"}
                                    onChange={(e) => setLicense({ ...license, maxMonitoringUses: e.target.value })}
                                    style={{ marginTop: "15px" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled={license?.isUnlimitedMonitor}
                                />
                            </Grid>

                            <Grid item xs={12} md={8} style={{ marginTop: 15 }}>
                                <CustomDatePicker
                                    selected={new Date(license?.validity)}
                                    onChange={(date) => setLicense({ ...license, validity: date })}
                                    title="Renewal Date*"
                                    fullWidth={true}
                                    showYearDropdown
                                    showMonthDropdown
                                />
                            </Grid>
                        </Grid>

                        <Grid className="mt-3">
                            <KeyValue
                                data={license?.metaData}
                                onChangeData={(newData) => {
                                    setLicense({ ...license, metaData: newData });
                                }}
                                containerStyle={{ marginTop: 5 }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Grid container direction="column" className="mt-4">
                            <Grid item container>
                                <TuneBox>
                                    <PermIdentity style={{ color: `${theme.colors.primary.teal}` }} />
                                </TuneBox>
                            </Grid>

                            <H4 component="legend" style={{ color: theme.colors.primary.graphite, fontFamily: theme.fontFamily.nunitoSansBold, fontSize: '18px' }}>
                                Users ({license?.users?.length})
                            </H4>
                            <List style={{ padding: 0 }}>
                                {license?.users?.map((user, index) => (
                                    <ListItem alignItems="flex-start" key={index} style={{ padding: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar style={{ backgroundColor: theme.colors.secondary.lightGrey }}>
                                                <PermIdentity style={{ color: `${theme.colors.secondary.grey}` }} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user?.username || user?.sub}
                                            secondary={user?.email || "--"}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            {license?.type === "Company" &&
                                <Grid className="mt-2">
                                    <AddNewUser license={license} setLicense={(data) => setLicense(data)} />
                                </Grid>}

                        </Grid>
                    </Grid>
                </Grid>

                <H4 className="mt-4">Status</H4>

                <Grid container spacing={2} className="mt-1">
                    <Grid item>
                        <AppToggleSwitch
                            size={169}
                            checkedSize={102}
                            active={"\"UNLIMITED ENCODE\""}
                            inActive={"\"LIMITED ENCODE\""}
                            checked={license?.isUnlimitedEncode}
                            onChange={(e) => setLicense({ ...license, isUnlimitedEncode: e.target.checked })}
                        />
                    </Grid>

                    <Grid item>
                        <AppToggleSwitch
                            size={175}
                            checkedSize={106}
                            active={"\"UNLIMITED MONITOR\""}
                            inActive={"\"LIMITED MONITOR\""}
                            checked={license?.isUnlimitedMonitor}
                            onChange={(e) => setLicense({ ...license, isUnlimitedMonitor: e.target.checked })}
                        />
                    </Grid>

                    <Grid item>
                        <AppToggleSwitch
                            size={121}
                            checkedSize={70}
                            active={"\"ACTIVE\""}
                            inActive={"\"SUSPENDED\""}
                            // checked={license.suspended}
                            // onChange={(e) => setLicense({ ...license, suspended: e.target.checked })}
                            checked={values.isActive}
                            onChange={(e) => setValues({ ...values, isActive: e.target.checked })}
                        />
                    </Grid>
                </Grid>

                <BorderBottom />

                <Grid container className="mt-3 mb-2" justifyContent="flex-end">
                    <AppButton variant={"outline"} onClick={() => navigate(-1)} disabled={values.loading}>
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "180px" }}>
                        {values.loading ? <CircularProgress size={20} color="white" /> : "Update details"}
                    </AppButton>
                </Grid>
            </form>
        </MainContainer >
    );
}
