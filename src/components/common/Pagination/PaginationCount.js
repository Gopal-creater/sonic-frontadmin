import React from 'react';
import theme from "../../../theme"

function PaginationCount({
    name,
    start,
    end,
    total,
    heading = false
}) {
    return (
        <div>
            <span style={{
                color: heading ? theme.colors.primary.teal : theme.colors.primary.graphite,
                fontFamily: heading ? theme.fontFamily.nunitoSansRegular : theme.fontFamily.nunitoSansBold,
                fontSize: heading ? "18px" : "14px"
            }}>
                {end > 0 ? `Showing ${start + 1}-${start + end} of ${total} ${name}` : `0 ${name}`}
            </span>
        </div>)
}

export default PaginationCount;
