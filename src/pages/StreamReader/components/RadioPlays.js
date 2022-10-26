import { CircularProgress } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import React from 'react'
import styled, { useTheme } from 'styled-components'
import { getRoleWiseID } from '../../../services/https/AuthHelper';
import { getRadioMonitorsPlaysCount } from '../../../services/https/resources/StreamReader.api';
import { log } from '../../../utils/app.debug';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
`

export default function RadioPlays({ radioId }) {
    const theme = useTheme();
    const [state, setState] = React.useState({
        error: null,
        loading: false,
        data: 0
    })

    React.useEffect(() => {
        let params = new URLSearchParams();
        params.append("channel", "STREAMREADER");

        let userRoleWiseId = getRoleWiseID()
        if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
        if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
        if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

        params.append("radioStation", radioId);

        getRadioMonitorsPlaysCount(params).then((res) => {
            log("RadioMonitorsPlaysCount Success", res)
            setState({ ...state, data: res, error: null, loading: false })
        }).catch((err) => {
            log("RadioMonitorsPlaysCount Error", err)
            setState({ ...state, data: 0, error: err?.message, loading: false })
        })
    }, [])

    return (
        <Container>
            {state?.error ? (
                <p style={{ fontSize: 12, color: "red", cursor: "pointer" }}>
                    Error
                    <Info style={{ color: "red", marginRight: 4, fontSize: 12 }} />
                </p>
            ) : state?.loading ? (
                <CircularProgress color={theme.colors.primary.main} size={18} />
            ) : (
                state?.data
            )}
        </Container>
    )
}
