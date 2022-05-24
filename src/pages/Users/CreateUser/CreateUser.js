import { CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment } from "@material-ui/core"
import { ControlPoint, Visibility, VisibilityOff } from "@material-ui/icons"
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import React from "react"
import { ButtonContainer, CheckBoxLabelContainer, IconBox, ProperAccessContainer } from "./CreateUserStyles";
import { H1, H4, H5 } from "../../../StyledComponents/StyledHeadings";
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import AppButton from "../../../components/common/AppButton/AppButton";
import theme from "../../../theme";
import AppCheckBox from "../../../components/common/AppCheckBox";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import { accountType, companyType } from "../../../constants/constants";
import { HelperText } from "../../Licences/LicenseStyled";
import { log } from "../../../utils/app.debug";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import PhoneTextInput from "../../../components/common/AppTextInput/PhoneTextInput";
import { useDispatch, useSelector } from "react-redux";
import { createUsersAction } from "../../../stores/actions/UserActions";

const initialState = {
    accountType: "Partner",
    isEmailVerified: false,
    isPhoneNumberVerified: false,
    sendInvitationByEmail: false,
    countryCode: "+44",
    companyDetails: false,
    showPassword: false,
}

export default function CreateUser() {
    const { handleSubmit, control, reset } = useForm();
    const [state, setState] = React.useState(initialState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    log("user", user)

    React.useEffect(() => {
        setState(initialState)
        reset({
            userName: "",
            password: "",
            phoneNumber: "",
            email: "",
            isEmailVerified: false,
            isPhoneNumberVerified: false,
            group: "",
            company: "",
            sendInvitationByEmail: false
        })
    }, [user?.createUser?.data])

    const handleOnCreateUser = (data) => {
        let contactNumber;
        if (data?.phoneNumber) {
            contactNumber = `${state.countryCode}${data?.phoneNumber}`;
        }
        let payload = {
            userName: data?.userName,
            password: data?.password,
            phoneNumber: contactNumber || "",
            email: data?.email,
            isEmailVerified: data?.isEmailVerified,
            isPhoneNumberVerified: data?.isPhoneNumberVerified,
            partner: user?.userProfile?.data?.adminPartner?._id,
            sendInvitationByEmail: data?.sendInvitationByEmail
        }
        dispatch(createUsersAction(payload))
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

                        <Grid style={{ marginTop: 21 }}>
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

                        <Grid style={{ marginTop: 21 }}>
                            <CustomDropDown
                                labelText="Account type*"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    value: state.accountType,
                                    onChange: (e) => setState({ ...state, accountType: e.target.value }),
                                }}
                                labelProps={{
                                    style: { fontFamily: theme.fontFamily.nunitoSansRegular }
                                }}
                                data={accountType || []}
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
                                            label="Email*"
                                            value={value}
                                            onChange={onChange}
                                            error={!!error}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Invalid email address"
                                    }
                                }}
                            />
                        </Grid>

                        <Grid>
                            <Controller
                                name="isEmailVerified"
                                control={control}
                                defaultValue={state.isEmailVerified}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <FormControlLabel
                                            control={
                                                <AppCheckBox
                                                    checked={value}
                                                    onChange={onChange}
                                                    error={!!error}
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
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid style={{ marginTop: 20 }}>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <PhoneTextInput
                                            fullWidth
                                            value={value}
                                            onchange={onChange}
                                            error={!!error}
                                            phoneCodeProps={{
                                                value: state.countryCode,
                                                onChange: (e) => setState({ ...state, countryCode: e.target.value })
                                            }}
                                        />
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid>
                            <Controller
                                name="isPhoneNumberVerified"
                                control={control}
                                defaultValue={state.isPhoneNumberVerified}
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <FormControlLabel
                                            control={
                                                <AppCheckBox
                                                    checked={value}
                                                    onChange={onChange}
                                                    error={!!error}
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
                                        {error?.message && <HelperText>{error?.message}</HelperText>}
                                    </>
                                )}
                            />
                        </Grid>
                    </Grid >

                    <Grid item xs={12} md={6}>
                        <Grid container>
                            <IconBox>
                                <MusicNoteIcon style={{ color: theme.colors.primary.teal }} />
                            </IconBox>
                        </Grid>

                        <H4 className='mt-2'>{state.accountType} details</H4>

                        {state.accountType === "Partner" ? <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Partner name"}
                                value={user?.userProfile?.data?.name}
                            />
                        </Grid> :
                            !state?.companyDetails ? <Grid>
                                <AppButton
                                    variant={"none"}
                                    startIcon={<ControlPoint />}
                                    style={{ paddingLeft: 0 }}
                                    onClick={() => setState({ ...state, companyDetails: true })}
                                >
                                    Add associated new company
                                </AppButton>
                            </Grid> :
                                state?.companyDetails &&
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
                            />
                        </Grid>

                    </Grid >
                </Grid>

                <ProperAccessContainer />

                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={6} style={{ marginTop: "35px" }}>
                        <Controller
                            name="sendInvitationByEmail"
                            control={control}
                            defaultValue={state.sendInvitationByEmail}
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <>
                                    <FormControlLabel
                                        control={
                                            <AppCheckBox
                                                checked={value}
                                                onChange={onChange}
                                                error={!!error}
                                            />
                                        }
                                        label={
                                            <CheckBoxLabelContainer>
                                                <H5 color={theme.colors.secondary.lightNavy}>
                                                    Send email invitation to the new user
                                                </H5>
                                            </CheckBoxLabelContainer>
                                        }
                                    />
                                    {error?.message && <HelperText>{error?.message}</HelperText>}
                                </>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ButtonContainer>
                            <AppButton
                                variant={"outline"}
                                onClick={() => navigate(-1)}
                                disabled={user?.createUser?.loading}
                            >
                                Cancel
                            </AppButton>
                            <AppButton type="submit" variant={"fill"} style={{ marginLeft: "15px", width: "180px" }}>
                                {user?.createUser?.loading ? <CircularProgress size={20} color="white" /> : "Create new user"}
                            </AppButton>
                        </ButtonContainer>
                    </Grid>
                </Grid>
            </form>
        </MainContainer >
    )
}
