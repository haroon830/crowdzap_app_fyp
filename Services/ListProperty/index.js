import { setListedProps, fetchListedPropsFailed, loadingListedProps } from "Redux/ListedProps";
import {uploadImage} from "Services/Setting"
import { createBasicContractInChain } from "Services_chain/Contracts";
import {ListedPropService} from "./ListedPropService"
import {Wallet} from "Services/Wallet";
import {Secp256k1HdWallet} from "@cosmjs/launchpad";


let listedPropService = new ListedPropService()
export const getListedProps = (nodeName) => (dispatch) => {
    dispatch(loadingListedProps(true))
    listedPropService.getListedProps({nodeName: nodeName}).then(res => {
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
            console.log(err)
        });
};


export const getQueryListedProps = (cityName, cb) => (dispatch) => {
    dispatch(loadingListedProps(true))
    listedPropService.getListedProps({
            key:"city",
            value: cityName
    })
    .then(res => {
        dispatch(loadingListedProps(false))
        if (res.status === 200) {
            cb(res.data.data)
        }
    }).catch(err => {
        dispatch(loadingListedProps(false))
    });
};

//TODO replace values with actual values from UI
export const  addNewListedProp = async (data)=>{
    let contractWallet = await Secp256k1HdWallet.generate()
    const [{ address }] = await contractWallet.getAccounts();
    let newListedPropData ={
        title: data.title.toString(),
        detail: data.description.toString(),
        location:{
            city: data.location.city,
            country: data.location.country
        },
        geoLocation:{
            lat: data.geolocation.lat,
            long: data.geolocation.long
        },
        contractType:"Basic",
        endDate: new Date().toISOString(),
        contractAddress:address,
        officialDocs : "soon be here",
        nodeName: "Abdul Waheed",
        mainImg:"",
        galleryImages : [],
        nodeId : "abdul",
        tokenPrice: data.tokenPrice.toString(),
        totalSupply: data.totalSupply.toString()
    }

    let res = await createBasicContractInChain(newListedPropData)
    console.log(res)
    Promise.all(uploadGalleryImages(data.galleryImages)).then((res) => {
        let urls = []

        newListedPropData.mainImg = res[0].data.secure_url
        for (let i =0 ; i < res.length; i++){
            urls.push(res[i].data.secure_url)
        }
        newListedPropData.galleryImages = urls

        listedPropService.addNewListedProps(newListedPropData)
    }).catch((err)=>{
        console.log(err);
    })    
}

export const getContracDetailFromChain = (contractId, cb)=>{
    listedPropService.getContracDetailFromChain(contractId)
    .then(res => {
        if (res.status === 200 && res.data.result) {
            cb("", res.data.result)
        }else{
            cb("Failed to get contract from chain")
        }
    }).catch(err => {
        console.log(err)
        cb("Failed to get contract from chain")
    });
}

const uploadGalleryImages = (images)=>{
    let uploadImgesJobs = []
    for (let i =0 ; i < images.length; i++){
        uploadImgesJobs.push(uploadImage(images[i]))
    }
    return uploadImgesJobs
}