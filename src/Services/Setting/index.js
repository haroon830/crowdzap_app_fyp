import SettingService from "./SettingService";
import {changeKYCStatus} from "Redux/Setting"

const setting = new SettingService()

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'h3djfcxt');
    return setting.uploadImage(formData)
  };

//@ts-ignore
////Upload Images to cloudinary and send data to api "3 Promises Handle"
export const processKyc = (data) =>  dispatch => {
  let kyc ={
    docType : data.docType,
    doc : null,
    number : data.number,
    expiry : data.expiry,
    addressProof : null
  }

  uploadImage(data.identityProof)// upload Identity Image
    .then(
      (res)=>{kyc.doc = res.data.secure_url}) //Put it in data object
      .then(
        ()=>{
          uploadImage(data.addressProof)
          .then(
            (res)=>{kyc.addressProof = res.data.secure_url})
            .then(
              ()=>{
                setting.postKYC(kyc).then(res =>{
                  if(res.data.status === 'ok'){
                    dispatch(changeKYCStatus())
                  }
                })
      })
    }).catch((err)=>{
      console.log(err)
    })
};