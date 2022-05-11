import { Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Columns from '../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import FilterCreate from '../../components/common/FilterComponent/FilterCreate'
import { companiesTableHeads } from '../../constants/constants'
import { fetchLicenceKeys } from '../../stores/actions/licenceKey'
import { H1, H4 } from '../../StyledComponents/StyledHeadings'
import theme from '../../theme'
import { CompaniesContainer } from './CompaniesStyled'
import CompanyTable from './components/CompanyTable'

export default function Companies() {
    const company = useSelector(state => state.licenceKey)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // log("USERS", users)

    React.useEffect(() => {
        dispatch(fetchLicenceKeys())
    }, []);

    return (
        <CompaniesContainer>
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
                // filterComponent={}
                createComponent={() => navigate("/create-company")}
                btnTitle={"Create new company"}
            />

            <CommonDataLoadErrorSuccess
                error={company.error}
                loading={company.loading}
                onClickTryAgain={() => dispatch(fetchLicenceKeys())}
            >
                <CompanyTable data={company.data?.docs} companyTableHead={companiesTableHeads} />
            </CommonDataLoadErrorSuccess>
        </CompaniesContainer>
    )
}
