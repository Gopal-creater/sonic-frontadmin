import { getAllRadioListAction } from "../radioStationAction"

//------Datas which should be fetched initially once which will remain constant throught the project-------//
export const getInitialDatas = () => {
    return (dispatch) => {
        dispatch(getAllRadioListAction())
    }
}
//------Datas which should be fetched initially once which will remain constant throught the project-------//