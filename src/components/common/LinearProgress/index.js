import React from 'react'
import { ProgressContainer, LabelContainer } from './indexStyles'

export default function LinearProgress({
    currentPercentage, children, width, height, bgColor, borderRadius, style, textColor
}) {

    return (
        <ProgressContainer
            width={width}
            height={height}
            percentComplete={currentPercentage}
            bgColor={bgColor}
            textColor={textColor}
            borderRadius={borderRadius}
            style={{ ...style }}
        >
            <LabelContainer>{children}</LabelContainer>
        </ProgressContainer>
    )
}
