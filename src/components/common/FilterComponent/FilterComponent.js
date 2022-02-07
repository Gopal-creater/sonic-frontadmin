import React from 'react';
import { Grid, MenuItem, Popover } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDate } from './components/CustomDate';
import { H5 } from '../../../StyledComponents/StyledHeadings';
import theme from '../../../theme';
import Download from '../../../assets/images/iconDownloadSvg.svg';
import FilterDialog from './components/FilterDialog';
import { Container, ContainerItem, FilterExport, Image } from './Filter.styled';
import TimezoneSelect from "react-timezone-select";
import { log } from '../../../utils/app.debug';
import "./DatePicker.css";

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
        <Container container spacing={1}>
            <ContainerItem item>
                <Grid>
                    <DatePicker
                        wrapperClassName='date-picker'
                        selected={props?.startDate}
                        onChange={props?.onChangeStartDate}
                        customInput={<CustomDate calender="true" />}
                        dateFormat="MMM d,yyyy"
                        title="Start Date"
                        // showYearDropdown
                        // showMonthDropdown
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>

                <Grid className="mt-4 mx-3">
                    <H5 color={theme.colors.secondary.mediumGrey}>to</H5>
                </Grid>

                <Grid>
                    <DatePicker
                        wrapperClassName='date-picker'
                        selected={props?.endDate}
                        onChange={props?.onChangeEndDate}
                        customInput={<CustomDate />}
                        dateFormat="MMM d,yyyy"
                        title="End Date"
                        // showYearDropdown
                        // showMonthDropdown
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>
            </ContainerItem>

            <Grid className="select-wrapper">
                <TimezoneSelect
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                />
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
                    <Image src={Download} alt='Export' />
                    <span style={{ fontSize: theme.fontSize.h4, fontFamily: theme.fontFamily.nunitoSansBold, color: theme.colors.primary.navy }}>
                        Export
                    </span>
                </FilterExport> : null}

                <Popover
                    anchorEl={state.exportAnchorEl}
                    open={openExport}
                    onClose={() => setState({ ...state, exportAnchorEl: null })}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'Center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'Center' }}
                >
                    <MenuItem style={{ minWidth: "90px" }} value="csv" onClick={() => handleExportData('csv')}>
                        .csv file
                    </MenuItem>
                    <MenuItem style={{ minWidth: "90px" }} value="xlsx" onClick={() => handleExportData('xlsx')}>
                        .xlsx file
                    </MenuItem>
                </Popover>
            </Grid>
        </Container>
    );
}
