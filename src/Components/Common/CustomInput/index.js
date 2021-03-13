import {
    withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export const CssTextField = withStyles({
    root: {
        '& icon':{
            color:'#333737'
        },
        '& label':{
            color:'#232424'
        },
        '& label.Mui-focused': {
            color: '#2b2d2d',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#0EAAA6',
        },
        '& .MuiOutlinedInput-root': {
            color:'#0EAAA6',
            '& fieldset': {
                borderColor: '#4f535a',
                border:"2px solid",
            },
            '&:hover fieldset': {
                borderColor: 'gray',
            },
            '&.Mui-focused fieldset': {
                color:'#0EAAA6',
                borderColor: '#0EAAA6'
            },
        },
    },
})(TextField);