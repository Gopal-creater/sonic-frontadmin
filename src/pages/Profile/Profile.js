import { CircularProgress, Grid, IconButton, InputAdornment } from '@material-ui/core'
import React from 'react'
import AppButton from '../../components/common/AppButton/AppButton'
import { DisabledTextField, StyledTextField } from '../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import { Content, SubHeading } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import { FlagOutlined, LockOutlined, MusicNote, Visibility, VisibilityOff } from '@material-ui/icons'
import AppToggleSwitch from '../../components/common/AppToggleSwitch/AppToggleSwitch'
import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../../StyledComponents/StyledPageContainer'
import { Controller, useForm } from 'react-hook-form'
import { BorderBottom, IconBox } from './ProfileStyles'
import { HelperText } from '../Licences/LicenseStyled'
import { useSelector } from 'react-redux'
import { Auth } from 'aws-amplify'
import cogoToast from 'cogo-toast'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { userRoles } from '../../constants/constants'

export default function Profile() {
    const [state, setState] = React.useState({
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        update: false,
        loading: false,
    })

    const schema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Password is required"),
        newPassword: Yup.string()
            .required("Password is required")
            .min(6, 'Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase')
            .max(98, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase")
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase"),
        confirmPassword: Yup.string()
            .required('Password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });
    const formOptions = { resolver: yupResolver(schema) }
    const { handleSubmit, control, reset } = useForm(formOptions);

    const navigate = useNavigate()
    const profile = useSelector(state => state.user)

    React.useEffect(() => {
        reset({
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }, [state.update])

    const updateProfile = (data) => {
        setState({ ...state, loading: true })
        Auth.currentAuthenticatedUser().then(user => {
            setState({ ...state, loading: true })
            return Auth.changePassword(user, data?.currentPassword, data?.newPassword)
        }).then((data) => {
            setState({ ...state, loading: false, update: true })
            cogoToast.success("Password successfully updated!")
        }).catch((error) => {
            setState({ ...state, loading: false })
            cogoToast.error(error?.message)
        })
    }

    const getType = () => {
        if (profile?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN || profile?.userProfile?.data?.userRole === userRoles.PARTNER_USER) {
            return "Partner";
        } else if (profile?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN || profile?.userProfile?.data?.userRole === userRoles.COMPANY_USER || profile?.userProfile?.data?.userRole === userRoles.PORTAL_USER) {
            return "Company";
        }
        return null;
    }

    const getAccountType = () => {
        if (profile?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN || profile?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) {
            return "Admin";
        } else if (profile?.userProfile?.data?.userRole === userRoles.PARTNER_USER || profile?.userProfile?.data?.userRole === userRoles.COMPANY_USER || profile?.userProfile?.data?.userRole === userRoles.PORTAL_USER) {
            return "User";
        }
        return "User";
    }

    const getUserType = () => {
        if (profile?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN) {
            return "Partner Admin";
        } else if (profile?.userProfile?.data?.userRole === userRoles.PARTNER_USER) {
            return "Partner User";
        } else if (profile?.userProfile?.data?.userRole === userRoles.COMPANY_ADMIN) {
            return "Company Admin";
        } else if (profile?.userProfile?.data?.userRole === userRoles.COMPANY_USER) {
            return "Company User";
        } else {
            return "Portal User";
        }
    }

    return (
        <MainContainer>
            <SubHeading>{getAccountType()} profile</SubHeading>
            <Content>
                Update {getAccountType()} details
            </Content>

            <form onSubmit={handleSubmit(updateProfile)}>
                <Grid container spacing={6} className='mt-2'>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <IconBox>
                                <FlagOutlined style={{ color: `${theme.colors.primary.contrastText}` }} />
                            </IconBox>
                        </Grid>
                        <SubHeading>Users details</SubHeading>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Username"}
                                value={profile?.userProfile?.data?.username}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Email"}
                                value={profile?.userProfile?.data?.email}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"User Type"}
                                value={getUserType()}
                            />
                        </Grid>

                        <Grid container style={{ marginTop: 10 }} spacing={1}>
                            <Grid item xs={12} md={6}>
                                <DisabledTextField
                                    label={"Firstname"}
                                    value={profile?.userProfile?.data?.firstName}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <DisabledTextField
                                    label={"Surname"}
                                    value={profile?.userProfile?.data?.lastName}
                                />
                            </Grid>
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Phone number"}
                                value={profile?.userProfile?.data?.phone_number}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"User ID"}
                                value={profile?.userProfile?.data?._id}
                            />
                        </Grid>

                        <SubHeading className="mt-5">Status</SubHeading>
                        <Grid className="mt-1">
                            <Controller
                                name="status"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <AppToggleSwitch
                                            size={121}
                                            checkedSize={70}
                                            active={"\"ACTIVE\""}
                                            inActive={"\"SUSPENDED\""}
                                            defaultChecked={profile?.userProfile?.data?.enabled}
                                            checked={value}
                                            onChange={onChange}
                                            disabled={true}
                                        />
                                    </>
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        {(getType() !== null || getUserType !== "Portal User") &&
                            <Grid className="mb-4">
                                <Grid container>
                                    <IconBox>
                                        <MusicNote style={{ color: theme.colors.primary.contrastText }} />
                                    </IconBox>
                                </Grid>
                                <SubHeading>{getType()} details</SubHeading>

                                <>
                                    {(getUserType() === "Partner Admin" || getUserType() === "Partner User") ?
                                        <Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Partner Name"}
                                                    value={profile?.userProfile?.data?.partner?.name || ""}
                                                />
                                            </Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Partner Type"}
                                                    value={profile?.userProfile?.data?.partner?.partnerType || ""}
                                                />
                                            </Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Partner ID"}
                                                    value={profile?.userProfile?.data?.partner?._id || ""}
                                                />
                                            </Grid>
                                        </Grid>
                                        : <Grid>
                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company Name"}
                                                    value={profile?.userProfile?.data?.company?.name || ""}
                                                />
                                            </Grid>

                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company Type"}
                                                    value={profile?.userProfile?.data?.company?.companyType || ""}
                                                />
                                            </Grid>

                                            <Grid style={{ marginTop: 15 }}>
                                                <DisabledTextField
                                                    label={"Company URN / ID"}
                                                    value={profile?.userProfile?.data?.company?.companyUrnOrId || ""}
                                                />
                                            </Grid>
                                        </Grid>
                                    }
                                </>
                            </Grid>
                        }

                        <Grid container>
                            <IconBox>
                                <LockOutlined style={{ color: `${theme.colors.primary.contrastText}` }} />
                            </IconBox>
                        </Grid>
                        <SubHeading>Password</SubHeading>

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
                                            label="Current password"
                                            fullWidth
                                            type={state?.showCurrentPassword ? "text" : "password"}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                                setState({
                                                                    ...state,
                                                                    showCurrentPassword: !state?.showCurrentPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {state?.showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Password is required" }}
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
                                            label="New password"
                                            fullWidth
                                            type={state?.showNewPassword ? "text" : "password"}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                                setState({
                                                                    ...state,
                                                                    showNewPassword: !state?.showNewPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {state?.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Password is required" }}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                defaultValue=""
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            label="Re-enter new password"
                                            fullWidth
                                            type={state?.showConfirmPassword ? "text" : "password"}
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                            autoComplete="new-password"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => {
                                                                setState({
                                                                    ...state,
                                                                    showConfirmPassword: !state?.showConfirmPassword,
                                                                });
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                        >
                                                            {state?.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Password is required" }}
                            />
                        </Grid>
                    </Grid >
                </Grid >

                <BorderBottom />

                <Grid container className="mt-3 mb-2" justifyContent="flex-end">
                    <AppButton variant={"outline"} onClick={() => navigate(-1)} disabled={state?.loading}>
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "180px" }}>
                        {state?.loading ? <CircularProgress size={20} color="white" /> : "Update details"}
                    </AppButton>
                </Grid>
            </form>
        </MainContainer >
    )
}
