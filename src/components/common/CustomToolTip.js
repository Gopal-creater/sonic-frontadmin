import React from 'react';
// import ReactTooltip from 'react-tooltip';
import { StyledToolTip } from '../../StyledComponents/StyledToolTip/StyledToolTip';

export default function CustomToolTip({ id, placement, toolTipText, textColor, bgColor, borderColor, ...props }) {
    return (
        <StyledToolTip
            id={id}
            place={placement}
            textColor={textColor}
            backgroundColor={bgColor}
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
        >
            <span>{toolTipText}</span>
        </StyledToolTip>
    )
};
