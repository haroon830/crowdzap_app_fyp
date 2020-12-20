import React, {Component} from "react";
import {CustomPaper} from "../Common/CusomPaper"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import {storeNewAddress, getAddresses} from '../../services/Wallet'
import {generateKeyPair} from '../../services_chain'
import {connect} from "react-redux"

import KeyTagDailog from './Components/KeyTagDailog'
class Keys extends Component{
    constructor(props){
        super(props)
        this.state = {
            dailogStatus : false,
            address:"Processing",
            publicKey:"",
            privateKey: ""
        }
        this.changeDailogStatus = this.changeDailogStatus.bind(this)
        this.clsoeDailog = this.clsoeDailog.bind(this)
    }
    componentDidMount(){
        if(!this.props.tried){
            this.props.getAddresses()
        }        
    }

    changeDailogStatus(){
        let keyPair = this.props.generateKeyPair()
        this.setState({
            dailogStatus : true,
            address : keyPair.address,
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        })                       
    }

    clsoeDailog(){
        this.setState({
            dailogStatus : false
        })
    }

    
    render(){      
        console.log(this.props.tried && this.props.keys.length === 0)  
        return(
            <div 
            role="tabpanel"
            hidden={this.props.value !== 1}
            id={'simple-tabpanel-0'}
            aria-labelledby={`simple-tab-0`}
            className="keys"
            >
                <Grid container spacing={0} direction={"row"}>                
                    <Grid item xs={12} sm={4} md={8}> 
                    <Typography gutterBottom variant="h5"style={{marginLeft:"5%", paddingBottom:"2%"}} component="h2">
                        KEYS            
                    </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}> 
                    <div className="submit">
                        <Button className="submit_btn" onClick={this.changeDailogStatus}>Create New Key</Button>
                    </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}> 
                    <div className="submit">
                        <Button className="submit_btn">Import Private Keys</Button>
                    </div>
                    </Grid>
                </Grid>
                {
                    (this.props.tried && this.props.keys.length === 0)?
                    <>
                    <CustomPaper elevation={8}>
                    <Accordion className="accord">
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
                    aria-controls="panel1c-content"
                    style={{width:"100%"}}
                    id="panel1c-header"
                    >
                    <div>
                    <Typography variant="body1" color="secondary">Tag: No New Created Yet</Typography>
                        <Typography variant="body1" color="secondary"> Selected Account: ----------------------------------------------------</Typography>
                    </div>
                    </AccordionSummary>
                    <AccordionDetails >
                    <div  />
                    <div>
                        <Typography variant="body1">
                        Private Key: 
                        </Typography>
                        <br />
                        <Typography variant="body2">
                        ----------------------------------------------------
                        </Typography>
                        <br />
                        <br />
                        <Typography variant="body1">
                        Public Key: 
                        </Typography>
                        <br />
                        <Typography variant="body2">
                            ----------------------------------------------------
                        </Typography>
                    </div>
                    </AccordionDetails>
                    <Divider />
                        <AccordionActions>
                            <div className="accordButtonDiv">
                                <Button size="small" disabled className="btn">
                                Import Private Key
                                </Button>
                            </div>                    
                        </AccordionActions>
                    </Accordion>
                    </CustomPaper>
                    <br/>
                    </>
                    :
                    this.props.keys.map((key, index )=>(
                        <>
                        <CustomPaper elevation={8}>
                        <Accordion className="accord">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
                        aria-controls="panel1c-content"
                        style={{width:"100%"}}
                        id="panel1c-header"
                        >
                        <div>
                            <Typography variant="body1" {...(index === 0)?'color:secondary':''}>Tag: {key.keyTag}</Typography>
                            <Typography variant="body1" {...(index === 0)?'color="secondary"':''}> Selected Account: {key.address}</Typography>
                        </div>
                        </AccordionSummary>
                        <AccordionDetails >
                        <div  />
                        <div>
                            <Typography variant="body1">
                            Private Key: 
                            </Typography>
                            <br />
                            <Typography variant="body2">
                                asfakfjkaskgtglk5j6iour9332r9ru923rd2d32wqferry5n1
                            </Typography>
                            <br />
                            <br />
                            <Typography variant="body1">
                            Public Key: 
                            </Typography>
                            <br />
                            <Typography variant="body2">
                                asfakfjkaskgtglk5asadj6iour9332r9ru923rd2de3jn9urry5ce
                            </Typography>
                        </div>
                        </AccordionDetails>
                        <Divider />
                            <AccordionActions>
                                <div className="accordButtonDiv">
                                    <Button size="small" className="btn">
                                    Import Private Key
                                    </Button>
                                </div>                    
                            </AccordionActions>
                        </Accordion>
                        </CustomPaper>
                        <br/>
                        </>
                    ))    
                }
                <KeyTagDailog 
                    status={this.state.dailogStatus}
                    closeDailog= {this.clsoeDailog}
                    address= {this.state.address}
                    publicKey= {this.state.publicKey}
                    privateKey= {this.state.privateKey}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.setting.kycPassed,
    keys: state.wallet.addresses,
    tried: state.wallet.tried
});
export default connect(
    mapStateToProps,
    { storeNewAddress, getAddresses, generateKeyPair}
)(Keys)