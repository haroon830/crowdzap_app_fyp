import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Description from "./Components/Overview";
import Map from "./Components/Map";
import Gallery from "./Components/Gallery";
import Invest from "./Components/SendAndBuy";

class SelectedItemDetailDialog extends Component {
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
        this.props.changeStatus(false)
    }
    render(){
        return (
            <React.Fragment>
                <Dialog
                    fullWidth='lg'
                    maxWidth='md'
                    style={{}}
                    open={this.props.status}
                    onClose={()=>this.props.changeStatus(false)}
                    aria-labelledby="max-width-dialog-title"
                >
                    <Paper style={{backgroundColor:"#0EAAA6"}}>
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
                    <DialogContent>
                        <div style={{height:400}}>
                        <Description value = {this.state.value} data={this.props.data}/>
                        <Map value = {this.state.value} data={this.props.data}/>
                        <Gallery value={this.state.value} data={this.props.data}/>
                        <Invest value={this.state.value} data={this.props.data}/>
                        </div>
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

export default SelectedItemDetailDialog
