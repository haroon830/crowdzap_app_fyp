import React, {Component} from "react";
import {Grid} from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { faDollarSign, faCoins, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ListItemDetailDialog from './ListedItemDetailModal'


class ListedItem extends Component{
    constructor(props){
        super(props)
        this.state= {
            dialogStatus: false
        }
        this.updateDailogStatus = this.updateDailogStatus.bind(this)
    }
    updateDailogStatus(){
        this.setState({
            dialogStatus: !this.state.dialogStatus
        })
    }
    render(){
        return( 
            <>           
                <Grid item xs={12} sm={6} md={4}>
                    <Card onClick={this.updateDailogStatus}>
                        <CardActionArea>
                        <CardMedia  className="propCardImage"                     
                        image={this.props.data.mainImg}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="subtitle1">
                            {this.props.data.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.data.location.country}, {this.props.data.location.city}
                        </Typography>
                        </CardContent>
                        </CardActionArea>
                        <Divider variant='middle'/>
                        <CardActions>                            
                            <Box position="relative" display="inline-flex">
                                <CircularProgress variant="determinate" value="40"/>
                                <Box
                                    top={0}
                                    left={0}
                                    bottom={0}
                                    right={0}
                                    position="absolute"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography variant="caption" component="div" color="textSecondary">20</Typography>
                                </Box>
                            </Box>
                            <div className="priceTags">                                
                                <Typography variant="body1" color="textSecondary" component="p">
                                    Price:   
                                <FontAwesomeIcon size="small" color='secondary' icon={faDollarSign}/>                                
                                    200
                                </Typography>
                            </div>                            
                            <div className="priceTags">                                
                                <Typography variant="body1" color="textSecondary" component="p">
                                    Crypto:   
                                <FontAwesomeIcon size="small" color='secondary' icon={faCoins}/>                                
                                    200
                                </Typography>
                            </div>                                                    
                        </CardActions>
                    </Card>
                </Grid>
                <ListItemDetailDialog closeDailog = {this.updateDailogStatus} status={this.state.dialogStatus} data={this.props.data}/>
            </>                     
        )
    }
}

export default ListedItem