import { Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Columns from '../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import FilterCreate from '../../components/common/FilterComponent/FilterCreate'
import { usersTableHeads } from '../../constants/constants'
import { getUsersAction } from '../../stores/actions/UserActions'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import { MainContainer } from '../../StyledComponents/StyledPageContainer'
import theme from '../../theme'
import { log } from '../../utils/app.debug'
import UsersFilter from './components/UsersFilter'
import UsersTable from './components/UsersTable'
import PaginationCount from '../../components/common/Pagination/PaginationCount'
import CustomPagination from '../../components/common/Pagination/CustomPagination'

export default function Users() {
    const users = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    log("USERS", users)

    React.useEffect(() => {
        dispatch(getUsersAction(5, users?.getUsers?.data?.page))
    }, []);

    return (
        <MainContainer>
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
                createComponent={() => navigate("/create-user")}
                btnTitle={"Create new user"}
            />

            <CommonDataLoadErrorSuccess
                error={users?.getUsers?.error}
                loading={users?.getUsers?.loading}
                onClickTryAgain={() => dispatch(getUsersAction())}
            >
                <UsersTable data={users?.getUsers?.data?.docs} usersTableHead={usersTableHeads} />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="users"
                            total={users?.getUsers?.data?.totalDocs}
                            start={users?.getUsers?.data?.offset}
                            end={users?.getUsers?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={users?.getUsers?.data?.totalPages}
                            page={users?.getUsers?.data?.page}
                            onChange={(e, value) => dispatch(getUsersAction(5, value))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    )
}
