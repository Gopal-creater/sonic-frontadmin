import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { CloseOutlined } from '@material-ui/icons';
import { countries } from '../../../constants/constants';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, SubscribeItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import AppButton from '../../../components/common/AppButton/AppButton';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import { fetchRadioMonitorsActions } from '../../../stores/actions/streamReader.action';
import { log } from '../../../utils/app.debug';
import AppAutoComplete from '../../../components/common/AutoComplete/AppAutoComplete';
import theme from '../../../theme';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import AppCheckBox from '../../../components/common/AppCheckBox';
import { StyledTableData, StyledTableHead, StyledTableRow } from '../../../StyledComponents/StyledTable/StyledTable';

export default function SubscribeStation({ closeDialog }) {
    const dispatch = useDispatch();
    const radioStations = useSelector(state => state.radioStations)
    const streamReader = useSelector(state => state.streamReader)

    const filteredRadioStation = radioStations.data?.filter((data) => {
        if (streamReader.filters.country === "") {
            return data
        }
        if (data.country === streamReader.filters.country) {
            return data
        }
    })

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchRadioMonitorsActions(5, 1, streamReader?.filters?.country, streamReader?.filters?.radioStation));
        closeDialog?.();
    }

    return (
        <FilterContainer>
            <FilterHeader>
                <div>
                    <H3>Subscribe Stations</H3>
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <CloseOutlined onClick={() => closeDialog?.()} />
                </div>
            </FilterHeader>
            <form onSubmit={handleFilter}>
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
                            color={theme.colors.secondary.grey}
                            fontFamily={theme.fontFamily.nunitoSansBold}
                            fontSize={theme.fontSize.h4}
                        />
                    </FilterForm>

                    <FilterForm style={{ marginTop: 10 }}>
                        <AppButton variant="fill" onClick={() => { }}>
                            Search
                        </AppButton>
                    </FilterForm>

                    {/* <FilterForm>
                        <CustomDropDown
                            id="radioStation"
                            labelText="Radio Station"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: streamReader?.filters?.radioStation,
                                onChange: (e) => dispatch({ type: actionTypes.FETCH_RADIOMONITORS_FILTERS, data: { ...streamReader?.filters, radioStation: e.target.value } }),
                                disabled: filteredRadioStation?.length === 0 ? true : false
                            }}
                            data={filteredRadioStation || []}
                            radio={true}
                        />
                    </FilterForm> */}
                </SubscribeItems>

                <TableContainer style={{ padding: '0rem 1.2rem 1rem 1.2rem', marginTop: 10 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableHead>Select Station</StyledTableHead>
                                <StyledTableHead>Radio Station</StyledTableHead>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableData><AppCheckBox /></StyledTableData>
                                <StyledTableData>Radio name</StyledTableData>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <FilterButton style={{ paddingRight: 20 }}>
                    <AppButton variant="outline" className="mx-3" onClick={() => closeDialog?.()}>
                        Cancel
                    </AppButton>
                    <AppButton variant="fill" type="submit">
                        Subscribe Stations
                    </AppButton>
                </FilterButton>
            </form>
        </FilterContainer>
    )
}
