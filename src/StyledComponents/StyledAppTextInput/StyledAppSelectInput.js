import { InputLabel, Select } from "@material-ui/core";
import styled from "styled-components";
import theme from "../../theme";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    select: {
        borderRadius: 0,
        boxShadow: 'none',
        outline: `2px solid ${theme.colors.secondary.lightNavy}`,
        backgroundColor: '#fff',
        marginTop: -1,

        "& li": {
            fontSize: `${theme.fontSize.h5}`,
            color: `${theme.colors.secondary.grey}`,
            borderBottom: `1px solid ${theme.colors.secondary.lightGrey}`,
        },

        "& li:hover": {
            backgroundColor: '#fff',
            color: `${theme.colors.secondary.mediumNavy}`,
        },

        "& .Mui-selected, .Mui-selected:hover": {
            backgroundColor: '#fff',
        },
    },
});

const CustomStyledSelect = ({ ...props }) => {
    const classes = useStyles();
    return (
        <Select
            {...props}
            MenuProps={{
                getContentAnchorEl: null,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                },
                classes: { paper: classes.select }
            }}
        />
    )
};

export const StyledSelectInput = styled(InputLabel)`
    color: ${theme.colors.secondary.mediumGrey};
    font-size: ${theme.fontSize.h4};
    font-family: ${theme.fontFamily.nunitoSansBold};
`

export const StyledSelect = styled(CustomStyledSelect)(() => ({
    fontSize: `${theme.fontSize.h4}`,
    fontFamily: `${theme.fontFamily.nunitoSansRegular}`,
    color: `${theme.colors.secondary.lightNavy}`,
    "& .MuiSelect-root": {
        background: 'transparent',
    },
    "& .MuiSelect-root:hover": {
        color: `${theme.colors.secondary.mediumNavy}`
    }
}));

/*-----------  Filter Timezone  -------------*/
export const TimezoneSelectInput = styled(InputLabel)`
    color: ${theme.colors.secondary.mediumGrey};
    font-size: 16px;
    font-family: ${theme.fontFamily.nunitoSansBold};
`

export const TimezoneSelect = styled(CustomStyledSelect)(() => ({
    fontSize: `${theme.fontSize.h4}`,
    fontFamily: `${theme.fontFamily.nunitoSansRegular}`,
    color: `${theme.colors.secondary.grey}`,
    "& .MuiSelect-root": {
        background: 'transparent',
        paddingTop: 3,
        paddingBottom: 3,
    },
    "& .MuiSelect-root:hover": {
        color: `${theme.colors.secondary.mediumNavy}`,
        borderBottomColor: 'red'
    },
}));