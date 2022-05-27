import { Grid } from "@material-ui/core"
import { H1, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, ProperAccessContainer } from "./CompanyProfileStyles"
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch";
import PersonIcon from '@material-ui/icons/Person';
import theme from "../../../theme";
import AppButton from "../../../components/common/AppButton/AppButton";
import React from "react";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { HelperText } from "../../Licences/LicenseStyled";
import { Controller, useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { useLocation } from "react-router-dom";
import { log } from "../../../utils/app.debug";



export default function CompanyProfile() {
    const { handleSubmit, control, reset } = useForm();

    const { state } = useLocation();
    log("company profile:", state)

    const updateCompanyProfile = () => {
        cogoToast.success("Company profile successfully updated.")
    }

    return (
        <MainContainer>

            <H1>Company profile</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Update company details
            </H4>

            <form onSubmit={handleSubmit(updateCompanyProfile)}>
                <Grid container spacing={6} className='mt-2'>
                    <Grid item xs={12} md={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>
                        <H4 className='mt-2'>Company details</H4>
                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Company name"}
                                value={state?.name}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Type"}
                                value={state?.companyType}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Company URN / ID"}
                                value={state?.companyUrnOrId}
                            />
                        </Grid>

                        <Grid container>
                            <Grid className='mt-5'>
                                <H4>Status</H4>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid>
                                <AppToggleSwitch
                                    size={121}
                                    checkedSize={70}
                                    active={"\"ACTIVE\""}
                                    inActive={"\"SUSPENDED\""}
                                // checked={state.checkedActive}
                                // onChange={(e) => setState({ ...state, checkedActive: e.target.checked })}
                                />
                            </Grid>
                        </Grid>
                    </Grid >

                    <Grid item xs={12} md={6}>
                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>
                        <H4 className='mt-2'>Admin details</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Type"}
                                value={"Admin"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 21 }}>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            id="standard-basic"
                                            label="Username*"
                                            value={state?.email}
                                            // onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                                            placeholder='Will Smith'
                                            autoComplete='off'
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Username is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 21 }}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            id="standard-basic"
                                            label="Email*"
                                            value={state?.email}
                                        // onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Email is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 21 }}>
                            <StyledTextField
                                fullWidth
                                id="standard-basic"
                                label="Phone number"
                                value={state?.contactNo}
                            // onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                            // helperText="Hint: GB-H01-02-12345."
                            />
                        </Grid>
                    </Grid >
                </Grid>

                <ProperAccessContainer>
                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                    // onClick={() => dispatch({ type: actionTypes.CLEAR_SELECTED_FILE })}
                    >
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px" }}>Update details</AppButton>
                </ButtonContainer>
            </form>
        </MainContainer >
    )
}
