import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@material-ui/icons';
import { FilterButton, FilterContainer, FilterForm, FilterHeader, FilterItems } from '../../Monitor/Components/MonitorFilter/MonitorFilterStyles';
import { H3 } from '../../../StyledComponents/StyledHeadings';
import CustomDropDown from '../../../components/common/AppTextInput/CustomDropDown';
import theme from '../../../theme';
import AppButton from '../../../components/common/AppButton/AppButton';
import { StyledTextField } from '../../../StyledComponents/StyledAppTextInput/StyledAppTextInput';
import { channel } from '../../../constants/constants';
import * as actionTypes from '../../../stores/actions/actionTypes';
import { log } from '../../../utils/app.debug';
import { getAllSonickeysActions } from '../../../stores/actions/SonicKeyAcrtions';

export default function SonicKeyFilter({ closeDialog }) {
    const dispatch = useDispatch();
    const sonickey = useSelector(state => state.sonickey)
    log("filter Sonickey data", sonickey)

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getAllSonickeysActions(10, 1));
        closeDialog?.()
    }

    return (
        <FilterContainer>
            <FilterHeader>
                <div>
                    <H3>Filter</H3>
                </div>
                <div style={{ cursor: 'pointer' }}>
                    <CloseOutlined onClick={() => closeDialog?.()} />
                </div>
            </FilterHeader>
            <form onSubmit={handleFilter}>
                <FilterItems container>

                    <FilterForm>
                        <CustomDropDown
                            id="channel-dropdown"
                            labelText="Channel"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                value: sonickey?.filters?.channel,
                                onChange: (e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, channel: e.target.value } }),
                            }}
                            data={channel || []}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="SonicKey"
                            value={sonickey?.filters?.sonicKey}
                            onChange={(e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, sonicKey: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Artist name"
                            value={sonickey?.filters?.artist}
                            onChange={(e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, artist: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Track"
                            value={sonickey?.filters?.song}
                            onChange={(e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, track: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Label"
                            value={sonickey?.filters?.label}
                            onChange={(e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, label: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>

                    <FilterForm>
                        <StyledTextField
                            fullWidth
                            label="Distributor"
                            value={sonickey?.filters?.distributor}
                            onChange={(e) => dispatch({ type: actionTypes.SONIC_KEY_FILTERS, data: { ...sonickey?.filters, distributor: e.target.value } })}
                            InputLabelProps={{
                                style: {
                                    fontFamily: theme.fontFamily.nunitoSansBold
                                }
                            }}
                        />
                    </FilterForm>
                </FilterItems>

                <FilterButton>
                    <AppButton
                        variant="outline"
                        className="mx-3"
                        onClick={() => dispatch({
                            type: actionTypes.SONIC_KEY_FILTERS,
                            data: {
                                channel: "ALL",
                                sonicKey: "",
                                artist: "",
                                track: "",
                                label: "",
                                distributor: "",
                            }
                        })}
                    >
                        Reset
                    </AppButton>
                    <AppButton
                        variant="fill"
                        type="submit"
                    >
                        Apply
                    </AppButton>
                </FilterButton>
            </form>
        </FilterContainer>
    )
}
