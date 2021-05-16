import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  createChapter,
  deleteChapter,
  listChapter,
  listChapterDetails,
  updateChapter,
} from '../../../actions/chapterActions';
import { listSubjects } from '../../../actions/subjectActions';
import search from '../../../assets/search.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import { CHAPTER_CREATE_RESET, CHAPTER_DETAILS_RESET, CHAPTER_UPDATE_RESET } from '../../../constants/chapterConstants';
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
  },
  formControl: {
    height: 40,
    margin: '12px 110px 16px 0',
    '& select': {
      height: 20,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      color: '#666',
      minWidth: 200,
    },
    '& label': {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 12,
    },
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
  title: {
    textAlign: 'center',
    padding: '16px 24px 0 24px',
    '& h2': {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#3f51b5',
    },
  },
}));
const ContentChapter = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const classes = usedStyles();
  const [keyword, setKeyWord] = useState('');
  const [subject, setSubject] = useState('6097a37b4b832e1eec635692');
  const [subjectAdd, setSubjectAdd] = useState('6097a37b4b832e1eec635692');
  const [subjectUpdate, setSubjectUpdate] = useState('6097a37b4b832e1eec635692');
  const [openUpdate, setOpenUpdate] = useState(false);
  const [titleAdd, setTitleAdd] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState('');
  const [page, setPage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subjectList = useSelector((state) => state.subjectList);
  const { loading: loadingSubjects, error: errorSubjects, subjects: subjectsList } = subjectList;

  const chapterList = useSelector((state) => state.chapterList);
  const { loading: loadingChapters, error: errorChapters, chapters: chaptersList } = chapterList;

  const chapterDetails = useSelector((state) => state.chapterDetails);
  const { loading: loadingDetails, error: errorDetails, chapter: chaptersDetails } = chapterDetails;

  const chapterUpdate = useSelector((state) => state.chapterUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = chapterUpdate;

  const chapterCreate = useSelector((state) => state.chapterCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = chapterCreate;

  const chapterDelete = useSelector((state) => state.chapterDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = chapterDelete;

  useEffect(() => {
    if (userInfo) {
      dispatch(listSubjects());
      dispatch(listChapter(subject, keyword, page));
    } else {
      history.push('/');
    }

    if (!loadingDetails) {
      setTitleUpdate(chaptersDetails.data.name);
      if (successUpdate) {
        dispatch({
          type: CHAPTER_UPDATE_RESET,
        });
      }
    }

    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch, subject, page, chaptersDetails, successCreate, successUpdate, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      dispatch(listChapter(subject, keyword));
      console.log(keyword);
    } else if (keyword.length === 0) {
      window.location.reload();
    }
  };

  const handleClickOpenUpdate = (id) => {
    dispatch(listChapterDetails(id));
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    dispatch({ type: CHAPTER_DETAILS_RESET });
    setTitleUpdate('');
    setOpenUpdate(false);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteChapter(id));
    }
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    dispatch({ type: CHAPTER_CREATE_RESET });
    setOpenAdd(false);
  };
  const addHandler = (e) => {
    e.preventDefault();
    dispatch(createChapter({ name: titleAdd, subject: subjectAdd, user: userInfo._id }));
    setOpenAdd(false);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateChapter({
        _id: chaptersDetails.data._id,
        name: titleUpdate,
        subject: subjectUpdate,
        user: userInfo._id,
      })
    );
    setOpenUpdate(false);
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <>
        {loadingCreate && <Loading />}
        {errorCreate && <Messages severity={'error'} message={errorCreate} />}
        {loadingUpdate && <Loading />}
        {errorUpdate && <Messages severity={'error'} message={errorUpdate} />}
        {loadingDelete && <Loading />}
        {errorDelete && <Messages severity={'error'} message={errorDelete} />}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-subjects-native-simple">Subjects</InputLabel>
            {loadingSubjects ? (
              <Loading />
            ) : errorSubjects ? (
              <Messages severity={'error'} message={errorSubjects} />
            ) : (
              <Select
                native
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  setSubjectUpdate(e.target.value);
                  setSubjectAdd(e.target.value);
                }}
                label="Subjects"
                inputProps={{
                  name: 'Subjects',
                  id: 'outlined-subjects-native-simple',
                }}
              >
                {subjectsList.subjects.length > 0 &&
                  subjectsList.subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
              </Select>
            )}
          </FormControl>
          <Button size="large" variant="contained" color="secondary" onClick={() => handleClickOpenAdd()}>
            New chapter
          </Button>
        </div>
        {loadingChapters ? (
          <Loading />
        ) : errorChapters ? (
          <Messages severity={'error'} message={errorChapters} />
        ) : (
          <div>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>CREATED BY</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {chaptersList.chapters.map((chapter) => (
                  <tr key={chapter._id}>
                    <td>{chapter._id}</td>
                    <td>{chapter.name}</td>
                    <td>{chapter.user.fullName}</td>
                    <td>
                      <Link onClick={() => handleClickOpenUpdate(chapter._id)}>
                        <Button>
                          <EditIcon />
                        </Button>
                      </Link>
                      <Link onClick={() => deleteHandler(chapter._id)}>
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
        )}

        <Pagination
          className={classes.pagination}
          color="primary"
          count={chaptersList.pages}
          page={chaptersList.page}
          size="large"
          onChange={pageHandler}
        ></Pagination>
      </>

      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-add"
      >
        <DialogTitle id="form-dialog-title-add">CHAPTER</DialogTitle>
        <DialogContent style={{ maxWidth: 550 }}>
          <form onSubmit={addHandler}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-subjects-native-simple">Subjects</InputLabel>
              {loadingSubjects ? (
                ''
              ) : errorSubjects ? (
                <Messages severity={'error'} message={errorSubjects} />
              ) : (
                <Select
                  native
                  value={subjectAdd}
                  onChange={(e) => setSubjectAdd(e.target.value)}
                  label="Subjects"
                  inputProps={{
                    name: 'Subjects',
                    id: 'outlined-subjects-native-simple',
                  }}
                >
                  {subjectsList.subjects.length > 0 &&
                    subjectsList.subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Chapter"
              name="name"
              autoComplete="name"
              required
              autoFocus
              style={{ width: 500 }}
              onChange={(e) => setTitleAdd(e.target.value)}
            />
            <DialogActions style={{ margin: '0 16px 16px 0' }}>
              <Button type="submit" color="primary" variant="contained">
                Add
              </Button>
              <Button onClick={handleCloseAdd} color="secondary" variant="contained">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title-add"
      >
        <DialogTitle id="form-dialog-title-add">CHAPTER</DialogTitle>
        <DialogContent style={{ maxWidth: 550 }}>
          <form onSubmit={updateHandler}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel className={classes.title} htmlFor="outlined-subjects-native-simple">
                Subjects
              </InputLabel>
              {loadingSubjects ? (
                ''
              ) : errorSubjects ? (
                <Messages severity={'error'} message={errorSubjects} />
              ) : (
                <Select
                  native
                  value={subjectUpdate}
                  onChange={(e) => setSubjectUpdate(e.target.value)}
                  label="Subjects"
                  inputProps={{
                    name: 'Subjects',
                    id: 'outlined-subjects-native-simple',
                  }}
                >
                  {subjectsList.subjects.length > 0 &&
                    subjectsList.subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="Chapter"
              name="name"
              autoComplete="name"
              required
              autoFocus
              value={titleUpdate}
              style={{ width: 500 }}
              onChange={(e) => setTitleUpdate(e.target.value)}
            />
            <DialogActions style={{ margin: '0 16px 16px 0' }}>
              <Button type="submit" color="primary" variant="contained">
                Update
              </Button>
              <Button onClick={handleCloseUpdate} color="secondary" variant="contained">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentChapter;
