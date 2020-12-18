import React, {Component} from "react";
import MaterialTable from "material-table";
import {connect} from "react-redux"
import {getCryptoOrders} from "../../../services/admin/CryptoOrders"

class CryptoOrders extends Component{
    componentDidMount(){
        if(!this.props.fetchTried){
            this.props.getCryptoOrders(this.props.nodeName)
        }
    }
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
            <div
                role="tabpanel"
                hidden={this.props.value !== 2}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                className="orders"
            >
                <MaterialTable
                    title="Rel Coin Orders"
                    columns={[
                        { title: 'Amount', field: 'amount', type:'number' },
                        { title: 'Order Time', field: 'orderTime', type:'datetime' },
                        { title: 'Transaction Id', field: 'transactionId', type: 'alphanumeric' },
                    ]}
                    data={tableData}
                    actions={[
                        {
                            icon: 'send',
                            tooltip: 'Send Crypto',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                            icon: 'clear',
                            tooltip: 'Cancel Order',
                            onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                        }
                    ]}
                    options={{
                        headerStyle:{
                            color: '#f46b48',
                            fontSize:'larger',
                            weight:'bolder'
                        }
                    }}
                />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    fetchTried: state.admin.cryptoOrders.tried,
    cryptoOrders: state.admin.cryptoOrders.orders,
    nodeName : state.admin.nodeConfig.nodeName
  });
  
  
export default connect(
    mapStateToProps,
    {
        getCryptoOrders
    })
    (CryptoOrders)