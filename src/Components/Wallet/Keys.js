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

class Keys extends Component{
    render(){
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
                        <Button className="submit_btn" onClick={this.handleSubmit}>Create New Key</Button>
                    </div>
                    </Grid>
                    <Grid item xs={6} sm={4} md={2}> 
                    <div className="submit">
                        <Button className="submit_btn" onClick={this.handleSubmit}>Import Private Keys</Button>
                    </div>
                    </Grid>
                </Grid>                    
                <CustomPaper elevation={8}>
                    <Accordion className="accord">
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
                    aria-controls="panel1c-content"
                    style={{width:"100%"}}
                    id="panel1c-header"
                    >
                    <div>
                    <Typography variant="body1" color="secondary">Tag: Account 1</Typography>
                        <Typography variant="body1" color="secondary"> Selected Account: cosmose35dxhi324b23h98noi89swobadasdsdn</Typography>
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
                <CustomPaper elevation={8}>
                    <Accordion className="accord">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
                        aria-controls="panel1c-content"
                        style={{width:"100%"}}
                        id="panel1c-header"
                        >
                        <div>
                        <Typography variant="body1">Tag: Account 2</Typography>
                            <Typography variant="body1"> Selected Account: cosmose35dxhi324b23h98noi89swobadasdsdn</Typography>
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
                                SET AS DEFAULT ACCOUNT
                                </Button>
                            </div>                    
                        </AccordionActions>
                    </Accordion>
                </CustomPaper>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.setting.kycPassed,
});
export default connect(
    mapStateToProps,
    { processKyc}
)(Keys)