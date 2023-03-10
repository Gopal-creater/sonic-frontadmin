import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { countries } from '../../../constants/constants';
import { FilterButton, FilterForm, FilterHeader, SubscribeButton, SubscribeContainer, SubscribeItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import AppButton from '../../../components/common/AppButton/AppButton';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import { fetchRadioMonitorsActions } from '../../../stores/actions/streamReader.action';
import { log } from '../../../utils/app.debug';
import AppAutoComplete from '../../../components/common/AutoComplete/AppAutoComplete';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AppCheckBox from '../../../components/common/AppCheckBox';
import { StyledTableData, StyledTableHead } from '../../../StyledComponents/StyledTable/StyledTable';
import Spinner from "react-bootstrap/Spinner";
import { useTheme } from 'styled-components';

export default function SubscribeStation({ closeDialog }) {
    const dispatch = useDispatch();
    const theme =useTheme();
    const radioStations = useSelector(state => state.radioStations)
    const streamReader = useSelector(state => state.streamReader)

    const [state, setState] = React.useState({
        searchedRadioList: {
            loading: false,
            data: []
        },
        selectedRadioList: []
    })

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchRadioMonitorsActions(5, 1, streamReader?.filters?.country, streamReader?.filters?.radioStation));
        closeDialog?.();
    }

    const searchRadioStation = async () => {
        setState({ ...state, searchedRadioList: { loading: true, data: [] } })
        const searchedRadioStations = await Promise.all(radioStations?.data?.filter((radio) => streamReader?.filters?.country === radio?.country)?.map(radio => ({ ...radio, checked: false })))
        setState({
            ...state, searchedRadioList: { loading: false, data: searchedRadioStations }
        })
    }

    const onAppCheckBoxChange = (radio) => {
        let radioList = state?.searchedRadioList?.data
        let selectedRadioList = state?.selectedRadioList
        const selectedRadioIndex = radioList?.findIndex(obj => obj?._id === radio?._id)
        radioList[selectedRadioIndex].checked = !radio?.checked

        if (radio?.checked) selectedRadioList?.push({ radio: radio?._id })
        if (!radio?.checked) selectedRadioList = selectedRadioList?.filter((item) => item.radio !== radio._id)

        setState({
            ...state,
            searchedRadioList: { loading: false, data: radioList },
            selectedRadioList: selectedRadioList
        })
    }

    log("State", state)

    return (
        <SubscribeContainer>
            <FilterHeader>
                <div>
                    <H3>Subscribe Stations</H3>
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <CloseOutlined onClick={() => closeDialog?.()} />
                </div>
            </FilterHeader>
            <form onSubmit={handleFilter} style={{ height: "88%" }}>
                <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ height: "50%" }}>
                        <SubscribeItems container>
                            <FilterForm>
                                <CustomDropDown
                                    id="country"
                                    labelText="Country"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: streamReader?.filters?.country,
                                        onChange: (e) => dispatch({ type: actionTypes.FETCH_RADIOMONITORS_FILTERS, data: { ...streamReader?.filters, country: e.target.value } }),
                                    }}
                                    data={countries || []}
                                />
                            </FilterForm>

                            <FilterForm style={{ marginTop: 20 }}>
                                <AppAutoComplete
                                    setAutoComPleteAction={() => { }}
                                    setAutoCompleteOptions={(option => option?.name || "")}
                                    // data={ }
                                    setAutoCompleteOptionsLabel={() => { }}
                                    getSelectedValue={(e, v) => log("selected val", v)}
                                    placeholder={"Genre"}
                                    // value={values?.updatingSonicKey?.label}
                                    color={theme.colors.grey.main}
                                    fontFamily={theme.fontFamily.robotoBold}
                                    fontSize={theme.fontSize.subHeading}
                                />
                            </FilterForm>

                            <FilterForm style={{ marginTop: 10 }}>
                                <AppButton style={{ width: "100px", height: "40px" }} variant="fill" onClick={searchRadioStation}>
                                    {
                                        state.searchedRadioList.loading ?
                                            <Spinner animation="border" role="status" size="sm" />
                                            : "Search"
                                    }
                                </AppButton>
                            </FilterForm>
                        </SubscribeItems>

                        <TableContainer style={{ padding: '0rem 1.2rem 1rem 1.2rem', marginTop: 30, height: '140%' }}>
                            <Table size="small">
                                <TableHead style={{ backgroundColor: theme.colors.grey.light }}>
                                    <TableRow style={{ position: 'sticky' }}>
                                        <StyledTableHead>Select Station</StyledTableHead>
                                        <StyledTableHead>Radio Station</StyledTableHead>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        state?.searchedRadioList?.data?.length === 0 ?
                                            <TableRow index={1} style={{ padding: "0px" }}>
                                                <StyledTableData colspan={2} style={{ textAlign: "center" }}>No Data</StyledTableData>
                                            </TableRow>
                                            :
                                            state?.searchedRadioList?.data?.map((radio, index) => {
                                                return (
                                                    <TableRow style={{ padding: "0px" }} index={index} >
                                                        <StyledTableData>
                                                            <AppCheckBox
                                                                onChange={() => onAppCheckBoxChange(radio)}
                                                                value={radio?.checked}
                                                            />
                                                        </StyledTableData>
                                                        <StyledTableData>{radio?.name}</StyledTableData>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <SubscribeButton style={{ paddingRight: 20 }}>
                        <AppButton variant="outline" className="mx-3" onClick={() => closeDialog?.()}>
                            Cancel
                        </AppButton>
                        <AppButton variant="fill" type="submit">
                            Subscribe Stations
                        </AppButton>
                    </SubscribeButton>
                </div>
            </form>
        </SubscribeContainer >
    )
}
