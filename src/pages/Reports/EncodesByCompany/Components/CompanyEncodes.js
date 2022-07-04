import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { getRoleWiseID } from '../../../../services/https/AuthHelper'
import { AppWebRequest } from '../../../../services/https/NetworkManager'
import theme from '../../../../theme'
import { log } from '../../../../utils/app.debug'

export default function CompanyEncodes({ companyId }) {
    const [state, setState] = React.useState({
        loading: true,
        data: "",
        error: null
    })

    log("CompanyId", companyId)

    // React.useEffect(() => {
    //     let params = new URLSearchParams();
    //     let userRoleWiseId = getRoleWiseID()
    //     if (userRoleWiseId?.company) params.append("company", userRoleWiseId?.company)
    //     if (userRoleWiseId?.partner) params.append("partner", userRoleWiseId?.partner)
    //     if (userRoleWiseId?.owner) params.append("owner", userRoleWiseId?.owner)

    //     if (companyId) {
    //         params.append("relation_company._id", companyId);
    //     }

    //     AppWebRequest("sonic-keys/count", "get", { params: params }).then((res) => {
    //         log("company encodes response", res)
    //         setState({ ...state, data: res, loading: false })
    //     }).catch((err) => {
    //         log("company encodes error", err)
    //         setState({ ...state, error: "error", loading: false })
    //     })
    // }, [])

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
