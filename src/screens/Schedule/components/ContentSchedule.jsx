import { Button } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import 'date-fns';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteSchedule, listSchedule } from '../../../actions/scheduleActions';
import search from '../../../assets/search.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
const usedStyles = makeStyles((theme) => ({
  root: {
    margin: '74px 0 0 265px',
    backgroundColor: '#fff',
    width: 1254,
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
            // margin: '0 4px',
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
const ContentSchedule = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [keyword, setKeyWord] = useState('');
  const [page, setPage] = useState(1);

  const l = useSelector((state) => state.languageChange);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const scheduleList = useSelector((state) => state.scheduleList);
  const { loading: loadingSchedules, error: errorSchedules, schedules: schedulesList } = scheduleList;

  const scheduleDelete = useSelector((state) => state.scheduleDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = scheduleDelete;

  useEffect(() => {
    if (userInfo.role === 2) {
      history.push('/subject');
    }
  }, [userInfo, history]);

  useEffect(() => {
    if (userInfo) {
      dispatch(listSchedule(keyword, page));
    } else {
      history.push('/');
    }

    if (successDelete) {
      dispatch(listSchedule(keyword, page));
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

  const handleNewSchedule = () => {
    history.push('/schedule/detail');
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteSchedule(id));
    }
  };

  const editSchedule = (id) => {
    history.push(`/schedule/edit/${id}`);
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
              placeholder={l.search}
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
          <Button size="large" variant="contained" color="secondary" onClick={handleNewSchedule}>
            <AddCircleIcon />
            {l.newSchedule}
          </Button>
        </div>
        {loadingSchedules ? (
          <Loading />
        ) : errorSchedules ? (
          <Messages severity={'error'} message={errorSchedules} />
        ) : (
          <>
            <div>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>{l.scheduleName}</th>
                    <th>{l.timeStart}</th>
                    <th>{l.timeEnd}</th>
                    <th>{l.createdBy}</th>
                    <th>{l.createdDate}</th>
                    <th>{l.status}</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {schedulesList &&
                    schedulesList.schedules.map((schedule) => (
                      <tr key={schedule._id}>
                        <td>{schedule.name}</td>
                        <td>{moment(schedule.timeStart).format('DD/MM/YYYY, HH:mm')}</td>
                        <td>{moment(schedule.timeEnd).format('DD/MM/YYYY, HH:mm')}</td>
                        <td>{schedule.user.fullName}</td>
                        <td>{moment(schedule.createdAt).format('DD/MM/YYYY, HH:mm')}</td>
                        <td>
                          {schedule.status ? (
                            <Brightness1Icon style={{ color: '#00df00' }} />
                          ) : (
                            <Brightness1Icon style={{ color: '#ff6161' }} />
                          )}
                        </td>
                        <td>
                          <Link onClick={() => editSchedule(schedule._id)}>
                            <Button style={{ margin: '4px 4px' }}>
                              <EditIcon />
                            </Button>
                          </Link>
                          <Link onClick={() => deleteHandler(schedule._id)}>
                            <Button style={{ margin: '4px 4px' }}>
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
              count={schedulesList.pages}
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

export default ContentSchedule;
