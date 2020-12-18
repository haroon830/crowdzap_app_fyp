import React, {Component} from "react";
import {Grid} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import image from "../../../Assets/lime-bank-employee.png";
import Typography from "@material-ui/core/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoins} from "@fortawesome/free-solid-svg-icons";
import {Paper} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
class Description extends Component{
    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 0}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                className="listedPropDetail"
            >
                <Paper elevation={10}>
                <Grid container spacing={1} direction={"row"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div>
                        <img src={this.props.data.mainImg} className="img"/> 
                        </div>                       
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div className="desc">
                            <Typography gutterBottom variant="h4" className="totalInvest">
                                {this.props.data.title}
                            </Typography>
                            <Typography gutterBottom variant="body1" >
                                TOTAL INVESTMENT :<FontAwesomeIcon size="small" color='primary' icon={faCoins}/> 1222234
                            </Typography>
                            <Typography gutterBottom variant="body1">
                                TOKEN PRICE :<FontAwesomeIcon size="small" color='primary' icon={faCoins}/> 1222234 rel
                            </Typography>
                            <Divider variant='middle'/>
                            <Typography variant="body2">
                                START DATE : {new Date(this.props.data.createdAt).toDateString()}
                            </Typography>
                            <Typography variant="body2">
                                END AT : {new Date(this.props.data.endDate).toDateString()}
                            </Typography>
                            <Typography variant="body2">
                                CREATOR : {this.props.data.nodeName}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                </Paper>
            </div>
        )
    }
}

export default Description