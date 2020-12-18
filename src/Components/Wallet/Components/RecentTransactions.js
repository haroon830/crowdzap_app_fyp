import React, {Component} from "react";
import {CustomPaper} from "../../Common/CusomPaper"
import {Typography} from '@material-ui/core'

class RecentTransactions extends Component{
    render(){   
        let tableData = []
        if(this.props.cryptoOrders){
            tableData = this.props.cryptoOrders.map((element, index)=>{
               return {
                    amount: element.amount,
                    orderTime: new Date(element.createdAt).toDateString(),
                    transactionId: element.fiatCurrencyTranId
                }
            });
        } 
        return(
            <CustomPaper className="recentTransactions">
                <Typography gutterBottom  variant="h5" >
                        Recent Transactions
                </Typography>
            </CustomPaper>
        )
    }
}  
  
export default RecentTransactions