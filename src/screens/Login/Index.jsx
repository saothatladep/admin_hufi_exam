import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import login from '../../assets/login/login2.svg'
import LoginForm from './components/LoginForm'

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
}))
const Login = (props) => {
  const {location, history} = props;

  const classes = usedStyles()

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src='https://hufionlineexam.web.app/img/logo_exam.09f8e106.png'
            alt='login'
          />
          <LoginForm location={location} history={history}/>
          
        </div>
      </Container>
      <img src={login} alt='' />
    </div>
  )
}

export default Login
