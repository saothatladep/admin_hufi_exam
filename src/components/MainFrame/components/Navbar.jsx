import { Menu, MenuItem, Switch } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GetAppIcon from '@material-ui/icons/GetApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/userActions';
import logo from '../../../assets/logo1.png';
import { ENGLISH, VIETNAMESE } from '../../../constants/languageConstants';
import ReactExport from 'react-data-export';
import xls from '../../../assets/action/xls.png';
import moment from 'moment';
import User from '../../../assets/user.png';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: 160,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
  menu: {
    '& ul': {
      border: '2px solid #eee',
      padding: 0,
    },
    '& p': {
      margin: 0,
      display: 'flex',
      fontWeight: 600,
    },
    '& img': {
      width: 25,
      marginRight: 4,
    },
  },
}));

const Navbar = () => {
  const classes = usedStyles();

  const l = useSelector((state) => state.languageChange);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
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

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const userTemplate = [
    {
      role: 1,
      gender: 0,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0903010101',
      code: 'NVA',
      password: '123456',
      birthday: moment(new Date()).format('YYYY-MM-DD'),
      avatar: User,
    },
    {
      role: 2,
      gender: 1,
      fullName: 'Nguyễn Văn B',
      email: 'nguyenvanb@gmail.com',
      phone: '0903020202',
      code: 'NVB',
      password: '123456',
      birthday: moment(new Date()).format('YYYY-MM-DD'),
      avatar: User,
    },
    {
      role: 3,
      gender: 0,
      fullName: 'Nguyễn Văn C',
      email: 'nguyenvanc@gmail.com',
      phone: '0903030303',
      code: 'NVC',
      password: '123456',
      birthday: moment(new Date()).format('YYYY-MM-DD'),
      avatar: User,
    },
  ];
  const questionTemplate = [
    {
      chapter: 'chapter id',
      level: 1,
      question: 'cau hoi 1',
      a: 'cau hoi 1 a',
      b: 'cau hoi 1 b',
      c: 'cau hoi 1 c',
      d: 'cau hoi 1 d',
      result: 1,
    },
    {
      chapter: 'chapter id',
      level: 2,
      question: 'cau hoi 2',
      a: 'cau hoi 2 a',
      b: 'cau hoi 2 b',
      c: 'cau hoi 2 c',
      d: 'cau hoi 2 d',
      result: 2,
    },
    {
      chapter: 'chapter id',
      level: 3,
      question: 'cau hoi 3',
      a: 'cau hoi 3 a',
      b: 'cau hoi 3 b',
      c: 'cau hoi 3 c',
      d: 'cau hoi 3 d',
      result: 3,
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Link to={'/user'}>
            <img src={logo} alt="logo" />
          </Link>
          <div className={classes.language}>
            <p>{l.vietnamese}</p>
            <Switch onChange={handleChange} checked={type === 'ENGLISH'} color="red" />
            <p>{l.english}</p>
          </div>
          <div className={classes.action}>
            <GetAppIcon onClick={handleClick} />
            <Menu
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className={classes.menu}
            >
              <MenuItem onClick={handleClose}>
                <ExcelFile
                  element={
                    <p className={classes.export}>
                      <img src={xls} alt="xls" />
                      {l.templateUser}
                    </p>
                  }
                >
                  <ExcelSheet data={userTemplate} name="user-template">
                    <ExcelColumn label="role" value="role" />
                    <ExcelColumn label="gender" value="gender" />
                    <ExcelColumn label="fullName" value="fullName" />
                    <ExcelColumn label="email" value="email" />
                    <ExcelColumn label="phone" value="phone" />
                    <ExcelColumn label="code" value="code" />
                    <ExcelColumn label="password" value="password" />
                    <ExcelColumn label="birthday" value="birthday" />
                    <ExcelColumn label="avatar" value="avatar" />
                  </ExcelSheet>
                </ExcelFile>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ExcelFile
                  element={
                    <p className={classes.export}>
                      {' '}
                      <img src={xls} alt="xls" />
                      {l.templateQuestion}
                    </p>
                  }
                >
                  <ExcelSheet data={questionTemplate} name="question-template">
                    <ExcelColumn label="chapter" value="chapter" />
                    <ExcelColumn label="level" value="level" />
                    <ExcelColumn label="question" value="question" />
                    <ExcelColumn label="a" value="a" />
                    <ExcelColumn label="b" value="b" />
                    <ExcelColumn label="c" value="c" />
                    <ExcelColumn label="d" value="d" />
                    <ExcelColumn label="result" value="result" />
                  </ExcelSheet>
                </ExcelFile>
              </MenuItem>
            </Menu>
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
