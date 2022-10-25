import React from "react";
import { useTheme } from "styled-components";

function PaginationCount({ name, start, end, total, heading = false }) {
  const theme = useTheme();
  return (
    <div>
      <span
        style={{
          color: heading
            ? theme.colors.primary.dark
            : theme.colors.primary.main,
          fontSize: theme.fontSize.content,
          fontFamily: theme.fontFamily.robotoMedium,
        }}
      >
        {end > 0
          ? `Showing ${start + 1}-${start + end} of ${total} ${name}`
          : `0 ${name}`}
      </span>
    </div>
  );
}

export default PaginationCount;
