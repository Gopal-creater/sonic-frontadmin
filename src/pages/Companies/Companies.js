import { Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Columns from '../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import FilterCreate from '../../components/common/FilterComponent/FilterCreate'
import { companiesTableHeads } from '../../constants/constants'
import { getAllCompaniesAction } from '../../stores/actions/CompanyActions'
import { fetchLicenceKeys } from '../../stores/actions/licenceKey'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import { MainContainer } from '../../StyledComponents/StyledPageContainer'
import theme from '../../theme'
import { log } from '../../utils/app.debug'
import CompanyFilter from './components/CompanyFilter'
import CompanyTable from './components/CompanyTable'

export default function Companies() {
    const company = useSelector(state => state.company)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    log("Companies", company)

    React.useEffect(() => {
        dispatch(getAllCompaniesAction())
    }, []);

    return (
        <MainContainer>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <H1>Companies</H1>
                    <H4 fontFamily={theme.fontFamily.nunitoSansRegular} color={theme.colors.primary.teal}>
                        Manage all companies
                    </H4>
                </Grid>
                <Grid item>
                    <Columns columns={companiesTableHeads} />
                </Grid>
            </Grid>

            <FilterCreate
                filterComponent={<CompanyFilter />}
                createComponent={() => navigate("/create-company")}
                btnTitle={"Create new company"}
            />

            <CommonDataLoadErrorSuccess
                error={company.getAllCompanies.error}
                loading={company.getAllCompanies.loading}
                onClickTryAgain={() => dispatch(getAllCompaniesAction())}
            >
                <CompanyTable data={company.getAllCompanies?.data?.docs} companyTableHead={companiesTableHeads} />
            </CommonDataLoadErrorSuccess>
        </MainContainer>
    )
}
