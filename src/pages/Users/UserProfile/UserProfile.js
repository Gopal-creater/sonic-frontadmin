import { CircularProgress, Grid, IconButton, InputAdornment } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
import AppButton from "../../../components/common/AppButton/AppButton"
import AppToggleSwitch from "../../../components/common/AppToggleSwitch/AppToggleSwitch"
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput"
import { H1, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, IconBox, ProperAccessContainer } from "./UserProfileStyle"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import theme from "../../../theme"
import { MainContainer } from "../../../StyledComponents/StyledPageContainer"
import { Controller, useForm } from "react-hook-form"
import cogoToast from "cogo-toast"
import { HelperText } from "../../Licences/LicenseStyled"
import { useLocation, useNavigate } from "react-router-dom"
import { log } from "../../../utils/app.debug"
import { Auth } from "aws-amplify"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { updateUser } from "../../../services/https/resources/UserApi"

export default function UserProfile() {
    const schema = Yup.object().shape({
        // currentPassword: Yup.string()
        //     .required("Password is required"),
        // newPassword: Yup.string()
        // .required("Password is required")
        // .min(6, 'Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase')
        // .max(98, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase")
        // .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase"),
        // confirmNewPassword: Yup.string()
        // .required('Password is required')
        // .oneOf([Yup.ref('newPassword')], 'Passwords does not match'),
    });
    const formOptions = { resolver: yupResolver(schema) }
    const { handleSubmit, control, reset } = useForm(formOptions);
    const navigate = useNavigate()
    const { state } = useLocation();

    const [values, setValues] = React.useState({
        email: state?.email,
        status: state?.enabled,
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmNewPassword: false,
        updated: false,
        loading: false,
    })

    log("LOCATE USER", state)

    React.useEffect(() => {
        setValues({ ...values, email: state?.email, status: state?.enabled })
        reset({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        })
    }, [values.updated])

    function handleUserProfile(data) {
        setValues({ ...values, loading: true })
        let payload = {
            email: values?.email,
            phone_number: data?.phone_number,
            enabled: values?.status
        }

        updateUser(state?._id, payload).then((res) => {
            log("DATA", res)
            setValues({ ...values, loading: false, updated: true })
            cogoToast.success("Updated Successfully!")
        }).catch((err) => {
            setValues({ ...values, loading: false })
            cogoToast.error(err?.message)
        })
        // Auth.currentAuthenticatedUser().then(user => {
        //     setValues({ ...values, loading: true })
        //     log("USER", user)
        //     return Auth.changePassword(user, data?.currentPassword, data?.newPassword)
        // }).then(() => {
        //     setValues({ ...values, loading: false, updated: true })
        //     cogoToast.success("Updated Successfully!")
        // }).catch((error) => {
        //     setValues({ ...values, loading: false })
        //     cogoToast.error(error?.message)
        // })
    }

    const getAccountType = () => {
        if (state?.userRole === "PartnerAdmin" || state?.userRole === "PartnerUser") {
            return "Partner"
        } else if (state?.userRole === "CompanyAdmin" || state?.userRole === "CompanyUser") {
            return "Company"
        }
        return null
    }

    return (
        <MainContainer>
            <H1>User profile</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Update user details
            </H4>

            <form onSubmit={handleSubmit(handleUserProfile)}>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Grid container >
                            <IconBox>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>User details</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Username"}
                                value={state?.username || ""}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Account Type"}
                                value={getAccountType()}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"User ID"}
                                value={state?._id || ""}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <StyledTextField
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                value={values?.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
                                title={"Invalid email address"}
                                pattern={/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                defaultValue={state?.phone_number}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Phone number"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid className='mt-5'>
                            <H4>Status</H4>
                            <AppToggleSwitch
                                size={121}
                                checkedSize={70}
                                active={"\"ACTIVE\""}
                                inActive={"\"SUSPENDED\""}
                                checked={values?.status}
                                onChange={(e) => setValues({ ...values, status: e.target.checked })}
                            />
                        </Grid>


                    </Grid >

                    <Grid item xs={12} md={6}>
                        {getAccountType() !== null &&
                            <Grid className="mb-4">
                                <Grid container>
                                    <IconBox>
                                        <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                                    </IconBox>
                                </Grid>

                                <H4 className='mt-2'>{getAccountType()} details</H4>

                                <>
                                    {getAccountType() === "Partner" ?
                                        <Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Partner name"}
                                                    value={state?.partner?.name || ""}
                                                />
                                            </Grid>
                                        </Grid>
                                        : <Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company name"}
                                                    value={""}
                                                />
                                            </Grid>

                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company type"}
                                                    value={""}
                                                />
                                            </Grid>

                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company URN / ID"}
                                                    value={""}
                                                />
                                            </Grid>
                                        </Grid>}
                                </>
                            </Grid>}

                        <Grid container>
                            <IconBox>
                                <LockIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>Password</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="currentPassword"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Current password"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            type={values?.showCurrentPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => {
                                                                setValues({
                                                                    ...values,
                                                                    showCurrentPassword: !values?.showCurrentPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {values?.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            // rules={{ required: "Password is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="newPassword"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="New password"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            type={values?.showNewPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => {
                                                                setValues({
                                                                    ...values,
                                                                    showNewPassword: !values?.showNewPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {values?.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            // rules={{ required: "Password is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="confirmNewPassword"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Re-enter new password password"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            type={values?.showConfirmNewPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => {
                                                                setValues({
                                                                    ...values,
                                                                    showConfirmNewPassword: !values?.showConfirmNewPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {values?.showConfirmNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            // rules={{ required: "Password is required" }}
                            />
                        </Grid>

                    </Grid >
                </Grid>

                <ProperAccessContainer />

                <ButtonContainer>
                    <AppButton variant={"outline"} onClick={() => navigate(-1)} disabled={values?.loading}>
                        Cancel
                    </AppButton>
                    <AppButton type="submit" variant={"fill"} style={{ marginLeft: "15px", width: "180px" }}>
                        {values?.loading ? <CircularProgress size={20} color="white" /> : "Update details"}
                    </AppButton>
                </ButtonContainer>
            </form>

        </MainContainer >
    )
}
