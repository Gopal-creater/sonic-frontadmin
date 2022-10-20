import React from "react";
import theme from "../../../theme";
import AppButton from "../AppButton/AppButton";
import { FormContainer, FileInput, DragDopLabel } from "./DragDropFileStyle";
import iconAddSound from "../../../assets/images/icon-add-sound.png";
import { Content, H4 } from "../../../StyledComponents/StyledHeadings";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { Grid } from "@material-ui/core";
import CustomToolTip from "../CustomToolTip";

export default function DragDropFile({ handleFiles }) {
  const [state, setState] = React.useState({
    file: "",
  });

  // ref
  const inputRef = React.useRef(null);

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setState({ ...state, file: e.target.files });
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setState({ ...state, file: e.dataTransfer.files });
    }
  };

  return (
    <FormContainer
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onSubmit={(e) => e.preventDefault()}
    >
      <FileInput
        ref={inputRef}
        id="input-file-upload"
        type="file"
        multiple={true}
        onChange={handleChange}
        accept="audio/*"
      />

      <DragDopLabel htmlFor="input-file-upload">
        <img src={iconAddSound} width={"40px"} />
        {state.file ? (
          <Grid>
            <H4 fontFamily={theme.fontFamily.nunitoSansMediumBold}>
              {state?.file[0]?.name}
            </H4>
            <AppButton
              variant={"fill"}
              className="mt-2"
              onClick={() => handleFiles(state?.file)}
            >
              Add MetaData
            </AppButton>
          </Grid>
        ) : (
          <Content>
            Drag & drop a file to upload or
            <AppButton
              variant={"none"}
              fontSize={"20px"}
              style={{ padding: "0px", paddingLeft: "5px" }}
              onClick={() => inputRef.current.click()}
            >
              browse
            </AppButton>
          </Content>
        )}
        <Grid
          container
          justifyContent="flex-end"
          style={{ marginTop: "-10px" }}
        >
          <CustomToolTip
            title={
              "For encoding a new audio file for the first time with its own specific metadata or encoding a new file and you want to use the same metadata input for a previous file. Helpful when encoding multiple versions."
            }
            placement={"bottom-end"}
            arrow
            marginTop={"30px"}
          >
            <HelpOutlineOutlinedIcon
              style={{
                color: theme.colors.secondary.lightNavy,
                fontSize: "15px",
              }}
            />
          </CustomToolTip>
        </Grid>
      </DragDopLabel>
    </FormContainer>
  );
}
