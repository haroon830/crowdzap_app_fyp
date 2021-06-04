import SettingService from "./SettingService";
import {changeKYCStatus} from "Redux/Setting"

const setting = new SettingService()

export const uploadImage = (file) => {
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
    addressProof : null,
    name: data.name
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


export const getAllKYCRequests = ( callBack) => {
  setting.getAllKYCRequests().then(res => {
      if (res.status === 200 && res.data) {
          callBack("", res.data.data)
      }else{
          callBack("Failed to get kyc requests")
      }
  }).catch(err => {
      console.log(err)
      callBack("Failed to get kyc requests")
  });
};



export const processKYCRequest = ( callBack, data) => {
  setting.processKYC(data).then(res => {
      if (res.status === 200 && res.data) {
          callBack("")
      }else{
          callBack("Failed to process kyc request")
      }
  }).catch(err => {
      console.log(err)
      callBack("Failed to process kyc requests")
  });
};