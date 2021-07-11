import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import axios from 'axios';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import search from '../../../assets/search.png';
import moment from 'moment';
import { deleteExam, listExam } from '../../../actions/examActions';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
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
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
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
}));
const ContentExam = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [keyword, setKeyWord] = useState('');
  const [page, setPage] = useState(1);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examList = useSelector((state) => state.examList);
  const { loading: loadingExams, error: errorExams, exams: examsList } = examList;

  const examDelete = useSelector((state) => state.examDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = examDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listExam(keyword, page));
    } else {
      history.push('/');
    }

    if (successDelete) {
      dispatch(listExam(keyword, page));
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch, history, keyword, page, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
    } else if (keyword.length === 0) {
      window.location.reload();
    }
  };

  const handleNewExam = () => {
    history.push('/exam/detail');
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteExam(id));
    }
  };

  const editExam = (id) => {
    history.push(`/exam/edit/${id}`);
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <>
        <div>
          <form className={classes.search} onSubmit={submitHandler}>
            <div className={classes.searchIcon}>
              <img src={search} alt="search"></img>
            </div>
            <InputBase
              placeholder="Enter Your Search..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              autoFocus
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </form>
        </div>
        <div className={classes.action}>
          <Button size="large" variant="contained" color="secondary" onClick={handleNewExam}>
            New exam
          </Button>
        </div>
        {loadingExams ? (
          <Loading />
        ) : errorExams ? (
          <Messages severity={'error'} message={errorExams} />
        ) : (
          <>
            <div>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>EXAM NAME</th>
                    <th>CREATED BY</th>
                    <th>CREATED DATE</th>
                    <th>STATUS</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {examsList &&
                    examsList.exams.map((exam) => (
                      <tr key={exam._id}>
                        <td>{exam.name}</td>
                        <td>{exam.user.fullName}</td>
                        <td>{moment(exam.updatedAt).format('DD/MM/YYYY, HH:mm')}</td>
                        <td>{exam.status ? 'Active' : 'Nonactive'}</td>
                        <td>
                          <Link onClick={() => editExam(exam._id)}>
                            <Button>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Link onClick={() => deleteHandler(exam._id)}>
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
              color="primary"
              count={examsList.pages}
              page={page}
              size="large"
              onChange={pageHandler}
            />
          </>
        )}
      </>
    </div>
  );
};

export default ContentExam;
