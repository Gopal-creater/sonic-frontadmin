import { Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Columns from '../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import FilterCreate from '../../components/common/FilterComponent/FilterCreate'
import { usersTableHeads } from '../../constants/constants'
import { fetchLicenceKeys } from '../../stores/actions/licenceKey'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import UsersFilter from './components/UsersFilter'
import UsersTable from './components/UsersTable'
import { UsersContainer } from './UsersStyled'

export default function Users() {
    const users = useSelector(state => state.licenceKey)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // log("USERS", users)

    React.useEffect(() => {
        dispatch(fetchLicenceKeys())
    }, []);
    return (
        <UsersContainer>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <H1>Users</H1>
                    <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                        Manage all users
                    </H4>
                </Grid>
                <Grid item>
                    <Columns columns={usersTableHeads} />
                </Grid>
            </Grid>

            <FilterCreate
                filterComponent={<UsersFilter />}
                createComponent={() => { }}
                btnTitle={"Create new user"}
            />

            <CommonDataLoadErrorSuccess
                error={users.error}
                loading={users.loading}
                onClickTryAgain={() => dispatch(fetchLicenceKeys())}
            >
                <UsersTable data={users.data?.docs} usersTableHead={usersTableHeads} />
            </CommonDataLoadErrorSuccess>
        </UsersContainer>
    )
}
