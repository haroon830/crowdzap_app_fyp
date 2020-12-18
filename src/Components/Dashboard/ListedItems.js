import React, {Component} from "react";
import {Grid} from "@material-ui/core"
import Typography from '@material-ui/core/Typography';
import {getListedProps} from '../../services/ListProperty'
import ListedItem from "./Components/ListedItem"
import {connect} from 'react-redux'


class ListedItems extends Component{
    componentDidMount(){
        if(!this.props.tried){
            this.props.getListedProps()
        }        
    }
    render(){
        if(!this.props.tried){
            return(
                <>
                    <Typography gutterBottom  variant="h6" >
                    Commerical Properties
                    </Typography>
                    <h3>Loading ...</h3>
                    <br/>
                </>                
            )
        }
        if(!this.props.tried && !this.props.listedProps){
            return(
                <>
                    <Typography gutterBottom  variant="h6" >
                    Commerical Properties
                    </Typography>
                    <h3>Something went wrong</h3>
                    <br/>
                </>                
            )
        }
        return(            
            <>
                <Typography gutterBottom  variant="h6" >
                    Commerical Properties
                </Typography>
                <Grid container spacing={1} direction={"row"} style={{paddingRight: '5%'}}>
                    {
                        this.props.listedProps.map((property, index )=>(
                            <ListedItem data={property}/>
                        ))
                    }
                </Grid>
                <br/>
                <Typography gutterBottom variant="h6">
                    Non Commerical Properties
                </Typography>                
                <br/>
            </>
        )
    }
}
const mapStateToProps = state => ({
    listedProps: state.listedProps.listedProperties,
    tried: state.listedProps.tried,
    filterBy: state.listedProps.filterBy
});
export default connect(
    mapStateToProps,
    { getListedProps}
)(ListedItems)