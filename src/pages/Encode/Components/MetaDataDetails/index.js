import React from 'react'
import { EncodeContainer, MetaDataHeaderContainer } from './indexStyles'
import { H4, H1 } from "../../../../StyledComponents/StyledHeadings"
import theme from '../../../../theme'
import { useSelector } from 'react-redux'
import { log } from '../../../../utils/app.debug'

export default function EncodeData() {
    const encode = useSelector(state => state.encode)
    log("selected to encode", encode.selectedFile[0])

    return (
        <EncodeContainer>
            <MetaDataHeaderContainer>
                <H4 fontFamily={theme.fontFamily.nunitoSansMediumBold}>You're about to encode  new file:</H4>
                <H1
                    color={theme.colors.primary.navy}
                >
                    {encode?.selectedFile?.[0]?.name}
                </H1>
            </MetaDataHeaderContainer>
        </EncodeContainer>
    )
}
