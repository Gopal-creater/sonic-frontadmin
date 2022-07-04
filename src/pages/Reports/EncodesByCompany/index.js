import { Grid } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import { encodesByCompanyTableHeads } from '../../../constants/constants';
import { getAllCompaniesAction } from '../../../stores/actions/CompanyActions';
import { H1 } from '../../../StyledComponents/StyledHeadings';
import { log } from '../../../utils/app.debug';
import EncodesByCompanyTable from './Components/EncodesByCompanyTable';

export default function EncodesByCompany() {
    const dispatch = useDispatch()
    const company = useSelector(state => state.company)

    React.useEffect(() => {
        dispatch(getAllCompaniesAction(10, company?.data?.page))
    }, []);

    return (
        <Grid style={{ backgroundColor: "white", padding: "30px 40px" }}>
            <Grid container justifyContent="space-between" alignItems="center">
                <H1>Encodes by company</H1>
            </Grid>

            <CommonDataLoadErrorSuccess
                error={company?.getAllCompanies?.error}
                loading={company?.getAllCompanies?.loading}
                onClickTryAgain={() => dispatch(getAllCompaniesAction(10, company?.data?.page))}
            >
                <EncodesByCompanyTable data={company.getAllCompanies?.data?.docs} encodesByCompanyTableHeads={encodesByCompanyTableHeads} />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "10px", padding: '0rem 1rem 1rem 1rem' }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="users"
                            total={company?.getAllCompanies?.data?.totalDocs}
                            start={company?.getAllCompanies?.data?.offset}
                            end={company?.getAllCompanies?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={company?.getAllCompanies?.data?.totalPages}
                            page={company?.getAllCompanies?.data?.page}
                            onChange={(e, value) => dispatch(getAllCompaniesAction(10, value))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess>
        </Grid >
    )
}
