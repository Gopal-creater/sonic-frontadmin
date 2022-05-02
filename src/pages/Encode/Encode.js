import React from 'react'
import { EncodeContainer, FileSelectionContainer, NewFileSelectionContainer, ExistingFileSelectionContainer } from './EncodeStyle';
import theme from '../../theme';
import { H2, H5, H4, H3, H6 } from '../../StyledComponents/StyledHeadings';
import { Grid } from '@material-ui/core';
import DragDropFile from '../../components/common/DragDropFile.js';
import { log } from '../../utils/app.debug.js';

export default function Encode() {
    return (
        <>
            <EncodeContainer>
                <FileSelectionContainer container>
                    <NewFileSelectionContainer item xs={12} lg={5} >
                        <H2 fontFamily={theme.fontFamily.nunitoSansMediumBold}>Encode new file with sonickey</H2>
                        <H5 fontFamily={theme.fontFamily.nunitoSansBold} color={theme.colors.secondary.lightNavy}>
                            Copy MetaData from existing track if needed.
                        </H5>
                        <DragDropFile
                            handleFiles={(files) => { log("Selected file", files) }}
                        />
                    </NewFileSelectionContainer>

                    <Grid item xs={12} lg={1} container justifyContent='center' alignItems='center' >
                        <H4 style={{ marginTop: "10px" }}>or</H4>
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
        </>
    )
}