import React from 'react';
import "./Plays.scss";
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaysListsAction, getAllRadioStationsAction, getSonickeyHistoryDataAction } from '../../../stores/actions/playsList';
import MetaDataDialog from '../../../components/common/MetaDataDialog';
import * as actionTypes from "../../../stores/actions/actionTypes";
import { getExportDataAction } from '../../../stores/actions/dashboard.action';
import { H1 } from '../../../StyledComponents/StyledHeadings';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import PlaysFilter from './components/PlaysFilter';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import PlaysTable from './components/PlaysTable';

export default function Plays() {
    const [values, setValues] = React.useState({
        sonicKeyModal: false,
        selectedSonicKey: {},
        format: "",
    })
    const dispatch = useDispatch();
    const playsList = useSelector(state => state.playsList);

    React.useEffect(() => {
        dispatch(getPlaysListsAction(
            playsList?.dates?.startDate,
            playsList?.dates?.endDate,
            playsList?.filters?.channel,
            playsList?.data?.page,
            10,
        ));
    }, [playsList?.dates?.startDate, playsList?.dates?.endDate])

    React.useEffect(() => {
        dispatch(getAllRadioStationsAction())
    }, [])

    const handleExport = (value) => {
        setValues({ ...values, format: value })
        if (playsList?.filters?.sonicKey) {
            dispatch(getSonickeyHistoryDataAction(
                playsList?.dates?.startDate,
                playsList?.dates?.endDate,
                playsList?.filters?.channel,
                value
            ))
        } else {
            dispatch(getExportDataAction(
                playsList?.dates?.startDate,
                playsList?.dates?.endDate,
                playsList?.filters?.channel,
                2000,
                value
            ))
        }
    };

    return (
        <Grid className="plays-container">
            <Grid container justifyContent="space-between" className="plays-title-container">
                <Grid>
                    <H1>My Plays</H1>
                    {!playsList?.loading && <PaginationCount
                        heading={true}
                        name="plays"
                        start={playsList?.data?.offset}
                        end={playsList?.data?.docs?.length}
                        total={playsList?.data?.totalDocs}
                    />}
                </Grid>
            </Grid>

            <Grid>
                <FilterComponent
                    startDate={playsList?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, startDate: date } })}
                    endDate={playsList?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_PLAYS_DATES, data: { ...playsList.dates, endDate: date } })}
                    filterComponent={<PlaysFilter open={true} />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={playsList?.error}
                loading={playsList?.loading}
                onClickTryAgain={() => dispatch(getPlaysListsAction(playsList?.dates?.startDate, playsList?.dates?.endDate, playsList?.filters?.channel, playsList?.data?.page, 10))}
            >
                <PlaysTable data={playsList?.data?.docs || []} />
            </CommonDataLoadErrorSuccess>

            {/*
                {values?.sonicKeyModal && (
                    <MetaDataDialog
                        sonicKey={values?.selectedSonicKey}
                        open={true}
                        setOpenTable={(flag) => setValues({ ...values, sonicKeyModal: flag })}
                        updateMetaData={(key) => {
                            setValues({ ...values, selectedSonicKey: key })
                            dispatch({ type: actionTypes.UPDATE_EDITED_PLAYSLIST, data: key })
                        }}
                    />
                )} */}
        </Grid>
    )
}
