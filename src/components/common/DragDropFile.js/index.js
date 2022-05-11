import React from 'react'
import theme from '../../../theme';
import AppButton from '../AppButton/AppButton';
import { FormContainer, FileInput, DragDopLabel, DragFileElement } from './DragDropFileStyle'
import iconAddSound from "../../../assets/images/icon-add-sound.png"
import { H4 } from '../../../StyledComponents/StyledHeadings';
import { log } from '../../../utils/app.debug';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Grid } from '@material-ui/core';

export default function DragDropFile({ handleFiles }) {
    // ref
    const inputRef = React.useRef(null);

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files)
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
            handleFiles(e.dataTransfer.files)
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

            <DragDopLabel htmlFor='input-file-upload'>
                <img src={iconAddSound} width={"50px"} />
                <H4 color={theme.colors.secondary.lightNavy}>
                    Drag & drop a file to upload or
                    <AppButton
                        variant={"none"}
                        fontSize={"20px"}
                        style={{ padding: "0px", paddingLeft: "5px" }}
                        onClick={() => inputRef.current.click()}
                    >
                        browse
                    </AppButton>
                </H4>
                <Grid container justifyContent='flex-end' style={{ marginTop: "-10px" }}>
                    <HelpOutlineOutlinedIcon fontSize='small' style={{ color: theme.colors.secondary.lightNavy }} />
                </Grid>
            </DragDopLabel>
        </FormContainer>
    )
}
