import { setListedProps, fetchListedPropsFailed, loadingListedProps } from "Redux/ListedProps";
import {ListedPropService} from "./ListedPropService"


let listedPropService = new ListedPropService()
export const getListedProps = (nodeName) => (dispatch) => {
    dispatch(loadingListedProps())
    setTimeout(()=> {
        listedPropService.getListedProps({nodeName: nodeName}).then(res => {
            console.log(res)
            if (res.status === 200) {
                let payload = {
                    listedProps: res.data.data,
                    filterBy: nodeName
                }
                dispatch(setListedProps(payload))
            } else {
                dispatch(fetchListedPropsFailed())
            }
        })
            .catch(err => {
                dispatch(fetchListedPropsFailed())
            });
    },5000)
};

export{}
