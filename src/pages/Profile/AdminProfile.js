import { CircularProgress, Grid, IconButton, InputAdornment } from '@material-ui/core'
import React from 'react'
import AppButton from '../../components/common/AppButton/AppButton'
import { DisabledTextField, StyledTextField } from '../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import { FlagOutlined, LockOutlined, Visibility, VisibilityOff } from '@material-ui/icons'
import AppToggleSwitch from '../../components/common/AppToggleSwitch/AppToggleSwitch'
import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../../StyledComponents/StyledPageContainer'
import { Controller, useForm } from 'react-hook-form'
import { BorderBottom, IconBox } from './AdminProfileStyles'
import { HelperText } from '../Licences/LicenseStyled'
import { useSelector } from 'react-redux'
import { Auth } from 'aws-amplify'
import cogoToast from 'cogo-toast'
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export default function AdminProfile() {
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
    const admin = useSelector(state => state.user)

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

    return (
        <MainContainer>
            <H1>Admin profile</H1>
            <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                Update Admin details
            </H4>

            <form onSubmit={handleSubmit(updateProfile)}>
                <Grid container spacing={6} className='mt-2'>
                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <IconBox>
                                <FlagOutlined style={{ color: `${theme.colors.primary.teal}` }} />
                            </IconBox>
                        </Grid>
                        <H4>{admin?.userProfile?.data?.userRole === "PartnerAdmin" ? "Partner" : "Company"} admin details</H4>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Username"}
                                value={admin?.userProfile?.data?.username}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Type"}
                                value={admin?.userProfile?.data?.userRole === "PartnerAdmin" ? "Partner Admin" : "Company Admin"}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Partner ID"}
                                value={admin?.userProfile?.data?.adminPartner?._id || admin?.userProfile?.data?.adminCompany?._id}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Email"}
                                value={admin?.userProfile?.data?.email}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Grid style={{ marginTop: 15 }}>
                                <DisabledTextField
                                    label={"Phone number"}
                                    value={admin?.userProfile?.data?.phone_number}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <IconBox>
                                <LockOutlined style={{ color: `${theme.colors.primary.teal}` }} />
                            </IconBox>
                        </Grid>
                        <H4>Password</H4>

                        <Grid style={{ marginTop: 23 }}>
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

                        <Grid style={{ marginTop: 23 }}>
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

                        <Grid style={{ marginTop: 23 }}>
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

                <H4 className="mt-5">Status</H4>

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
                                    defaultChecked={admin?.userProfile?.data?.enabled}
                                    checked={value}
                                    onChange={onChange}
                                />
                            </>
                        )}
                    />
                </Grid>

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
