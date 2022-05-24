import { FormControlLabel, Grid, IconButton, InputAdornment } from "@material-ui/core"
import { ControlPoint, Visibility, VisibilityOff } from "@material-ui/icons"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import { ButtonContainer, CheckBoxLabelContainer, IconBox, ProperAccessContainer } from "./CreateUserStyles";
import { H1, H4, H5 } from "../../../StyledComponents/StyledHeadings";
import { StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import theme from "../../../theme";
import AppCheckBox from "../../../components/common/AppCheckBox";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import cogoToast from "cogo-toast";
import { accountType, companyType, countries, userType } from "../../../constants/constants";
import { HelperText } from "../../Licences/LicenseStyled";
import { log } from "../../../utils/app.debug";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import PhoneCode from "../../../components/common/AppTextInput/PhoneCode";


export default function CreateUser() {
    const { handleSubmit, control, reset } = useForm();
    const [state, setState] = React.useState({
        accountType: "Partner",
        defaultCountryCode: "+44",
        companyDetails: false,
        showPassword: false,
    })
    const navigate = useNavigate()

    const handleOnCreateUser = (data) => {
        log("Update user", data)
        cogoToast.success("user added");
    }

    return (
        <MainContainer>
            <H1>Create user</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Add new user
            </H4>

            <form onSubmit={handleSubmit(handleOnCreateUser)}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Grid container >
                            <IconBox>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>User details</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="userName"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Username*"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            autoComplete='off'
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Username is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="accountType"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <CustomDropDown
                                            labelText="Account type*"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                error: !!error,
                                                value: value,
                                                onChange: onChange,
                                            }}
                                            labelProps={{
                                                style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                            }}
                                            data={accountType || []}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Account type is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
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
                                            label="Email*"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Email is required" }}
                            />
                        </Grid>

                        <Grid>
                            <FormControlLabel
                                control={
                                    <AppCheckBox
                                    // checked={state.copyMetaData}
                                    // onChange={() => setState({ ...state, copyMetaData: !state.copyMetaData })}
                                    />
                                }
                                label={
                                    <CheckBoxLabelContainer>
                                        <H5 color={theme.colors.secondary.lightNavy}>
                                            Mark email as verified*
                                        </H5>
                                    </CheckBoxLabelContainer>
                                }
                            />
                        </Grid>

                        <Grid>
                            <Grid className="mt-4">
                                <Controller
                                    // name="accountType"
                                    control={control}
                                    defaultValue=""
                                    // onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, accountType: e.target.value } }) }}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Grid style={{ backgroundColor: "", }}>
                                            <span
                                                color={theme.colors.secondary.lightNavy}
                                            // style={{ backgroundColor: "red", padding: "0px", margin: "0px" }}
                                            >
                                                Phone number
                                            </span>
                                            <Grid container justifyContent="center" alignItems="center" >
                                                <Grid style={{ width: "20%", }}>
                                                    <Controller
                                                        name="countryCode"
                                                        control={control}
                                                        defaultValue={state?.defaultCountryCode}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error },
                                                        }) => (
                                                            <>
                                                                <PhoneCode
                                                                    formControlProps={{
                                                                        fullWidth: true,
                                                                        style: { marginTop: 15 }

                                                                    }}
                                                                    inputProps={{
                                                                        error: !!error,
                                                                        // style: { backgroundColor: "yellow" },
                                                                        value: value,
                                                                        onChange: onChange,
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid style={{ width: "80%" }}>
                                                    <StyledTextField
                                                        fullWidth
                                                        id="standard-basic"
                                                        className="mt-3"
                                                        // style={{ backgroundColor: "green" }}
                                                        value={state?.metaData?.version}
                                                        onChange={(e) => { setState({ ...state, metaData: { ...state?.metaData, version: e.target.value } }) }}
                                                    />
                                                </Grid>

                                                {error?.message && <HelperText>{error?.message}</HelperText>}
                                            </Grid>
                                        </Grid>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <FormControlLabel
                            control={
                                <AppCheckBox
                                // checked={state.copyMetaData}
                                // onChange={() => setState({ ...state, copyMetaData: !state.copyMetaData })}
                                />
                            }
                            label={
                                <CheckBoxLabelContainer>
                                    <H5 color={theme.colors.secondary.lightNavy}>
                                        Mark phone number as verified
                                    </H5>
                                </CheckBoxLabelContainer>
                            }
                        />
                    </Grid >

                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <IconBox>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>Company details</H4>

                        {!state?.companyDetails && <Grid>
                            <AppButton
                                variant={"none"}
                                startIcon={<ControlPoint />}
                                style={{ paddingLeft: 0 }}
                                onClick={() => setState({ ...state, companyDetails: true })}
                            >
                                Add associated new company
                            </AppButton>
                        </Grid>}
                        {state?.companyDetails &&
                            <>
                                <Grid style={{ marginTop: 15 }}>
                                    <Controller
                                        name="companyName"
                                        control={control}
                                        defaultValue=""
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <StyledTextField
                                                    fullWidth
                                                    label="Company name*"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    autoComplete='off'
                                                />
                                                {error?.message && <HelperText>{error?.message}</HelperText>}
                                            </>
                                        )}
                                        rules={{ required: "Company name is required" }}
                                    />
                                </Grid>

                                <Grid style={{ marginTop: 15 }}>
                                    <Controller
                                        name="companyType"
                                        control={control}
                                        defaultValue=""
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <CustomDropDown
                                                    labelText="Company type*"
                                                    formControlProps={{
                                                        fullWidth: true
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

                                <Grid style={{ marginTop: 15 }}>
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
                                                    label="Company URN / ID*"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                />
                                                {error?.message && <HelperText>{error?.message}</HelperText>}
                                            </>
                                        )}
                                        rules={{ required: "Company URN / ID is required" }}
                                    />
                                </Grid>
                            </>
                        }

                        <Grid className="mt-5">
                        </Grid>

                        <Grid container>
                            <IconBox>
                                <LockIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>Password</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Temporary password"
                                            type={state?.showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => {
                                                                setState({
                                                                    ...state,
                                                                    showPassword: !state?.showPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {state?.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Company URN / ID is required" }}
                            />
                        </Grid>

                    </Grid >
                </Grid>

                <ProperAccessContainer />

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </AppButton>
                    <AppButton type="submit" variant={"fill"} style={{ marginLeft: "15px" }}>Create new user</AppButton>
                </ButtonContainer>
            </form>
        </MainContainer >
    )
}