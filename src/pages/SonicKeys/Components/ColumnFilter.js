import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    columnFilter: {
        backgroundColor: 'green',
        minWidth: '100px',
        padding: '10px',
        maxWidth: '400px',
        width: 'fit-content',
    },
    closeDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});
const ColumnFilter = (props) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <>
            <div className={classes.columnFilter}>
                <div className={classes.closeDiv}>
                    <div>Show Columns</div>
                    <div><CloseIcon /></div>
                </div>
                <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox className={classes.checkBoxSytle} checked={state.checkedA} onChange={handleChange} name="checkedA" color="default"/>}
                        label="Secondary"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                color="default"
                            />
                        }
                        label="Primary"
                    />
                    <FormControlLabel control={<Checkbox name="checkedC" color="default"/>} label="Uncontrolled" />
                    <FormControlLabel disabled control={<Checkbox name="checkedD" color="default"/>} label="Disabled" />
                    
                </FormGroup>
                {/* <form>
                    <input className={classes.checkboxSize} type="checkbox" id="one" name="one"/>
                    <label for="one">One</label><br />
                    <input className={classes.checkboxSize} type="checkbox" id="two" name="two"/>
                    <label for="two"> Two</label><br />
                    <input className={classes.checkboxSize} type="checkbox" id="three" name="three"/>
                    <label for="three"> Three</label><br /><br />
                </form> */}
            </div>
        </>
    );
}

export default ColumnFilter;