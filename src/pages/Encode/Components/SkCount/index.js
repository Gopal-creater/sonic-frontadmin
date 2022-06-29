import { CircularProgress } from '@material-ui/core'
import React from 'react'
import theme from '../../../../theme'

export default function SkCount() {
    const [state, setState] = React.useState({
        loading: true,
        data: "",
        error: null
    })

    React.useEffect(() => {

    }, [])

    if (state.error) {
        return (
            <div>error</div>
        )
    }
    else if (state.loading) {
        return (
            <div>
                <CircularProgress color={theme.colors.primary.navy} size={18} />
            </div>
        )
    }
    else {
        return (
            <div>{state.data}</div>
        )
    }
}
