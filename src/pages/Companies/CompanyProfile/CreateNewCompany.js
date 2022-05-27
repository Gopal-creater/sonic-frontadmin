import { CircularProgress, Grid } from "@material-ui/core"
import { H1, H4 } from "../../../StyledComponents/StyledHeadings"
import { ButtonContainer, ProperAccessContainer } from "./CompanyProfileStyles"
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { DisabledTextField, StyledTextField } from "../../../StyledComponents/StyledAppTextInput/StyledAppTextInput";
import PersonIcon from '@material-ui/icons/Person';
import theme from "../../../theme";
import AppButton from "../../../components/common/AppButton/AppButton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../../StyledComponents/StyledPageContainer";
import { Controller, useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import { HelperText } from "../../Licences/LicenseStyled";
import CustomDropDown from "../../../components/common/AppTextInput/CustomDropDown";
import { companyType } from "../../../constants/constants";
import { log } from "../../../utils/app.debug";
import PhoneTextInput from "../../../components/common/AppTextInput/PhoneTextInput";
import { createCompanyAction } from "../../../stores/actions/CompanyActions"
import { useDispatch, useSelector } from "react-redux";
import AppAutoComplete from "../../../components/common/AutoComplete/AppAutoComplete";
import { getUsersNameAction } from "../../../stores/actions/picker/titlePicker.action";
import { getUsersAction } from "../../../stores/actions/UserActions";
import CompanyPopper from "../../../components/common/Popper/CompanyPopper"

export default function CreateNewCompany() {
    const { handleSubmit, control, reset } = useForm();
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const company = useSelector(state => state.company)
    const [state, setState] = useState({
        countryCode: "+44",
        autoCompleteValue: "",
    })

    React.useEffect(() => {
        dispatch(getUsersAction())
    }, [])

    log("data for loading", user)

    React.useEffect(() => {
        reset({
            companyName: "",
            companyType: "",
            companyURNID: "",
            userName: "",
            phoneNumber: "",
            email: "",
        })
    }, [company?.createCompany?.data])

    const createCompany = (data) => {
        log("data of create company", data)
        let payload = {
            name: data?.companyName,
            companyType: data?.companyType,
            companyUrnOrId: data?.companyURNID,
            email: data?.email,
            contactNo: data?.phoneNumber,
            owner: "",
            partner: user?.userProfile?.data?.adminPartner?._id,
        }
        dispatch(createCompanyAction(payload))
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
                                            id="standard-basic"
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

                        <Grid style={{ marginTop: 17 }}>
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

                    </Grid >

                    <Grid item xs={12} md={6}>

                        <Grid container >
                            <Grid style={{ padding: "5px", borderRadius: "50%", backgroundColor: theme.colors.secondary.lightTeal }}>
                                <PersonIcon style={{ color: theme.colors.primary.teal }} />
                            </Grid>
                        </Grid>

                        <H4 className='mt-2'>Admin details</H4>
                        <CompanyPopper title={"user"}>
                            <AppAutoComplete
                                setTextFieldValue={typedValue => setState({ ...state, autoCompleteValue: typedValue })}
                                textFieldValue={state.autoCompleteValue}
                                setAutoComPleteAction={(value) => dispatch(getUsersNameAction(value))}
                                setAutoCompleteOptions={(option => option?.username || "")}
                                loading={user?.userSearch?.loading}
                                data={user?.userSearch?.data?.docs || []}
                                error={user?.userSearch?.error}
                                getSelectedValue={(e, v) => log("AutoComplete selected Value", v)}
                                placeholder={"Search for a user"}
                                helperText="Search your company users"
                            />
                        </CompanyPopper>

                        <Grid style={{ marginTop: 15 }}>
                            <DisabledTextField
                                label={"Type"}
                                value={"Admin"}
                            />
                        </Grid>

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
                                        id="standard-basic"
                                        label="Username*"
                                        className="mt-3"
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
                    </Grid >
                </Grid>

                <ProperAccessContainer>

                </ProperAccessContainer>

                <ButtonContainer>
                    <AppButton
                        variant={"outline"}
                        onClick={() => navigate(-1)}
                        disabled={company?.createCompany?.loading}
                    >
                        Cancel
                    </AppButton>
                    <AppButton variant={"fill"} type="submit" style={{ marginLeft: "15px", width: "210px" }}>
                        {company?.createCompany?.loading ? <CircularProgress size={20} color="white" /> : "Create new company"}
                    </AppButton>
                </ButtonContainer>
            </form>
        </MainContainer >
    )
}
