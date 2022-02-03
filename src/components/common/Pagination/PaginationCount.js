import React from 'react';
import { useTheme } from "styled-components";
import theme from "../../../theme"

function PaginationCount(props) {
    return <div>
        <span style={{ color: theme.colors.primary.graphite, fontFamily: theme.fontFamily.nunitoSansBold, fontSize: "14px" }}>
            Showing {props.start + 1}-{props.start + props.end} of {props.total} {props.name}
        </span>
    </div>;
}

export default PaginationCount;
