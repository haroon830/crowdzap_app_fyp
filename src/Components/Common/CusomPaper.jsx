import {
    withStyles,
  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

export const CustomPaper = withStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#2f3339',
        color:'white'
    },
})(Paper)
