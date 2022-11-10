import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppTable from "../../../components/common/AppTable";
import { log } from "../../../utils/app.debug";
import RadioPlays from "./RadioPlays";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Tooltip from "@material-ui/core/Tooltip";
import { useTheme } from "styled-components";

export default function StreamReaderTable({ data, paginationCount }) {
  const navigate = useNavigate();
  const theme = useTheme();
  log("data", data);

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
      name: "logo",
      label: "LOGO",
      options: {
        customBodyRender: (value) => {
          return <img src={value} alt="logo" /> || "--";
        },
      },
    },
    {
      name: "radioName",
      label: "RADIO NAME",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "radioUrl",
      label: "RADIO URL",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "addedDate",
      label: "ADDED DATE",
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
          return <RadioPlays radioId={value} key={value} />;
        },
      },
    },
    {
      name: "status",
      label: "STATUS",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "actionData",
      label: "ACTION",
      options: {
        customBodyRender: (row) => {
          return (
            <Tooltip title="View">
              <VisibilityIcon
                fontSize={"small"}
                style={{
                  color: theme.colors.secondary.main,
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/sonicstreamdetail/${row?._id}`, {
                    state: row,
                  })
                }
              />
            </Tooltip>
          );
        },
      },
    },
  ];

  const createStableStreamReaderTableData = () => {
    const streamReaderData = data?.docs?.map((row, index) => {
      const favIconUrl = `https://s2.googleusercontent.com/s2/favicons?domain_url=${
        row?.website || row?.streamingUrl || row?.logo
      }`;
      return {
        sn: data?.offset + index + 1,
        logo: favIconUrl,
        radioName: row?.name,
        radioUrl: row?.website,
        addedDate: moment(row?.createdAt).format("DD/MM/YYYY"),
        plays: row?._id,
        status: "LISTENING",
        actionData: row,
      };
    });
    return streamReaderData;
  };

  return (
    <AppTable
      title={paginationCount}
      columns={columns}
      data={createStableStreamReaderTableData()}
      options={{
        count: data?.docs?.length || 0,
        customFooter: () => {
          return null;
        },
      }}
    />
  );
}
