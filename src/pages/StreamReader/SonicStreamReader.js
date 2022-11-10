import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import { streamReaderTableHeads } from "../../constants/constants";
import { fetchRadioMonitorsActions } from "../../stores/actions/streamReader.action";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import { log } from "../../utils/app.debug";
import StreamReaderFilter from "./components/StreamReaderFilter";
import StreamReaderTable from "./components/StreamReaderTable";

export default function SonicStreamReader() {
  const dispatch = useDispatch();
  const streamReader = useSelector((state) => state.streamReader);

  log("Stream Reader", streamReader);

  React.useEffect(() => {
    dispatch(fetchRadioMonitorsActions(10, streamReader?.stations?.data?.page));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainContainer>
      {/* Header--------------------------------------------------- */}
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Sonic StreamReader</SubHeading>
          <Content>
            Currently listening to{" "}
            {streamReader?.stations?.data?.totalDocs || 0} radio stations
          </Content>
        </Grid>
      </Grid>
      {/* Header--------------------------------------------------- */}

      {/* Filter--------------------------------------------- */}
      <FilterCreate
        // subscribedStation={<SubscribeStation />}
        filterComponent={<StreamReaderFilter />}
      />
      {/* Filter--------------------------------------------- */}

      <CommonDataLoadErrorSuccess
        error={streamReader?.stations?.error}
        loading={streamReader?.stations?.loading}
        onClickTryAgain={() => dispatch(fetchRadioMonitorsActions())}
      >
        {/* Table----------------------------------------------------- */}
        <StreamReaderTable
          data={streamReader?.stations?.data}
          tableHeads={streamReaderTableHeads}
          paginationCount={
            <PaginationCount
              name="stations"
              total={streamReader?.stations?.data?.totalDocs}
              start={streamReader?.stations?.data?.offset}
              end={streamReader?.stations?.data?.docs?.length}
            />
          }
        />
        {/* Table----------------------------------------------------- */}

        {/* Pagination----------------------------------------------------- */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "30px" }}
        >
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
              onChange={(e, value) =>
                dispatch(fetchRadioMonitorsActions(10, value))
              }
            />
          </Grid>
        </Grid>
        {/* Pagination----------------------------------------------------- */}
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
