import { Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import FilterCreate from "../../components/common/FilterComponent/FilterCreate";
import CustomPagination from "../../components/common/Pagination/CustomPagination";
import PaginationCount from "../../components/common/Pagination/PaginationCount";
import { sonicKeyTableHeads } from "../../constants/constants";
import { getAllSonickeysActions } from "../../stores/actions/SonicKeyAcrtions";
import { SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";
import SonicKeyFilter from "./components/SonicKeyFilter";
import SonicKeyTable from "./components/SonicKeyTable";

export default function SonicKey() {
  const sonickey = useSelector((state) => state.sonickey);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllSonickeysActions(10, sonickey?.data?.page));
  }, []);

  return (
    <MainContainer>
      <Grid container justifyContent="space-between">
        <Grid item>
          <SubHeading>Encoded Tracks</SubHeading>
          <PaginationCount
            name="encoded tracks"
            heading={true}
            total={sonickey?.getSonicKeys?.data?.totalDocs}
            start={sonickey?.getSonicKeys?.data?.offset}
            end={sonickey?.getSonicKeys?.data?.docs?.length}
          />
        </Grid>
      </Grid>

      <FilterCreate filterComponent={<SonicKeyFilter />} />

      <CommonDataLoadErrorSuccess
        error={sonickey?.getSonicKeys?.error}
        loading={sonickey?.getSonicKeys?.loading}
        onClickTryAgain={() => dispatch(getAllSonickeysActions())}
      >
        <SonicKeyTable
          data={sonickey?.getSonicKeys?.data || []}
          sonicKeyTableHead={sonicKeyTableHeads}
          paginationCount={
            <PaginationCount
              name="encoded tracks"
              total={sonickey?.getSonicKeys?.data?.totalDocs}
              start={sonickey?.getSonicKeys?.data?.offset}
              end={sonickey?.getSonicKeys?.data?.docs?.length}
            />
          }
        />
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "30px" }}
        >
          <Grid item xs={12} sm={4} md={6}>
            <PaginationCount
              name="encoded tracks"
              total={sonickey?.getSonicKeys?.data?.totalDocs}
              start={sonickey?.getSonicKeys?.data?.offset}
              end={sonickey?.getSonicKeys?.data?.docs?.length}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <CustomPagination
              count={sonickey?.getSonicKeys?.data?.totalPages}
              page={sonickey?.getSonicKeys?.data?.page}
              onChange={(e, value) =>
                dispatch(getAllSonickeysActions(10, value))
              }
            />
          </Grid>
        </Grid>
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  );
}
