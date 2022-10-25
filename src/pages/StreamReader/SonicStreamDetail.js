import { Badge, Grid } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "styled-components";
import AppButton from "../../components/common/AppButton/AppButton";
import AppTable from "../../components/common/AppTable";
import CommonDataLoadErrorSuccess from "../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess";
import { tags } from "../../constants/constants";
import { getSonicStreamDetailsActions } from "../../stores/actions/streamReader.action";
import { Content, SubHeading } from "../../StyledComponents/StyledHeadings";
import { MainContainer } from "../../StyledComponents/StyledPageContainer";

export default function SonicStreamDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const streamReader = useSelector((state) => state.streamReader);
  const theme = useTheme();

  React.useEffect(() => {
    dispatch(getSonicStreamDetailsActions(state?._id));
  }, []);

  const columns = [
    {
      name: "sn",
      label: "SN",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "sonickey",
      label: `${tags.companyTag}`,
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "artist",
      label: "ARTIST",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "quality",
      label: "QUALITY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "description",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "plays",
      label: "PLAYS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
  ];

  const createStableStreamDetailTableData = () => {
    const streamDetailsData = streamReader?.streamDetails?.data?.docs?.map(
      (row, index) => {
        return {
          sn: streamReader?.streamDetails?.data?.offset + index + 1,
          sonickey: row?.sonicKey?.sonicKey,
          name: row?.sonicKey?.contentName,
          artist: row?.sonicKey?.contentOwner,
          quality: row?.sonicKey?.contentQuality,
          description: row?.sonicKey?.contentDescription,
          plays: row?.totalHits,
        };
      }
    );
    return streamDetailsData;
  };

  return (
    <MainContainer>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <AppButton
            style={{ marginBottom: 20 }}
            variant={"outline"}
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
          >
            Back
          </AppButton>
          <SubHeading>Detected {tags.companyTag}</SubHeading>
          <Content>
            Found {streamReader?.streamDetails?.data?.docs?.length || 0}{" "}
            SonicKeys in {state?.name} radio station{" "}
            {/* {state?.isStreamStarted === true && ( */}
            <Badge
              style={{
                background: theme.colors.grey.light,
                color: theme.colors.secondary.main,
                padding: 5,
              }}
            >
              LISTENING
            </Badge>
          </Content>
        </Grid>
      </Grid>

      <Grid style={{ margin: "30px 0px" }} />

      {/* Table----------------------------------------------- */}
      <CommonDataLoadErrorSuccess
        error={streamReader?.streamDetails?.error}
        loading={streamReader?.streamDetails?.loading}
        onClickTryAgain={() => dispatch(getSonicStreamDetailsActions())}
      >
        <AppTable
          title={""}
          columns={columns}
          data={createStableStreamDetailTableData()}
          options={{
            count: streamReader?.streamDetails?.data?.docs?.length || 0,
            customFooter: () => {
              return null;
            },
          }}
        />
      </CommonDataLoadErrorSuccess>
      {/* Table----------------------------------------------- */}
    </MainContainer>
  );
}
