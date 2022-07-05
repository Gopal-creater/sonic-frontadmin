import { Grid } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess';
import FilterComponent from '../../../components/common/FilterComponent/FilterComponent';
import CustomPagination from '../../../components/common/Pagination/CustomPagination';
import PaginationCount from '../../../components/common/Pagination/PaginationCount';
import { encodesByCompanyTableHeads } from '../../../constants/constants';
import { getCompanyEncodesAction, getCompanyEncodesExportsAction } from '../../../stores/actions/CompanyActions';
import { H1 } from '../../../StyledComponents/StyledHeadings';
import { log } from '../../../utils/app.debug';
import EncodesByCompanyTable from './Components/EncodesByCompanyTable';
import * as actionTypes from "../../../stores/actions/actionTypes"
import CompanyEncodesFilter from './Components/CompanyEncodesFilter';

export default function EncodesByCompany() {
    const dispatch = useDispatch()
    const companyEncodes = useSelector(state => state.company.companyEncodes)

    const [state, setState] = React.useState({
        encodesByCompanyTableHeads: encodesByCompanyTableHeads,
        currentSortBy: "",
        currentIsAscending: ""
    })

    React.useEffect(() => {
        dispatch(getCompanyEncodesAction(10, companyEncodes?.data?.page))
    }, [companyEncodes?.dates?.startDate, companyEncodes?.dates?.endDate]);

    const handleExport = (format) => {
        dispatch(getCompanyEncodesExportsAction(format, 2000, companyEncodes?.data?.page, state?.currentSortBy, state?.currentIsAscending))
    }

    const companyEncodesSorting = (sortBy, isAscending, isActive) => {
        var newEncodesByCompanyTableHeads = state.encodesByCompanyTableHeads.map((data, i) => {
            if (data.sortBy === sortBy) {
                data.isActive = isActive
                data.isAscending = isAscending
                dispatch(getCompanyEncodesAction(10, companyEncodes?.data?.page, sortBy, isAscending))
                return data
            }
            data.isActive = false
            data.isAscending = null
            return data
        })

        return setState({ ...state, encodesByCompanyTableHeads: newEncodesByCompanyTableHeads, currentSortBy: sortBy, currentIsAscending: isAscending })
    }

    return (
        <Grid style={{ backgroundColor: "white", padding: "30px 40px" }}>
            <H1>Encodes by company</H1>
            <PaginationCount
                name="encodes by company"
                heading={true}
                total={companyEncodes?.data?.totalDocs}
                start={companyEncodes?.data?.offset}
                end={companyEncodes?.data?.docs?.length}
            />

            <Grid style={{ marginTop: "40px" }}>
                <FilterComponent
                    startDate={companyEncodes?.dates?.startDate}
                    onChangeStartDate={(date) => dispatch({ type: actionTypes.SET_COMPANYENCODES_DATES, data: { ...companyEncodes?.dates, startDate: date } })}
                    endDate={companyEncodes?.dates?.endDate}
                    onChangeEndDate={(date) => dispatch({ type: actionTypes.SET_COMPANYENCODES_DATES, data: { ...companyEncodes?.dates, endDate: date } })}
                    filterComponent={<CompanyEncodesFilter />}
                    exportData={(value) => handleExport(value)}
                />
            </Grid>

            <CommonDataLoadErrorSuccess
                error={companyEncodes?.error}
                loading={companyEncodes?.loading}
                onClickTryAgain={() => dispatch(getCompanyEncodesAction(10, companyEncodes?.data?.page))}
            >
                <EncodesByCompanyTable
                    data={companyEncodes?.data?.docs}
                    encodesByCompanyTableHeads={state.encodesByCompanyTableHeads}
                    companyEncodesSorting={companyEncodesSorting}
                />

                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "10px" }}>
                    <Grid item xs={12} sm={4} md={6}>
                        <PaginationCount
                            name="encodes by company"
                            total={companyEncodes?.data?.totalDocs}
                            start={companyEncodes?.data?.offset}
                            end={companyEncodes?.data?.docs?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <CustomPagination
                            count={companyEncodes?.data?.totalPages}
                            page={companyEncodes?.data?.page}
                            onChange={(e, value) =>
                                dispatch(getCompanyEncodesAction(10, value, state?.currentSortBy, state?.currentIsAscending))}
                        />
                    </Grid>
                </Grid>
            </CommonDataLoadErrorSuccess >
        </Grid >
    )
}
