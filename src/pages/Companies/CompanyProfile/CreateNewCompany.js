import { Grid } from "@material-ui/core"
import { H1, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, ProperAccessContainer } from "./CompanyProfileStyles"
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import PersonIcon from '@material-ui/icons/Person';
import theme from "../../../theme";
import AppButton from "../../../components/common/AppButton/AppButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { Controller, useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { HelperText } from "../../Licences/LicenseStyled";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import { companyType } from "../../../constants/constants";

export default function CreateNewCompany() {
    const { handleSubmit, control, reset } = useForm();
    const [state, setState] = React.useState({
        copyMetaData: false,
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        metaData: {
            title: "",
            contentSize: "",
            contentEncoding: "",
            contentType: "",
            artist: "",
            contentSamplingFrequency: "",
            contentQuality: "",
            isrcCode: "",
            iswcCode: "",
            tuneCode: "",
            contentDescription: "",
            distributor: "",
            contentFileType: "",
            label: "",
            additionalMetadata: {

            },
            contentDuration: "",
            isRightsHolderForEncode: null,
            isAuthorizedForEncode: null
        }
    })

    const createCompany = () => {
        cogoToast.success("Company created successly");
    }

    const navigate = useNavigate()

    return (
        <MainContainer>

            <H1>Create new company</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Add new company
            </H4>

            <form onSubmit={handleSubmit(createCompany)}>
                <Grid container spacing={6} className='mt-2'>
                    <Grid item xs={12} md={6}>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Company details</H4>

                        <Grid style={{ marginTop: 21 }}>
                            <Controller
                                name="companyname"
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
                                            label="Company name*"
                                            value={state?.metaData?.title}
                                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                                            // placeholder='Song,Video or Audio track title'
                                            autoComplete='off'
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Company name is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 17 }}>
                            <Controller
                                name="companytype"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <CustomDropDown
                                            labelText="Type*"
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                error: !!error,
                                                value: value,
                                                onChange: onChange,
                                            }}
                                            labelProps={{
                                                style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                            }}
                                            data={companyType || []}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Company type is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 17 }}>
                            <Controller
                                name="companyURNID"
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
                                            label="Company URN / ID"
                                            value={state?.metaData?.artist}
                                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, artist: e.target.value } }) }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Company URN / ID is required" }}
                            />
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
                                        className="mt-3"
                                        value={state?.metaData?.title}
                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, title: e.target.value } }) }}
                                        // placeholder='Song,Video or Audio track title'
                                        autoComplete='off'
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                            rules={{ required: "Username is required" }}
                        />

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
                                        className="mt-3"
                                        value={state?.metaData?.version}
                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                            rules={{ required: "Email is required" }}
                        />

                        <StyledTextField
                            fullWidth
                            id="standard-basic"
                            label="Phone number"
                            className="mt-3"
                            value={state?.metaData?.isrcCode}
                            onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, isrcCode: e.target.value } }) }}
                        // helperText="Hint: GB-H01-02-12345."
                        />
                    </Grid >
                </Grid>

                <ProperAccessContainer>

                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px" }}>Create new company</AppButton>
                </ButtonContainer>
            </form>
        </MainContainer >
    )
}
