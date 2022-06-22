import { CircularProgress, FormControlLabel, Grid, IconButton, InputAdornment } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"
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
import { accountType, userRoles } from "../../../constants/constants";
import { HelperText } from "../../Licences/LicenseStyled";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import PhoneTextInput from "../../../components/common/AppTextInput/PhoneTextInput";
import { useDispatch, useSelector } from "react-redux";
import { createUsersAction } from "../../../stores/actions/UserActions";
import CompanyPopper from "../../../components/common/Popper";
import { getAllCompaniesAction } from '../../../stores/actions/CompanyActions'
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { getCompanyNameAction } from "../../../stores/actions/picker/titlePicker.action";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const initialState = {
    accountType: "Partner",
    isEmailVerified: false,
    countryCode: "+44",
    isPhoneNumberVerified: false,
    sendInvitationByEmail: false,
    showPassword: false,
    company: {},
    showCompanyDetails: false,
}

export default function CreateUser() {
    const schema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(6, 'Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase')
            .max(98, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase")
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/, "Min. 6 characters, max. 98 characters, atleast one special character,uppercase and lowercase"),
    });
    const formOptions = { resolver: yupResolver(schema) }
    const { handleSubmit, control, reset } = useForm(formOptions);
    const [state, setState] = React.useState(initialState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const company = useSelector(state => state.company)

    React.useEffect(() => {
        setState(initialState)
        reset({
            userName: "",
            password: "",
            phoneNumber: "",
            email: "",
            isEmailVerified: false,
            isPhoneNumberVerified: false,
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
            firstName: data?.firstName,
            lastName: data?.lastName,
            password: data?.password,
            phoneNumber: contactNumber || "",
            email: data?.email,
            isEmailVerified: data?.isEmailVerified,
            isPhoneNumberVerified: data?.isPhoneNumberVerified,
            company: state.company?._id || user?.userProfile?.data?.company?._id || undefined,
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

                        {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN &&
                            <Grid style={{ marginTop: 15 }}>
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
                            </Grid>}

                        <Grid container spacing={1} style={{ marginTop: 10 }}>
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <StyledTextField
                                                fullWidth
                                                label="Firstname"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                autoComplete='off'
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                    rules={{ required: "Firstname is required" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <StyledTextField
                                                fullWidth
                                                label="Surname"
                                                value={value}
                                                onChange={onChange}
                                                error={!!error}
                                                autoComplete='off'
                                            />
                                            {error?.message && <HelperText>{error?.message}</HelperText>}
                                        </>
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Grid style={{ marginTop: 15 }}>
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

                        <H4 className='mt-2'>
                            {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ? state.accountType : "Company"} details {state.accountType === "Company" && "(optional)"}
                        </H4>
                        {user?.userProfile?.data?.userRole === userRoles.PARTNER_ADMIN ?
                            <>
                                {state.accountType === "Partner" ?
                                    <>
                                        <Grid style={{ marginTop: 15 }}>
                                            <DisabledTextField
                                                label={"Partner Name"}
                                                value={user?.userProfile?.data?.partner?.name}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 15 }}>
                                            <DisabledTextField
                                                label={"Partner Type"}
                                                value={user?.userProfile?.data?.partner?.partnerType}
                                            />
                                        </Grid>
                                        <Grid style={{ marginTop: 15 }}>
                                            <DisabledTextField
                                                label={"Partner ID"}
                                                value={user?.userProfile?.data?.partner?._id}
                                            />
                                        </Grid>
                                    </> : <>
                                        <CompanyPopper title={"Add associated new company"} showDetails={(flag) => setState({ ...state, showCompanyDetails: flag })}>
                                            <AppAutoComplete
                                                setAutoComPleteAction={(value) => dispatch(getCompanyNameAction(value))}
                                                setAutoCompleteOptions={(option => option?.name || "")}
                                                setAutoCompleteOptionsLabel={(option => option?.companyType || "")}
                                                loading={company?.companySearch?.loading}
                                                data={company?.companySearch?.data?.docs}
                                                error={company?.companySearch?.error}
                                                getSelectedValue={(e, v) => setState({ ...state, company: v })}
                                                placeholder={"Search for a company"}
                                            />
                                        </CompanyPopper>

                                        <Grid>
                                            {state?.showCompanyDetails &&
                                                <>
                                                    <Grid style={{ marginTop: 15 }}>
                                                        <DisabledTextField
                                                            label={"Company Name"}
                                                            value={state?.company?.name || ""}
                                                        />
                                                    </Grid>
                                                    <Grid style={{ marginTop: 15 }}>
                                                        <DisabledTextField
                                                            label={"Company Type"}
                                                            value={state?.company?.companyType || ""}
                                                        />
                                                    </Grid>
                                                    <Grid style={{ marginTop: 15 }}>
                                                        <DisabledTextField
                                                            label={"Company URN/ID"}
                                                            value={state?.company?.companyUrnOrId || ""}
                                                        />
                                                    </Grid>
                                                </>
                                            }
                                        </Grid>
                                    </>
                                }
                            </> : <>
                                <Grid style={{ marginTop: 15 }}>
                                    <DisabledTextField
                                        label={"Company name"}
                                        value={user?.userProfile?.data?.company?.name || ""}
                                    />
                                </Grid>

                                <Grid style={{ marginTop: 15 }}>
                                    <DisabledTextField
                                        label={"Company type"}
                                        value={user?.userProfile?.data?.company?.companyType || ""}
                                    />
                                </Grid>

                                <Grid style={{ marginTop: 15 }}>
                                    <DisabledTextField
                                        label={"Company URN/ID"}
                                        value={user?.userProfile?.data?.company?.companyUrnOrId || ""}
                                    />
                                </Grid>
                            </>
                        }

                        <Grid container className="mt-4">
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

                <Grid container alignItems="center" justifyContent="space-between" className="mt-3 mb-2">
                    <Grid item xs={12} md={6}>
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
