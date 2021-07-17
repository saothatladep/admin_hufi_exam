import { Button, InputBase } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { fade, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listChapter } from '../../../actions/chapterActions';
import { listQuestion } from '../../../actions/questionActions';
import { listAllSubjects, listSubjects } from '../../../actions/subjectActions';
import search from '../../../assets/search.png';
import Loading from '../../../components/Loading';
import Messages from '../../../components/Messages';
import RemoveIcon from '@material-ui/icons/Remove';
import { createExam, listExamDetails, updateExam } from '../../../actions/examActions';
import { EXAM_CREATE_RESET, EXAM_DETAILS_RESET, EXAM_UPDATE_RESET } from '../../../constants/examConstants';

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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
  formControl: {
    height: 40,
    margin: '0 0 16px 0',
    '& select': {
      height: 20,
      backgroundColor: '#f5f5f5',
      fontSize: 16,
      color: '#666',
      minWidth: 100,
    },
    '& label': {
      fontSize: 16,
      fontWeight: 600,
      marginBottom: 12,
    },
  },
  questionSource: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
        '& img': {
          width: 40,
          borderRadius: 50,
        },
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
  name: {
    width: 700,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonAdd: {
    margin: '0 0 24px 0',
  },
  question: {},
}));
const ContentEditExam = (props) => {
  const { history, match } = props;
  const classes = usedStyles();
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState(0);
  const [subject, setSubject] = useState();
  const [chapter, setChapter] = useState();
  const [questionsAdd, setQuestionsAdd] = useState([]);
  const [exam, setExam] = useState({
    _id: '',
    name: '',
    questions: [],
    status: true,
    user: '',
  });

  const l = useSelector((state) => state.languageChange);

  const examId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subjectListAll = useSelector((state) => state.subjectListAll);
  const { loading: loadingSubjects, error: errorSubjects, subjects: subjectsList } = subjectListAll;

  const chapterList = useSelector((state) => state.chapterList);
  const { loading: loadingChapters, error: errorChapters, chapters: chaptersList } = chapterList;

  const questionList = useSelector((state) => state.questionList);
  const { loading: loadingQuestions, error: errorQuestions, questions: QuestionsList } = questionList;

  const examUpdate = useSelector((state) => state.examUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = examUpdate;

  const examDetails = useSelector((state) => state.examDetails);
  const { loading: loadingDetails, error: errorDetails, exam: examsDetails } = examDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(listAllSubjects());
    } else {
      history.push('/');
    }
    window.scrollTo(0, 0);
  }, [userInfo, history, dispatch]);

  useEffect(() => {
    if (subjectsList && !subject) {
      setSubject(subjectsList[0]._id);
    }
  }, [subjectsList]);

  useEffect(() => {
    if (chaptersList && chaptersList.chapters && !chapter) {
      setChapter(chaptersList.chapters[0]._id);
    } else if (chaptersList && chaptersList.chapters) {
      setChapter(chaptersList.chapters[0]._id);
    }
  }, [chaptersList, subject]);

  useEffect(() => {
    if (chapter) {
      dispatch(listQuestion(chapter, level, keyword, page));
    }
  }, [chapter, dispatch, chapter, page, level, keyword]);

  useEffect(() => {
    if (userInfo) {
      if (subject) {
        dispatch(listChapter(subject));
      }
    } else {
      history.push('/');
    }
    window.scrollTo(0, 0);
  }, [userInfo, dispatch, subject]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EXAM_UPDATE_RESET });
      dispatch({ type: EXAM_DETAILS_RESET });
      history.push('/exam');
    }
    if (!loadingDetails) {
      setExam({
        name: examsDetails.data.name,
        questions: examsDetails.data.questions,
        status: examsDetails.data.status,
      });
      setQuestionsAdd(examsDetails.data.questions);
    }

    window.scrollTo(0, 0);
  }, [dispatch, history, examsDetails.data, successUpdate]);

  useEffect(() => {
    console.log(examId);
    dispatch(listExamDetails(examId));
  }, [examId]);

  const updateExamHandler = (e) => {
    e.preventDefault();
    const data = [];
    questionsAdd.map((question) => data.push(question._id));
    dispatch(updateExam({ ...exam, id: examId, questions: data, user: userInfo._id }));
  };

  const handleClickAdd = (question) => {
    const data = [...questionsAdd];
    const questionExists = (id) => {
      return data.some((el) => {
        return el._id === id;
      });
    };
    if (questionExists(question._id)) {
      alert('Question has been added');
    } else {
      data.push(question);
      setQuestionsAdd(data);
    }
  };

  const handleClickRemove = (question) => {
    const data = [...questionsAdd];
    setQuestionsAdd(data.filter((item) => item._id !== question._id));
  };

  const pageHandler = (e, page) => {
    setPage(page);
  };

  return (
    <form onSubmit={updateExamHandler} className={classes.root}>
      <div className={classes.name}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="exam"
          label={l.examName}
          name="exam"
          autoComplete="exam"
          required
          multiline
          value={exam.name}
          onChange={(e) => setExam({ ...exam, name: e.target.value })}
          style={{ width: 550 }}
        />
        <FormControl component="fieldset">
          <FormControlLabel
            control={
              <Switch
                checked={exam.status}
                onChange={(e) => setExam({ ...exam, status: e.target.checked })}
                name="status"
                color="primary"
              />
            }
            label={l.status}
          />
        </FormControl>
      </div>

      <div className={classes.question}>
        <div className={classes.questionSource}>
          <form className={classes.search}>
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
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <div className={classes.action}>
            <FormControl variant="outlined" className={classes.formControl} style={{ maxWidth: 320 }}>
              <InputLabel htmlFor="outlined-subjects-native-simple">{l.subject}</InputLabel>
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
                  }}
                  label="Subjects"
                  inputProps={{
                    name: 'Subjects',
                    id: 'outlined-subjects-native-simple',
                  }}
                >
                  {subjectsList && subjectsList.length > 0 &&
                    subjectsList.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl} style={{ maxWidth: 320 }}>
              <InputLabel htmlFor="outlined-chapters-native-simple">{l.chapter}</InputLabel>
              {loadingChapters ? (
                <Loading />
              ) : errorChapters ? (
                <Messages severity={'error'} message={errorChapters} />
              ) : (
                <>
                  <Select
                    native
                    value={chapter}
                    onChange={(e) => {
                      setChapter(e.target.value);
                    }}
                    label="Chapters"
                    inputProps={{
                      name: 'Chapters',
                      id: 'outlined-chapters-native-simple',
                    }}
                  >
                    {chaptersList.chapters.length > 0 &&
                      chaptersList.chapters.map((chapter) => (
                        <option key={chapter._id} value={chapter._id}>
                          {chapter.name}
                        </option>
                      ))}
                  </Select>
                </>
              )}
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-levels-native-simple">{l.level}</InputLabel>
              <Select
                native
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                label="Levels"
                inputProps={{
                  name: 'Levels',
                  id: 'outlined-levels-native-simple',
                }}
              >
                <option value={0}>{l.allLevel}</option>
                <option value={1}>{l.easy}</option>
                <option value={2}>{l.normal}</option>
                <option value={3}>{l.hard}</option>
              </Select>
            </FormControl>
          </div>
          {loadingQuestions ? (
            <Loading />
          ) : errorQuestions ? (
            <Messages severity={'error'} message={errorQuestions} />
          ) : (
            <div>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>{l.questionName}</th>
                    <th>{l.createdBy}</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {QuestionsList.questions.map((question) => (
                    <tr key={question._id}>
                      <td>{question.title}</td>
                      <td>{question.user.fullName}</td>
                      <td>
                        <Link onClick={() => handleClickAdd(question)}>
                          <Button>
                            <AddIcon />
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
            count={QuestionsList.pages}
            page={page}
            size="large"
            onChange={pageHandler}
          />
        </div>

        <div className={classes.questionAdd}>
          <div>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>{l.no}</th>
                  <th>{l.questionName}</th>
                  <th></th>
                </tr>
              </thead>
              {questionsAdd.map((question, index) => {
                return (
                  <tbody>
                    <tr key={question._id}>
                      <td>{index + 1}</td>
                      <td>{question.title}</td>
                      <td>
                        <Link onClick={() => handleClickRemove(question)}>
                          <Button>
                            <RemoveIcon />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      <Button className={classes.buttonAdd} type="submit" color="primary" variant="contained">
        {l.update}
      </Button>
    </form>
  );
};

export default ContentEditExam;
