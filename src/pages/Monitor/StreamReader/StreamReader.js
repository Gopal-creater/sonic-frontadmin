import React from "react";
import { makeStyles, } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import Hits from "../Components/Hits";
import { FormControl, InputLabel, ListItemText, MenuItem, Button, Popover, Select, Typography, Tooltip, Table, TableBody, TableContainer, TableCell, TableHead, TableRow } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { tableStyle } from "../../../globalStyle";
import IconEdit from "../../../assets/icons/icon-edit.png";
import IconTick from "../../../assets/icons/icon-tick.png";
import { streamReaderTableHeads, countries } from "../../../constants/constants";
import SonicSpinner from "../../../components/common/SonicSpinner";
import { fetchRadioStationsActions, getAllRadioStationsAction, getSubscribedStationCountActions } from "../../../stores/actions";
import { FilterList } from "@material-ui/icons";
import { H1, H4 } from "../../../StyledComponents/StyledHeadings";
import { useTheme } from "styled-components";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "white",
        padding: "2% 2.5%",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
    card: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: 'center',
        padding: 25,
        marginTop: 20,
        marginBottom: 30,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
    tableRow: {
        "&:hover": {
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 1px 5px rgba(0,0,0,0.22)",
        },
    },
}));

export default function SonicStreamReader(props) {
    const classes = useStyles();
    const theme = useTheme()
    const [values, setValues] = React.useState({
        anchorFilter: false,
        country: '',
        radio: '',
    })
    const openFilter = Boolean(values.anchorFilter);

    const dispatch = useDispatch();
    const plays = useSelector(state => state.playsList);
    const radioStation = useSelector(state => state.streamReader);

    const filteredRadioStation = plays?.allRadioStations?.data?.filter((data) => {
        if (values?.country === "") {
            return data
        }
        if (data.country === values?.country) {
            return data
        }
    })

    React.useEffect(() => {
        dispatch(getAllRadioStationsAction());
        dispatch(getSubscribedStationCountActions());
        dispatch(fetchRadioStationsActions(5, radioStation?.stations?.data?.page, "", ""));
    }, [])

    const handleFilter = () => {
        setValues({ ...values, anchorFilter: false });
        dispatch(fetchRadioStationsActions(5, 1, values?.country, values?.radio));
    }

    return (
        <>
            <Grid className={classes.container}>
                <H1>Sonic StreamReader</H1>
                <H4
                    color={theme.colors.primary.teal}
                    fontFamily={theme.fontFamily.nunitoSansRegular}
                >
                    Currently listening to {radioStation?.stationCount?.data} radio stations
                </H4>

                <Grid container className={classes.card}>
                    <Grid item>
                        <Button
                            aria-describedby="open-filter"
                            variant="text"
                            style={{ display: 'flex', alignItems: 'center', color: "#343F84" }}
                            onClick={(e) => setValues({ ...values, anchorFilter: e.currentTarget })}
                        >
                            <span style={{ marginRight: 5, fontFamily: 'NunitoSans-Bold', fontSize: '16px' }}>Filter</span>
                            <FilterList fontSize="medium" />
                        </Button>

                        <Popover
                            id="open-filter"
                            open={openFilter}
                            anchorEl={values.anchorFilter}
                            onClose={() => setValues({ ...values, anchorFilter: false })}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                        >
                            <div className="filter-container">
                                <Grid>
                                    <FormControl>
                                        <InputLabel id="mutiple-country-label" style={{ paddingLeft: 30, color: "grey", paddingBottom: 50, marginBottom: 20, fontFamily: "NunitoSans-Bold" }}>
                                            Country
                                        </InputLabel>
                                        <Select
                                            id="country-drop-down"
                                            className="form-control mb-0"
                                            value={values?.country}
                                            onChange={(e) => setValues({ ...values, country: e.target.value, radio: "" })}
                                            displayEmpty
                                            autoWidth={false}
                                            style={{ color: "#757575", backgroundColor: "transparent", outline: "none", border: "none", boxShadow: "none", margin: "10px 30px 0px 20px", width: 220 }}
                                        >
                                            {countries?.map((country) => {
                                                return (
                                                    <MenuItem value={country?.name} key={country?.name}>{country?.name}</MenuItem>
                                                );
                                            })}
                                        </Select>
                                    </FormControl>

                                    <FormControl>
                                        <InputLabel id="radioStation-label" style={{ paddingLeft: 30, color: "grey", paddingBottom: 50, marginBottom: 20, fontFamily: "NunitoSans-Bold", }}>
                                            Radio Station
                                        </InputLabel>
                                        <Select
                                            id="radioStation-drop-down"
                                            className="form-control"
                                            value={values?.radio}
                                            onChange={(e) => setValues({ ...values, radio: e.target.value })}
                                            autoWidth={false}
                                            disabled={filteredRadioStation?.length === 0 ? true : false}
                                            style={{ color: "#757575", backgroundColor: "transparent", outline: "none", border: "none", boxShadow: "none", margin: "10px 30px 0px 20px", width: 220, height: "45px" }}
                                        >
                                            {filteredRadioStation?.
                                                map((data, index) => {
                                                    return (
                                                        <MenuItem key={index} value={data?.name}>
                                                            <ListItemText primary={data?.name} />
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                        {filteredRadioStation?.length === 0 ?
                                            <span style={{ color: "red", fontSize: 12, marginLeft: 20 }}>
                                                No radio station for {values?.country}
                                            </span> : ""
                                        }
                                    </FormControl>
                                </Grid>

                                <Grid className="filter-btn" container justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        className="mx-3"
                                        style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold' }}
                                        onClick={() => setValues({ ...values, country: '', radio: '' })}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        style={{ textTransform: 'none', fontFamily: 'NunitoSans-Bold', backgroundColor: '#343F84', color: '#fff' }}
                                        onClick={handleFilter}
                                    >
                                        Apply
                                    </Button>
                                </Grid>
                            </div>
                        </Popover>
                    </Grid>
                </Grid>

                <TableContainer style={{ ...tableStyle.container }}>
                    <Table aria-label="Stream Reader">
                        <TableHead>
                            <TableRow hover>
                                {streamReaderTableHeads?.map((col) => {
                                    return (
                                        <TableCell key={col} style={{ ...tableStyle.head }}>
                                            {col}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {!radioStation?.stations?.loading && !radioStation?.stations?.error ?
                                radioStation?.stations?.data?.docs?.length > 0 ?
                                    radioStation?.stations?.data?.docs?.map((file, index) => {
                                        return (
                                            <TableRow key={file?._id} hover className={classes.tableRow}>
                                                <TableCell style={{ ...tableStyle.body }}>
                                                    {radioStation?.stations?.data?.offset + index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <img src={IconTick} />
                                                </TableCell>
                                                <TableCell style={{ ...tableStyle.body, fontSize: 15 }}>
                                                    {file?.name || "---"}
                                                </TableCell>
                                                <Tooltip title={file?.streamingUrl}>
                                                    <TableCell style={{ ...tableStyle.body, color: "#757575", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: 200, wordWrap: "none", overflow: "hidden" }}>
                                                        {file?.streamingUrl || "---"}
                                                    </TableCell>
                                                </Tooltip>
                                                <TableCell style={{ ...tableStyle.body, color: "#757575" }}>
                                                    {moment(new Date(file?.createdAt)).format("DD-MM-YYYY") || "---"}
                                                </TableCell>
                                                <TableCell style={{ ...tableStyle.body }}>
                                                    <Hits radioId={file?._id} key={file?._id} />
                                                </TableCell>
                                                <TableCell>
                                                    {file?.isStreamStarted === true && (
                                                        <Badge style={{ background: "rgb(229, 245, 244)", color: "rgb(72, 187, 183)", padding: 5, fontWeight: "lighter" }}>
                                                            LISTENING
                                                        </Badge>
                                                    )}
                                                    {file?.isStreamStarted === false && file?.error === null && (
                                                        <Badge style={{ background: "rgb(244, 237, 151)", color: "rgb(183, 170, 53)", padding: 5 }}>
                                                            NOT LISTENING
                                                        </Badge>
                                                    )}
                                                    {file?.isStreamStarted === false && file?.error !== null && (
                                                        <Badge style={{ background: "rgb(242, 125, 162)", color: "rgb(130, 24, 13)", padding: 5 }}>
                                                            ERROR
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    style={{ ...tableStyle.body, cursor: "pointer" }}
                                                    onClick={() => {
                                                        localStorage.setItem("passedData", JSON.stringify(file));
                                                        props.history.push({
                                                            pathname: `/sonicstreamdetail`,
                                                            search: `?radioStationId=${file?._id}&radioStationName=${file?.name}`,
                                                        });
                                                    }}
                                                >
                                                    <img src={IconEdit} /> Details
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }) : (
                                        <TableRow>
                                            <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                                                No Data
                                            </TableCell>
                                        </TableRow>
                                    )
                                : radioStation?.stations?.loading ? (
                                    <TableRow>
                                        <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100px' }}>
                                                <SonicSpinner title="Loading..." containerStyle={{ height: '100%', display: 'flex', justifyContent: 'center' }} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} align={"center"} style={{ ...tableStyle.body, fontSize: '14px', backgroundColor: 'pink' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '20px' }}>
                                                ERROR LOADING DATA
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>

                    {!radioStation?.stations?.loading && <Pagination
                        count={radioStation?.stations?.data?.totalPages}
                        page={radioStation?.stations?.data?.page}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event, value) => dispatch(fetchRadioStationsActions(5, value, values?.country, values?.radio))}
                    />}
                </TableContainer>
            </Grid>
        </>
    );
}
