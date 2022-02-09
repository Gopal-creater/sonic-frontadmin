import React from 'react';
import { Grid, InputLabel, Select } from '@material-ui/core';
import { H5 } from '../../../StyledComponents/StyledHeadings';
import theme from '../../../theme';
import FilterDialog from './components/FilterDialog';
import { Container, ContainerItem, CustomMenuItem, CustomPopup, FilterExport } from './Filter.styled';
import TimezoneSelect from "react-timezone-select";
import { log } from '../../../utils/app.debug';
import CustomDatePicker from './components/CustomDatePicker';
import AppButton from '../AppButton/AppButton';
import { ArrowDownward } from '@material-ui/icons';

export default function FilterComponent(props) {
    const { filterComponent, openFilter = true, exportData } = props;
    const [state, setState] = React.useState({
        exportAnchorEl: null,
    })
    const openExport = Boolean(state.exportAnchorEl);
    const [selectedTimezone, setSelectedTimezone] = React.useState({})

    const handleExportData = (value) => {
        log("Export File", value)
        exportData(value);
    }

    return (
        <Container container>
            <ContainerItem item>
                <Grid>
                    <CustomDatePicker
                        selected={props?.startDate}
                        onChange={props?.onChangeStartDate}
                        calender={true}
                        dateFormat="MMM d,yyyy"
                        title="Start Date"
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>

                <Grid className="mt-4 mx-3">
                    <H5 color={theme.colors.secondary.mediumGrey}>to</H5>
                </Grid>

                <Grid>
                    <CustomDatePicker
                        selected={props?.endDate}
                        onChange={props?.onChangeEndDate}
                        dateFormat="MMM d,yyyy"
                        title="End Date"
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>
            </ContainerItem>

            <Grid className="select-wrapper">
                {/* <InputLabel
                    id="mutiple-channel-label"
                    style={{
                        paddingLeft: 30,
                        color: "#757575",
                        fontFamily: "NunitoSans-Bold",
                        fontSize: 12
                    }}
                >
                    Channel
                </InputLabel> */}
                {/* <Select
                    id="channel-drop-down"
                    className="form-control"
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                    autoWidth={false}
                    style={{
                        color: "#757575",
                        backgroundColor: "transparent",
                        outline: "none",
                        border: "none",
                        boxShadow: "none",
                        margin: "10px 30px 0px 20px",
                        width: 220,
                    }}
                > */}
                {/* <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                /> */}
                {/* </Select> */}
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item>
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
                </CustomPopup>
            </Grid>
        </Container>
    );
}
