import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import login from '../../assets/login/login2.svg';
import logo from '../../assets/logo.png';
import Meta from '../../components/Meta';
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
const usedStyles = makeStyles((theme) => ({
  root: {
    background: '#f2fff9',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& img': {
      width: 200,
    },
  },
}));
const Login = (props) => {
  const { location, history } = props;
  const l = useSelector((state) => state.languageChange);

  const classes = usedStyles();

  return (
    <div className={classes.root}>
      <Meta title={`TonTon | ${l.logIn}`} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="logo" />
          <LoginForm location={location} history={history} />
        </div>
      </Container>
      <img src={login} alt="" />
    </div>
  );
};

export default Login;
