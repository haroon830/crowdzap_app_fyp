import React, {Component} from "react";
import {CustomPaper} from '../../Common/CusomPaper'
import image from '../../../Assets/elpetro.svg';
import {Typography, Chip, Button} from '@material-ui/core'

class Balance extends Component{
    render(){
        return(
            <CustomPaper elevation={8} className="balance">
                <div className="icon_div">
                    <img src={image} className="icon_image"/>
                </div>
                <div className="desc">
                    <Typography gutterBottom  variant="h6" >
                        Total Balance
                    </Typography>
                    <Chip size="large" label="REL" className="chip"/>
                    <Typography   variant="h4" >
                        141243
                    </Typography>
                    <Typography   variant="body2" color="blue">
                        216478$
                    </Typography>
                </div>                    
                <div className="sendCrypto">
                    <Button className="btn">Send</Button>
                </div>
                </CustomPaper>

        )
    }
}

export default Balance