import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import {storeNewAddress} from '../../../services/Wallet'
import {connect } from 'react-redux'

class KeyTagDailog extends Component{
    constructor(props){
        super(props)
        this.tagName = ""
        this.changeTag = this.changeTag.bind(this)
        this.saveKey = this.saveKey.bind(this)
    }

    saveKey(){
        if(this.tagName === ""){
            console.log("Tag must not be empty")
        }else{
            let addrObj = {
                keyTag: this.tagName,
                address: this.props.address
            }
            this.props.storeNewAddress(addrObj)
            console.log("About to save kay pair")
            this.props.closeDailog()
        }
        
    }

    changeTag(event){
        this.tagName = event.target.value
    }

    render(){
        return(
            <Dialog open={this.props.status} onClose={this.props.closeDailog} fullWidth='true' aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Enter your key tag here.</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Address: {this.props.address}            
              </Typography>
              <Typography gutterBottom>
                Public Key: {this.props.publicKey}
              </Typography>
              <Typography gutterBottom>
              Private Key: {this.props.privateKey}
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.changeTag}
                label="Key Tag"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button id="cancel" onClick={this.props.closeDailog} color="primary">
                Cancel
              </Button>
              <Button id="save" onClick={this.saveKey} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.setting.kycPassed,
});
export default connect(
    mapStateToProps,
    {storeNewAddress}
)(KeyTagDailog)