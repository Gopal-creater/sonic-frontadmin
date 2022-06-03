import { Badge, Grid } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import AppButton from '../../../components/common/AppButton/AppButton'
import Columns from '../../../components/common/Columns/Columns'
import CommonDataLoadErrorSuccess from '../../../components/common/CommonDataLoadErrorSuccess/CommonDataLoadErrorSuccess'
import { sonicStreamDetailsTableHeads } from '../../../constants/constants'
import { getSonicStreamDetailsActions } from '../../../stores/actions/streamReader.action'
import { H1, H4 } from '../../../StyledComponents/StyledHeadings'
import { MainContainer } from '../../../StyledComponents/StyledPageContainer'
import theme from '../../../theme'
import StreamDetailsTable from './components/StreamDetailsTable'

export default function SonicStreamDetail() {
  const { state } = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const streamReader = useSelector(state => state.streamReader);

  React.useEffect(() => {
    dispatch(getSonicStreamDetailsActions(state?._id))
  }, [])

  return (
    <MainContainer>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <AppButton style={{ marginBottom: 20 }} variant={"outline"} onClick={() => navigate(-1)} startIcon={<ArrowBack />}>Back</AppButton>
          <H1>Detected SonicKeys</H1>
          <H4 color={theme.colors.primary.teal} fontFamily={theme.fontFamily.nunitoSansRegular}>
            Found {streamReader?.streamDetails?.data?.docs?.length} SonicKeys in{" "}
            {state?.name} radio station {" "}
            {state?.isStreamStarted === true && (
              <Badge style={{ background: "rgb(229, 245, 244)", color: "rgb(72, 187, 183)", padding: 5, fontWeight: "lighter" }}>
                LISTENING
              </Badge>
            )}
            {state?.isStreamStarted === false && state?.error === null && (
              <Badge style={{ background: "rgb(244, 237, 151)", color: "rgb(183, 170, 53)", padding: 5 }}>
                NOT LISTENING
              </Badge>
            )}
            {state?.isStreamStarted === false && state?.error !== null && (
              <Badge style={{ background: "rgb(242, 125, 162)", color: "rgb(130, 24, 13)", padding: 5 }}>
                ERROR
              </Badge>
            )}
          </H4>
        </Grid>
        <Grid item>
          <Columns columns={sonicStreamDetailsTableHeads} />
        </Grid>
      </Grid>

      <Grid style={{ margin: '30px 0px' }} />

      <CommonDataLoadErrorSuccess
        error={streamReader?.streamDetails?.error}
        loading={streamReader?.streamDetails?.loading}
        onClickTryAgain={() => dispatch(getSonicStreamDetailsActions())}
      >
        <StreamDetailsTable data={streamReader?.streamDetails?.data} tableHeads={sonicStreamDetailsTableHeads} />
      </CommonDataLoadErrorSuccess>
    </MainContainer>
  )
}
