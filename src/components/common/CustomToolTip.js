import React from 'react';
import { useTheme } from 'styled-components';
// import ReactTooltip from 'react-tooltip';
import { StyledToolTip } from '../../StyledComponents/StyledToolTip/StyledToolTip';

export default function CustomToolTip({ id, placement, toolTipText, textColor, bgColor, fontFamily, borderColor, ...props }) {
    const theme = useTheme();
    return (
        <StyledToolTip
            id={id}
            place={placement}
            textColor={textColor || theme.colors.primary.teal}
            backgroundColor={bgColor || "white"}
            borderColor={borderColor}
            effect='solid'
            overridePosition={(
                { left, top },
                currentEvent, currentTarget, node) => {
                const d = document.documentElement;
                left = Math.min(d.clientWidth - node.clientWidth, left);
                top = Math.min(d.clientHeight - node.clientHeight, top);
                left = Math.max(0, left - 90);
                top = Math.max(0, top);
                return { top, left }
            }}
            fontFamily={fontFamily || theme.fontFamily.nunitoSansRegular}
        >
            <span>{toolTipText}</span>
        </StyledToolTip>
    )
};
