import React from 'react';
import { Grid } from '@material-ui/core';
import { H5 } from '../../../StyledComponents/StyledHeadings';
import theme from '../../../theme';
import FilterDialog from './components/FilterDialog';
import { Container, ContainerItem, CustomMenuItem, CustomPopup, FilterExport } from './Filter.styled';
import { log } from '../../../utils/app.debug';
import CustomDatePicker from './components/CustomDatePicker';
import AppButton from '../AppButton/AppButton';
import { ArrowDownward } from '@material-ui/icons';
import Timezone from './components/Timezone';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from '../../../stores/actions/actionTypes';

export default function FilterComponent(props) {
    const { filterComponent, openFilter = true, exportData } = props;
    const monitor = useSelector(state => state.monitor);
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        exportAnchorEl: null,
    })
    const openExport = Boolean(state.exportAnchorEl);

    const handleExportData = (value) => {
        log("Export File", value)
        exportData(value);
        setState({ ...state, exportAnchorEl: null })
    }

    return (
        <Container container>
            <ContainerItem item xs={12} md={4} style={{ zIndex: 99 }}>
                <Grid>
                    <CustomDatePicker
                        selected={props?.startDate}
                        onChange={props?.onChangeStartDate}
                        calender={true}
                        dateFormat="MMM d,yyyy"
                        title="Start Date"
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                        dateRange={true}
                    />
                </Grid>

                <Grid className="mt-4 mx-3">
                    <H5 color={theme.colors.secondary.grey}>to</H5>
                </Grid>

                <Grid>
                    <CustomDatePicker
                        selected={props?.endDate}
                        onChange={props?.onChangeEndDate}
                        dateFormat="MMM d,yyyy"
                        title="End Date"
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                        dateRange={true}
                    />
                </Grid>
            </ContainerItem>

            <Grid item xs={12} md={3}>
                <Timezone
                    id="timezone"
                    labelText="Timezone"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: monitor?.filters?.timezone,
                        onChange: (e) => dispatch({ type: actionTypes.SET_MONITOR_FILTERS, data: { ...monitor?.filters, timezone: e.target.value } })
                    }}
                />
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item xs={12} md={3}>
                <Grid>
                    {filterComponent && openFilter ? (
                        <FilterDialog>
                            {({ close }) => {
                                var componentInsideDialogMoreProps = React.cloneElement(
                                    filterComponent,
                                    { closeDialog: close }
                                );
                                return (
                                    <Grid>
                                        {componentInsideDialogMoreProps}
                                    </Grid>
                                );
                            }}
                        </FilterDialog>
                    ) : null}
                </Grid>
                {exportData ? <FilterExport onClick={(e) => setState({ ...state, exportAnchorEl: e.currentTarget })}>
                    <AppButton
                        variant="none"
                        fontSize={theme.fontSize.h4}
                        startIcon={<ArrowDownward />}
                    >
                        Export
                    </AppButton>
                </FilterExport> : null}

                <CustomPopup
                    anchorEl={state.exportAnchorEl}
                    open={openExport}
                    onClose={() => setState({ ...state, exportAnchorEl: null })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <CustomMenuItem value="csv" onClick={() => handleExportData('csv')}>
                        .csv file
                    </CustomMenuItem>
                    <CustomMenuItem value="xlsx" onClick={() => handleExportData('xlsx')}>
                        .xlsx file
                    </CustomMenuItem>
                    {props.pdf &&
                        <CustomMenuItem value="pdf" onClick={() => handleExportData('pdf')}>
                            .pdf file
                        </CustomMenuItem>
                    }
                </CustomPopup>
            </Grid>
        </Container>
    );
}
