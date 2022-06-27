import { CircularProgress } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { getRadioMonitorsPlaysCountActions } from '../../../stores/actions/streamReader.action';
import theme from '../../../theme';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
`

export default function RadioPlays({ radioId }) {
    const dispatch = useDispatch();
    const streamReader = useSelector(state => state.streamReader);

    React.useEffect(() => {
        dispatch(getRadioMonitorsPlaysCountActions(radioId))
    }, [])

    // log("CoUnT..", streamReader.playsCount)

    return (
        <Container>
            {streamReader?.playsCount?.loading ? (
                <CircularProgress color={theme.colors.primary.navy} size={18} />
            ) : streamReader?.playsCount?.error ? (
                <p style={{ fontSize: 12, color: "red", cursor: "pointer" }}>
                    Error
                    <Info style={{ color: "red", marginRight: 4, fontSize: 12 }} />
                </p>
            ) : (
                streamReader?.playsCount?.data
            )}
        </Container>
    )
}
