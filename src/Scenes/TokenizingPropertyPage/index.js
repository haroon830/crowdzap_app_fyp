import React, {useState} from "react";
import Dashboard from "Components/DashboardLayout";
import {Button, Grid} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage} from "@fortawesome/free-solid-svg-icons";
import SelectComponent from "Components/SelectComponent";
import MapLocation from "./Components/MapLocation";
import {createBasicContract} from "Services_chain/Contracts";
import Alert from "../../Components/Common/Alert";

const nodes = [
    'ABDUL NODE',
    'HAROON NODE',
    'NADEEM NODE'
];

function CreateTokenizedAsset(){
    const [contractType, setContractType] = useState("basic")
    const [title, setTitle] = useState("")
    const [totalSupply, setTotalSupply] = useState(0)
    const [tokenPrice, setTokenPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [location, setLocation] = useState("")
    const [endDate, setEndDate] = useState("")
    const [images, setImages] = useState(null)

    const [requestStatus, setRequestStatus] = useState("NO_REQUEST")
    const contractTypeButtonStyle = {background:"#0EAAA6", color:"#2f3339"}

    const handleContractCreation = async ()=>{
        let data ={
            title: "ISLAMABAD CENTER",
            description: "Biggest Mall in Islamabad",
            location:{
                city: "Islamabad",
                country: "Pakistan"
            },
            geolocation:{
                lat: 89.00,
                long: 74.09
            },
            contractType:"Basic",
            endDate: new Date(endDate).toISOString(),
            startDate: new Date().toISOString(),
            contractAddress:"",
            officialDocs : "",
            nodeName: "Abdul Waheed",
            galleryImages : [],
            nodeId : "",
            tokenPrice: "20",
            totalSupply: "1000"
        }
        console.log()
        //await createBasicContract(data, setRequestStatus)
    }

    return(
        <div className="walletPage">
            <Dashboard>
                <div className="walletWrapper">
                    <>
                        <div className="dashboardTitle">
                            <h2>CREATE TOKENIZING CONTRACT</h2>
                        </div>
                        <div style={{marginLeft:'2%'}}>
                            <Alert
                                class={(requestStatus === "SUCCESS")?"success":"danger"}
                                show={(requestStatus !== "NO_REQUEST")?true:false}
                                message="Failed to create new project"
                                clearer={()=>(setRequestStatus("NO_REQUEST"))}
                            />
                            <Grid container spacing={1} direction={"row"}>
                                <Grid item xs={12} sm={6} md={6} style={{marginTop:"2%"}}>
                                    <div class="docTypes">
                                        <h4>Required documents</h4>
                                        <p className="subHeading">TYPE OF CONTRACT</p>
                                        <Grid container spacing={0} direction={"row"}>
                                            <Grid item xs={4} sm={3} md={3}>
                                                <Button className="docTypeBtn" onClick={()=>setContractType("basic")} style={(contractType === "basic")?contractTypeButtonStyle:{}}>Basic Contract</Button>
                                            </Grid>
                                            <Grid item xs={4} sm={3} md={3}>
                                                <Button className="docTypeBtn" size="medium" onClick={()=>setContractType("yield")} style={(contractType === "yield")?contractTypeButtonStyle:{}}>Yield Contract</Button>
                                            </Grid>
                                        </Grid>
                                        <div className="numFields">
                                            <Grid container spacing={1} direction={"row"}>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">Title</span>
                                                        <input type="text" onChange={(e)=> setTitle(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">End Date</span>
                                                        <input type="datetime-local" onChange={(e)=> setEndDate(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} direction={"row"}>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">Total Supply</span>
                                                        <input type="number" onChange={(e)=> setTotalSupply(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">Token Price(REL)</span>
                                                        <input type="number" onChange={(e)=> setTokenPrice(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} direction={"row"}>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">City</span>
                                                        <input type="text" onChange={(e)=> setCity(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={11} sm={12} md={5}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">Country</span>
                                                        <input type="text" onChange={(e)=> setCountry(e.target.value)} className="form-control" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <br/>
                                            <Grid container spacing={1} direction={"row"}>
                                                <Grid item xs={10} sm={10} md={10} lg={10}>
                                                    <div className="input-group form-group">
                                                        <span className="input-group-addon">Description</span>
                                                        <textarea type="text" rows="5" onChange={(e)=> setDescription(e.target.value)} className="form-control" placeholder="Describe your project in 50 words" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} direction={"row"}>
                                                <MapLocation/>
                                            </Grid>
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <div className="uploadDoc">
                                        <h4>Upload Gallery Pics</h4>
                                        <p className="subHeading">Images will help to get more visual understanding of project</p>
                                        <p className="subHeading">Select 3 - 10 pics<a href="" style={{color:'#f46b48'}}>More</a></p>
                                        <Grid container spacing={1} direction={"row"}>
                                            <Grid item xs={8} sm={10} md={10}>
                                                <div className="uploadDocBtn">
                                                    <input
                                                        accept="image/*"
                                                        className="inputDoc"
                                                        id="contained-address-file"
                                                        multiple
                                                        style={{display:'none'}}
                                                        type="file"
                                                        onChange={e => setImages(e.target.value)}
                                                    />
                                                    <label htmlFor="contained-address-file">
                                                        <Fab component="span" className="buttonDoc">
                                                            <FontAwesomeIcon icon={faFileImage} size="lg"  color="#0EAAA6" />
                                                        </Fab>
                                                    </label>
                                                </div>
                                                <div className="submit">
                                                    <Button
                                                        className="submit_btn"
                                                        style={{fontSize:14}}
                                                        onClick={handleContractCreation}
                                                    >Create Contract</Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                </div>
            </Dashboard>
        </div>
    )
}

export default CreateTokenizedAsset