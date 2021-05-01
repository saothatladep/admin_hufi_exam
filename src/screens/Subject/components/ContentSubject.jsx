import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { Pagination } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  listSubjectDetails,
  listSubjects
} from '../../../actions/subjectActions'
import search from '../../../assets/search.png'
import Loading from '../../../components/Loading'
import Messages from '../../../components/Messages'
import { SUBJECT_DETAILS_RESET } from '../../../constants/subjectConstants'
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '80px 0 0 265px',
    backgroundColor: '#fff',
    width: 1271,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    position: 'relative',
    backgroundColor: fade('#666', 0.3),
    '&:hover': {
      boxShadow: '0 1px 6px rgb(32 33 36 / 40%)',
      borderColor: 'rgba(223,225,229,0)',
    },
    marginRight: theme.spacing(2),
    margin: '24px',
    width: '500px',
    height: '40px',
    '& img': {
      width: 25,
    },
    borderRadius: 50,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: 25,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1.4, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: 440,
    height: '100%',
    fontSize: 16,
  },
  table: {
    width: 1200,
    border: '1px solid #3f51b5',
    margin: 24,
    '& thead': {
      fontSize: 16,
      fontWeight: '600',
      backgroundColor: '#3f51b5',
      color: '#fff',
      '& th': {
        fontWeight: 600,
        padding: '16px 27px',
        borderSpacing: '0px',
      },
    },
    '& tbody': {
      '& td': {
        padding: '17px 10px !important',
        textAlign: 'center',
        borderTop: '1px solid #3f51b5',
        borderLeft: '1px solid #3f51b5',
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        '& svg': {
          fontSize: 30,
          fontWeight: '600',
        },
        '& a': {
          textDecoration: 'none',
          '& button': {
            padding: '4px 4px',
            backgroundColor: '#3f51b5',
            fontSize: 12,
            color: '#fff',
            border: '1px solid #3f51b5',
            marginLeft: 4,
            '& svg': {
              fontSize: 24,
            },
            '&:hover': {
              backgroundColor: '#fff',
              color: '#3f51b5',
            },
          },
        },
      },
    },
  },
  pagination: {
    marginBottom: 24,
  },
}))
const ContentSubject = (props) => {
  const { history } = props
  const classes = usedStyles()
  const [keyword, setKeyWord] = useState('')
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const subjectList = useSelector((state) => state.subjectList)
  const { loading, error, subjects } = subjectList

  const subjectDetails = useSelector((state) => state.subjectDetails)
  const {
    loading: loadingDetails,
    error: errorDetails,
    subjects: subjectsDetails,
  } = subjectDetails

  const handleClickOpen = (id) => {
    dispatch(listSubjectDetails(id))
    setOpen(true)
  }

  const handleClose = () => {
    dispatch({ type: SUBJECT_DETAILS_RESET })
    setOpen(false)
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(listSubjects())
    } else {
      history.push('/')
    }
    window.scrollTo(0, 0)
  }, [userInfo, history, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    // if (keyword.trim()) {
    //   history.push(`/search/${keyword}`)
    // } else {
    //   history.push(`/subject`)
    // }
  }

  const deleteHandler = (id) => {
    // if (window.confirm('Are you sure?')) {
    //   dispatch(deleteUser(id))
    // }
  }
  return (
    <div className={classes.root}>
      {loading ? (
        <Loading />
      ) : error ? (
        <Messages severity={'error'} message={error} />
      ) : (
        <>
          <div>
            <form className={classes.search} onSubmit={submitHandler}>
              <div className={classes.searchIcon}>
                <img src={search} alt='search'></img>
              </div>
              <InputBase
                placeholder='Enter Your Search...'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => setKeyWord(e.target.value)}
              />
            </form>
          </div>
          <Button size='large' variant='contained' color='secondary'>
            New subject
          </Button>
          <div>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {subjects.data.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject._id}</td>
                    <td>{subject.name}</td>
                    <td>
                      <Link onClick={() => handleClickOpen(subject._id)}>
                        <Button>
                          <EditIcon />
                        </Button>
                      </Link>
                      <Link onClick={() => deleteHandler(subject._id)}>
                        <Button>
                          <DeleteIcon />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            className={classes.pagination}
            color='primary'
            count={10}
            // page={Number(pageNumber)}
            size='large'
            // onChange={pageHandler}
          ></Pagination>
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subject</DialogTitle>
        <DialogContent>
          {loadingDetails ? (
            <Loading />
          ) : errorDetails ? (
            <Messages severity={'error'} message={errorDetails} />
          ) : (
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='name'
              label='name'
              name='name'
              autoComplete='name'
              autoFocus
              style={{ width: 500 }}
              value={subjectsDetails.data.name}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions style={{ margin: '0 16px 16px 0' }}>
          <Button onClick={handleClose} color='primary' variant='contained'>
            Update
          </Button>
          <Button onClick={handleClose} color='secondary' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ContentSubject
