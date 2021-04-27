import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { primaryText } from 'assets/css_variable/variable';
import React from 'react';


const usedStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: '#fff',
      padding: '100px 0',
      textAlign: 'center',
      '& svg': {
        color: primaryText,
      },
      // display: 'flex',
      // '& > * + *': {
      //   marginLeft: theme.spacing(2),
      // },
    },
  }));
const Loading = () => {
    const classes = usedStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="secondary" />
        </div>
    )
}

export default Loading
