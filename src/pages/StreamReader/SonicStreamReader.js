import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Columns from "../../components/common/Columns/Columns";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import { streamReaderTableHeads } from "../../constants/constants";
import { fetchRadioMonitorsActions } from "../../stores/actions/streamReader.action";
import { H1, H4 } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import theme from "../../theme";
import StreamReaderFilter from "./components/StreamReaderFilter";
import StreamReaderTable from "./components/StreamReaderTable";
import SubscribeStation from "./components/SubscribedStation";

export default function SonicStreamReader() {
    const dispatch = useDispatch();
    const streamReader = useSelector(state => state.streamReader);

    React.useEffect(() => {
        dispatch(fetchRadioMonitorsActions(5, streamReader?.stations?.data?.page, "", ""));
    }, [])

    return (
        <MainContainer>
            <Grid container justifyContent="space-between">
                <Grid item>
                    <H1>Sonic StreamReader</H1>
                    <H4 color={theme.colors.primary.teal} fontFamily={theme.fontFamily.nunitoSansRegular}>
                        Currently listening to {streamReader?.stations?.data?.totalDocs || 0} radio stations
                    </H4>
                </Grid>
                <Grid item>
                    <Columns columns={streamReaderTableHeads} />
                </Grid>
            </Grid>

            <FilterCreate
                subscribedStation={<SubscribeStation />}
                filterComponent={<StreamReaderFilter />}
            />

            <CommonDataLoadErrorSuccess
                error={streamReader?.stations?.error}
                loading={streamReader?.stations?.loading}
                onClickTryAgain={() => dispatch(fetchRadioMonitorsActions())}
            >
                <StreamReaderTable data={streamReader?.stations?.data} tableHeads={streamReaderTableHeads} />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="stations"
                            total={streamReader?.stations?.data?.totalDocs}
                            start={streamReader?.stations?.data?.offset}
                            end={streamReader?.stations?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={streamReader?.stations?.data?.totalPages}
                            page={streamReader?.stations?.data?.page}
                            onChange={(e, value) => dispatch(fetchRadioMonitorsActions(5, value))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    );
}
