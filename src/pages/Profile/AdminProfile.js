import { Grid, IconButton, InputAdornment } from '@material-ui/core'
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
import { log } from '../../utils/app.debug'

export default function AdminProfile() {
    const [state, setState] = React.useState({
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    })
    const { handleSubmit, control, reset } = useForm();
    const navigate = useNavigate()
    const admin = useSelector(state => state.user)
    log("ADmin..", admin)

    const updateProfile = () => { }

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
                            {/* <Controller
                                name="email"
                                control={control}
                                defaultValue={admin?.userProfile?.data?.email}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Email*"
                                            error={!!error}
                                            value={value}
                                            onChange={onChange}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{ required: "Email is required" }}
                            /> */}
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={admin?.userProfile?.data?.phone_number}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <StyledTextField
                                            fullWidth
                                            label="Phone number"
                                            error={!!error}
                                            value={value}
                                            onChange={onChange}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            />
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
                    <AppButton variant={"outline"} className="mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit">
                        Update details
                    </AppButton>
                </Grid>
            </form>
        </MainContainer >
    )
}
