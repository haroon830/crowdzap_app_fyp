import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Description from "./Discription";
import Map from "./Map";
import Gallery from "./Gallery";
import Invest from "./Invest";

class ListemItemDetailDialog extends Component {
    constructor(props){
        super(props)
        this.state ={
            status : this.props.status,
            value:0
        }
        this.closeDialog = this.closeDialog.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.a11yProps = this.a11yProps.bind(this)
    }
    handleChange(event, newValue){
        console.log(newValue)
        this.setState({
            value:newValue
        })
    };
    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    closeDialog(){
        this.props.closeDailog()
    }
    render(){
        return (
            <React.Fragment>
              <Dialog
                fullWidth='lg'
                maxWidth='md'
                open={this.props.status}
                onClose={this.closeDialog}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">
                    <Paper>
                        <Tabs
                            indicatorColor="primary"
                            value= {this.state.value}
                            onChange={this.handleChange}
                            className="mainModalPanel"
                        >
                            <Tab label="Description" {...this.a11yProps(0)}/>
                            <Tab label="Location"{...this.a11yProps(1)}/>
                            <Tab label="Gallery" {...this.a11yProps(2)}/>
                            <Tab label="Invest" {...this.a11yProps(3)}/>
                        </Tabs>
                    </Paper>
                </DialogTitle>
                <DialogContent>
                    <Description value = {this.state.value} data={this.props.data}/>
                    <Map value = {this.state.value} data={this.props.data}/>
                    <Gallery value={this.state.value} data={this.props.data}/>
                    <Invest value={this.state.value} data={this.props.data}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.closeDialog} className="close_modal_btn">
                    Close
                </Button>
                </DialogActions>
              </Dialog>
                
            </React.Fragment>
          );
    } 
}

export default ListemItemDetailDialog
