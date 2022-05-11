import { Dialog, DialogContent } from '@material-ui/core'
import { CloseOutlined, ControlPoint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import AppButton from '../../../components/common/AppButton/AppButton'
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput'
import { H3 } from '../../../StyledComponents/StyledHeadings'
import theme from '../../../theme'
import { FilterButton, FilterContainer, FilterHeader } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles'

const useStyles = makeStyles({
    root: {
        "& .MuiDialog-paper": {
            borderRadius: 0,
        }
    },
});

export default function AddNewUser() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        open: false
    })

    return (
        <div>
            <AppButton
                variant={"none"}
                startIcon={<ControlPoint />}
                style={{ paddingLeft: 5 }}
                onClick={() => setState({ ...state, open: true })}
            >
                Add new user
            </AppButton>
            <Dialog
                aria-labelledby="add-new-user"
                open={state.open}
                onClose={() => setState({ ...state, open: false })}
                className={classes.root}
                maxWidth="sm"
                fullWidth
            >
                <FilterContainer>
                    <FilterHeader style={{ paddingBottom: 0 }}>
                        <div>
                            <H3>Add new user</H3>
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                            <CloseOutlined onClick={() => setState({ ...state, open: false })} />
                        </div>
                    </FilterHeader>
                    <DialogContent>
                        <StyledTextField
                            fullWidth
                            label="Enter username"
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </DialogContent>
                    <FilterButton style={{ marginTop: 20, marginBottom: 10 }}>
                        <AppButton
                            variant="outline"
                            className="mx-3"
                            onClick={() => setState({ ...state, open: false })}
                        >
                            Cancel
                        </AppButton>
                        <AppButton
                            variant="fill"
                            type="submit"
                        >
                            Add user
                        </AppButton>
                    </FilterButton>
                </FilterContainer>
            </Dialog>
        </div>
    )
}
