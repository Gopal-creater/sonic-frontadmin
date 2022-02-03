import React from 'react';
import { Grid, MenuItem, Popover } from '@material-ui/core';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CustomDate } from './components/CustomDate';
import { H5 } from '../../../StyledComponents/StyledHeadings';
import theme from '../../../theme';
import styled from 'styled-components';
import Download from '../../../assets/images/iconDownloadSvg.svg'

const Container = styled.div`
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 20px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FilterExport = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

export default function FilterComponent(props) {
    const [state, setState] = React.useState({
        anchorEl: null
    })
    const open = Boolean(state.anchorEl);

    return (
        <Container>
            <Grid container className="filter-dates">
                <Grid item>
                    <DatePicker
                        selected={props?.startDate}
                        onChange={props?.onChangeStartDate}
                        customInput={<CustomDate calender="true" />}
                        dateFormat="MMM d,yyyy"
                        title="Start Date"
                        showYearDropdown
                        showMonthDropdown
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>

                <Grid item className="mt-4 mx-3">
                    <H5 color={theme.colors.secondary.mediumGrey}>to</H5>
                </Grid>

                <Grid item>
                    <DatePicker
                        selected={props?.endDate}
                        onChange={props?.onChangeEndDate}
                        customInput={<CustomDate />}
                        dateFormat="MMM d,yyyy"
                        title="End Date"
                        showYearDropdown
                        showMonthDropdown
                        startDate={props?.startDate}
                        endDate={props?.endDate}
                    />
                </Grid>
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FilterExport>
                    <Image src={Download} alt='Filter' />
                    <span style={{ fontSize: theme.fontSize.h4, fontFamily: theme.fontFamily.nunitoSansBold, color: theme.colors.primary.navy }}>
                        Filter
                    </span>
                </FilterExport>
                <FilterExport onClick={(e) => setState({ ...state, anchorEl: e.currentTarget })}>
                    <Image src={Download} alt='Export' />
                    <span style={{ fontSize: theme.fontSize.h4, fontFamily: theme.fontFamily.nunitoSansBold, color: theme.colors.primary.navy }}>
                        Export
                    </span>
                </FilterExport>
                <Popover
                    anchorEl={state.anchorEl}
                    open={open}
                    onClose={() => setState({ ...state, anchorEl: null })}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'Center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'Center',
                    }}
                >
                    <MenuItem style={{ minWidth: "90px" }} value="csv">
                        CSV
                    </MenuItem>
                </Popover>
            </Grid>
        </Container>
    );
}
