import axios from "axios";
import cogoToast from "cogo-toast";
import { format } from "date-fns";
import fileDownload from "js-file-download";
import React from "react";
import { useDispatch } from "react-redux";
import { StyledTableData } from "../../../StyledComponents/StyledTable/StyledTable";
import { log } from "../../../utils/app.debug";
import DownloadProgressModal from "../../Encode/Components/DownloadProgressModal";
import { downloadAnyFile } from "../../../services/https/resources/EncodeApi/encodeApi";
import MetaDataDailog from "../../../components/common/MetaDataDialog";
import * as actionTypes from "../../../stores/actions/actionTypes";
import AppTable from "../../../components/common/AppTable";

export default function SonicKeyTable({ data, paginationCount }) {
  const [sonickeys, setSonicKeys] = React.useState({});
  const [openTable, setOpenTable] = React.useState(false);
  const [state, setState] = React.useState({
    openDownloadingModal: false,
    percentComplete: "0",
  });
  const dispatch = useDispatch();

  const handleClickOpenTable = async (data) => {
    setSonicKeys(data);
    setOpenTable(true);
  };

  const download = (sonickey) => {
    setState({ ...state, openDownloadingModal: true });
    downloadAnyFile(sonickey?.s3FileMeta?.Key)
      .then((response) => {
        axios({
          url: response,
          responseType: "blob",
          onDownloadProgress: function (progressEvent) {
            let percent = Math.floor(
              (progressEvent?.loaded / progressEvent?.total) * 100
            );
            setState({
              ...state,
              percentComplete: percent,
              openDownloadingModal: true,
            });
          },
        })
          .then((res) => {
            fileDownload(res.data, sonickey?.originalFileName);
            setState({ ...state, openDownloadingModal: false });
          })
          .catch((error) => {
            log("Download error", error);
            cogoToast.error(error?.message);
            setState({ ...state, openDownloadingModal: false });
          });
      })
      .catch((error) => {
        log("Download error", error);
        cogoToast.error(error?.message);
        setState({ ...state, openDownloadingModal: false });
      });
  };

  const createStableEncodedTrackTableData = () => {
    const encodedTracks = data?.docs?.map((row) => ({
      trackID: row?.track?._id,
      sonickey: row?.sonicKey,
      title: row?.contentName,
      version: row?.version,
      artist: row?.contentOwner,
      distributor: row?.distributor,
      description: row?.contentDescription,
      encodedDate: format(new Date(row?.createdAt), "dd/MM/yyyy"),
      actionData: row,
    }));
    return encodedTracks;
  };

  const columns = [
    {
      name: "trackID",
      label: "TRACK ID",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "sonickey",
      label: "SONICKEY",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "title",
      label: "TITLE",
      options: {
        customBodyRender: (value) => {
          return value || "--";
        },
      },
    },
    {
      name: "version",
      label: "VERSION",
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
      name: "distributor",
      label: "DISTRIBUTOR",
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
      name: "encodedDate",
      label: "ENCODED DATE",
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
            <StyledTableData>
              <TableMenu>
                <ActionMenuItem onClick={() => handleClickOpenTable(row)}>
                  View / Edit
                </ActionMenuItem>
                <ActionMenuItem onClick={() => download(row)}>
                  Download
                </ActionMenuItem>
              </TableMenu>
            </StyledTableData>
          );
        },
      },
    },
  ];

  return (
    <>
      <AppTable
        title={paginationCount}
        columns={columns}
        data={createStableEncodedTrackTableData()}
        options={{
          count: data?.length || 0,
          customFooter: () => {
            return null;
          },
        }}
      />

      {openTable && (
        <MetaDataDailog
          sonicKey={sonickeys}
          open={true}
          setOpenTable={setOpenTable}
          updateMetaData={(key) => {
            log("key data is: ", key);
            setSonicKeys(key);
            dispatch({ type: actionTypes.UPDATE_SONIC_KEYS, data: key });
            // setTableData(newTableData)
          }}
          enableEditMode={true}
        />
      )}

      <DownloadProgressModal
        open={state.openDownloadingModal}
        percentage={state.percentComplete}
      />
    </>
  );
}
