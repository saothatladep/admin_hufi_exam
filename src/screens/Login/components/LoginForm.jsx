import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Messages from '../../../components/Messages'
import Loading from '../../../components/Loading'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, logout } from '../../../actions/userActions'

const usedStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& input': {
      backgroundColor: '#fff',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
const LoginForm = (props) => {
  const classes = usedStyles()
  const dispatch = useDispatch()
  const { location, history } = props

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/user'

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const [id, setID] = useState({
    ID: '',
    isErr: false,
    err: '',
  })
  const [password, setPassword] = useState({
    pass: '',
    isErr: false,
    err: '',
  })

  const validate = () => {
    if (id.ID.length === 0) {
      setID({
        ...id,
        isErr: true,
        err: 'Please enter your ID',
      })
    } else {
      setID({
        ...id,
        isErr: false,
        err: '',
      })
    }

    if (password.pass === undefined || password.pass.length === 0) {
      setPassword({
        ...password,
        isErr: true,
        err: 'Please enter your password',
      })
    } else {
      setPassword({
        ...password,
        isErr: false,
        err: '',
      })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    validate()
    if (id.isErr === false && password.isErr === false) {
      dispatch(login(id.ID, password.pass))
    }
  }

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 1 || userInfo.role === 2) {
        history.push(redirect)
        // console.log(userInfo)
      }
      else if (userInfo.role === 3) {
        alert('You are not authorized to access')
        dispatch(logout())
      }
    }
    window.scrollTo(0, 0)
  }, [history, userInfo, redirect, dispatch])

  return (
    <>
      {error && <Messages severity={'error'} message={error} />}
      {loading && <Loading />}
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          id='ID'
          label='ID'
          name='ID'
          autoComplete='ID'
          autoFocus
          onChange={(e) => setID({ ...id, ID: e.target.value })}
          error={id.isErr}
          helperText={id.err}
        />
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
          onChange={(e) => setPassword({ ...password, pass: e.target.value })}
          error={password.isErr}
          helperText={password.err}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Log In
        </Button>
      </form>
    </>
  )
}

export default LoginForm
