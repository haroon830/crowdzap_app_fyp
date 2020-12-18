import React, {Component} from "react";
import {CustomPaper} from "../../Common/CusomPaper"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

class ActiveAccount extends Component{
    render(){
        return(
            <CustomPaper elevation={8} className="activeAccount">
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
                        <div className="changeAccount">
                            <Button size="small" className="btn">
                            Change Account
                            </Button>
                        </div>                    
                    </AccordionActions>
                </Accordion>
            </CustomPaper>

        )
    }
}

export default ActiveAccount