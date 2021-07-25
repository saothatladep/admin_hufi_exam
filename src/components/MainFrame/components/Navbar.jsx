import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/userActions';
import logo from '../../../assets/logo1.png';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@material-ui/core';
import { ENGLISH, VIETNAMESE } from '../../../constants/languageConstants';
import { red } from '@material-ui/core/colors';

const usedStyles = makeStyles((theme) => ({
  root: {
    height: 76,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  nav: {
    backgroundColor: '#001935',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 48px',
    '& img': {
      width: 70,
      padding: '8px 0',
    },
    '& svg': {
      color: '#fff',
      fontSize: 32,
      '&:hover': {
        color: '#ffd04b',
      },
    },
  },
  language: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    width: 125,
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
const Navbar = () => {
  const classes = usedStyles();

  const l = useSelector((state) => state.languageChange);

  const dispatch = useDispatch();
  const [languages, setLanguages] = useState(false);

  const handleChange = (event) => {
    setLanguages(event.target.checked);
    console.log(event.target.checked);
    if (event.target.checked) {
      dispatch({
        type: ENGLISH,
      });
      localStorage.setItem('type', JSON.stringify('ENGLISH'));
    } else {
      dispatch({
        type: VIETNAMESE,
      });
      localStorage.setItem('type', JSON.stringify('VIETNAMESE'));
    }
  };

  const type = JSON.parse(localStorage.getItem('type'));

  const logOutHandler = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Link to={'/user'}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={classes.language}>
            <p>{l.vietnamese}</p>
            <Switch
              onChange={handleChange}
              checked={type === 'ENGLISH'}
              color="red"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
            <p>{l.english}</p>
          </div>
          <div className={classes.action}>
            <Link to="/information">
              <AccountCircle />
            </Link>
            <Link to={''}>
              <NotificationsIcon />
            </Link>
            <Link to={'/'} onClick={logOutHandler}>
              <ExitToAppIcon />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
