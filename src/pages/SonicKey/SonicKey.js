import { Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Columns from '../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import FilterCreate from '../../components/common/FilterComponent/FilterCreate'
import CustomPagination from '../../components/common/Pagination/CustomPagination'
import PaginationCount from '../../components/common/Pagination/PaginationCount'
import { companiesTableHeads, sonicKeyTableHeads } from '../../constants/constants'
import { getAllCompaniesAction } from '../../stores/actions/CompanyActions'
import { getAllSonickeysActions } from '../../stores/actions/SonicKeyAcrtions'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import { MainContainer } from '../../StyledComponents/StyledPageContainer'
import theme from '../../theme'
import { log } from '../../utils/app.debug'
import SonicKeyFilter from './components/SonicKeyFilter'
import SonicKeyTable from './components/SonicKeyTable'

export default function SonicKey() {
    const sonickey = useSelector(state => state.sonickey)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    log("Sonic Keys data", sonickey)

    React.useEffect(() => {
        dispatch(getAllSonickeysActions(10, sonickey?.data?.page))
    }, []);

    return (
        <MainContainer>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <H1>SonicKeys</H1>
                    <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                        Manage all sonickeys
                    </H4>
                </Grid>
                <Grid item>
                    <Columns columns={sonicKeyTableHeads} />
                </Grid>
            </Grid>

            <FilterCreate
                filterComponent={<SonicKeyFilter />}
            // createComponent={() => navigate("/create-company")}
            // btnTitle={"Create new company"}
            />

            <CommonDataLoadErrorSuccess
                error={sonickey?.getSonicKeys?.error}
                loading={sonickey?.getSonicKeys?.loading}
                onClickTryAgain={() => dispatch(getAllSonickeysActions())}
            >
                <SonicKeyTable
                    data={sonickey?.getSonicKeys?.data?.docs}
                    sonicKeyTableHead={sonicKeyTableHeads}
                />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "30px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="sonickeys"
                            total={sonickey?.getSonicKeys?.data?.totalDocs}
                            start={sonickey?.getSonicKeys?.data?.offset}
                            end={sonickey?.getSonicKeys?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={sonickey?.getSonicKeys?.data?.totalPages}
                            page={sonickey?.getSonicKeys?.data?.page}
                            onChange={(e, value) => dispatch(getAllSonickeysActions(10, value))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    )
}
