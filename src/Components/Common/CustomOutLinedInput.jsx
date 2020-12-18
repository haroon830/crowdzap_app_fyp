import {
    textColor,
    fieldBorder,
    mainColor,
    fieldColor,
    selectedFieldColor
} from "./material-kit-react.jsx";
import {
  withStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

export const CssTextField = withStyles({
  root: {
      '& icon':{
          color:textColor
      },
    '& label':{
        color:textColor
    },
    '& label.Mui-focused': {
      color: mainColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: mainColor,
    },
    '& .MuiOutlinedInput-root': {
        color:textColor,
      '& fieldset': {
        borderColor: '#4f535a',
        border:"2px solid",       
      },
      '&:hover fieldset': {
        borderColor: 'gray',
      },
      '&.Mui-focused fieldset': {
            color:textColor,
            borderColor: mainColor
      },
    },
  },
})(TextField);

export const CssSelectField = withStyles({
  root: {
      '& icon':{
          color:textColor
      },
    '& label.Mui-focused': {
      color: mainColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: mainColor,
    },
    '& .MuiOutlinedInput-root': {
        color:textColor,
      '& fieldset': {
        borderColor: '#4f535a',
        border:"2px solid",       
      },
      '&.Mui-focused fieldset': {
            color:textColor,
            borderColor: mainColor
      },
    },
  },
})(Select);