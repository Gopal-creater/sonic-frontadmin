import React from 'react'
import {
    EncodeContainer, FileSelectionContainer, NewFileSelectionContainer,
    ExistingFileSelectionContainer
} from './EncodeStyle';
import theme from '../../theme';
import { H2, H5, H4 } from '../../StyledComponents/StyledHeadings';
import { Grid } from '@material-ui/core';
import DragDropFile from '../../components/common/DragDropFile.js';
import { log } from '../../utils/app.debug.js';
import LinearProgress from "../../components/common/LinearProgress"
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from "../../stores/actions/actionTypes"
import MetaData from './Components/MetaDataDetails';

export default function Encode() {
    const [state, setState] = React.useState({
        openFileUploadProgress: false,
        fileUploadProgress: 0
    })

    const encode = useSelector(state => state.encode)
    const dispatch = useDispatch()

    return (
        <>
            {
                encode.selectedFile
                    ? <MetaData /> :
                    <EncodeContainer>
                        <FileSelectionContainer container>
                            <NewFileSelectionContainer item xs={12} lg={5} >
                                <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode new file with sonickey</H2>
                                <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                                    Copy MetaData from existing track if needed.
                                </H5>

                                <DragDropFile
                                    handleFiles={(files) => {
                                        var interval = setInterval(() => {
                                            setState((state) => {
                                                if (state.fileUploadProgress > 100) {
                                                    clearInterval(interval)
                                                    dispatch(({ type: actionTypes.SET_SELECTED_FILE, data: files }))
                                                    return ({ ...state, openFileUploadProgress: false })
                                                }
                                                return ({ ...state, openFileUploadProgress: true, fileUploadProgress: state.fileUploadProgress + 1 })
                                            })
                                        }, 50)
                                    }}
                                />

                                {
                                    state.openFileUploadProgress &&
                                    <LinearProgress
                                        currentPercentage={state.fileUploadProgress}
                                    >
                                        Uploading {state.fileUploadProgress + "%"}
                                    </LinearProgress>
                                }
                            </NewFileSelectionContainer>

                            <Grid item xs={12} lg={1} container justifyContent='center' alignItems='center' >
                                <H4 style={{ marginTop: "15px" }}>or</H4>
                            </Grid>

                            <ExistingFileSelectionContainer item container direction='column' xs={12} lg={6} >
                                <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode existing file</H2>
                                <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                                    Encode a track multiple times to share with different distributors.
                                </H5>
                                <Grid style={{ backgroundColor: "white", marginTop: "15px", flex: 1 }}>
                                    Searching by company track
                                </Grid>
                            </ExistingFileSelectionContainer>
                        </FileSelectionContainer>
                    </EncodeContainer>
            }
        </>
    )
}