import { setListedProps, fetchListedPropsFailed } from "../../reducers/listedProps";
import {ListedPropService} from "./ListedPropService"


let listedPropService = new ListedPropService()
export const getListedProps = (nodeName:string) => (dispatch: any) => {
    listedPropService.getListedProps({nodeName: nodeName}).then(res => {
        console.log(res)
        if (res.status === 200) {
            let payload = {
                listedProps : res.data.data,
                filterBy : nodeName
            }
        dispatch(setListedProps(payload))
        } else {
        console.log("No UserService Logged")
        }
  })
    .catch(err =>{
        dispatch(fetchListedPropsFailed())
    });
};

export{}
