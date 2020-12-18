import React, {Component} from "react";
import MaterialTable from "material-table";

class Polls extends Component{
    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    rows = [
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        this.createData('Eclair', 262, 16.0, 24, 6.0),
        this.createData('Cupcake', 305, 3.7, 67, 4.3),
        this.createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 0}
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
                    data={[
                        { amount: '5', orderTime: 'Baran', transactionId: 'cosmosnu88axa34asd6as334d32d32r'},
                        { amount: '7', orderTime: 'Baran', transactionId: 'cosmosnu88axa34asd6as334d32d32r'},
                    ]}
                    actions={[
                        {
                            icon: 'send',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                            icon: 'clear',
                            tooltip: 'Delete User',
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

export default Polls