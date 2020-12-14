import { createMuiTheme } from '@material-ui/core';
import {blue, blueGrey, red} from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: {
            main: '#f37049'
        },
        background:{
            default:'#363a41',
            paper:"#FDFDFD"
        },
        secondary:{
            main: '#f37049'
        },
        datePicker: {
            selectColor: "#f37049",
        },
    },
    /*overrides: {
        // Style sheet name ⚛️
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: 'linear-gradient(45deg, #e28b6d 30%, #Fdd032 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        }
    },*/

});
//e28b6d main color