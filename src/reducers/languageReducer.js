import { ENGLISH, VIETNAMESE } from '../constants/languageConstants';

const vietnamese = {
  vietnamese: 'Tiếng Việt',
  english: 'Tiếng Anh',
  search: 'Nhập tìm kiếm của bạn ...',
  roles: 'Vị trí',
  user: 'Người dùng',
  subject: 'Môn học',
  chapter: 'Chương',
  question: 'Câu hỏi',
  exam: 'Đề thi',
  schedule: 'Lịch thi',
  result: 'kết quả',
  admin: 'Quản trị viên',
  teacher: 'Giáo viên',
  student: 'Học sinh',
  newUser: 'Thêm người dùng mới',
  importFile: 'Nhập file',
  avatar: 'Ảnh đại diện',
  code: 'Mã ID',
  fullName: 'Họ tên',
  gender: 'Giới tính',
  birthday: 'Ngày sinh',
  phone: 'SĐT',
  importAvatar: 'Thay đổi ảnh đại diện',
  update: 'cập nhật',
  cancel: 'Huỷ',
  male: 'Nam',
  female: 'Nữ',
  password: 'Mật khẩu',
  add: 'Thêm',
  newSubject: 'Thêm môn học mới',
  createdBy: 'Được tạo bởi',
  createdDate: 'Ngày tạo',
  subjectName: 'Tên môn học',
  chapterName: 'Tên chương',
  newChapter: 'Thêm chương mới',
  newQuestion: 'Thêm câu hỏi mới',
  level: 'Cấp độ',
  allLevel: 'Tất cả cấp độ',
  easy: 'Dễ',
  normal: 'Trung bình',
  hard: 'Khó',
  questionName: 'Tên câu hỏi',
  answer: 'Đáp án',
  newExam: 'Thêm đề thi mới',
  examName: 'Tên đề thi',
  status: 'Trạng thái',
  active: 'Hoạt động',
  nonActive: 'Không hoạt động',
  no: 'STT',
  scheduleName: 'Tên lịch thi',
  newSchedule: 'Thêm lịch thi mới',
  time: 'Thời gian',
  timeStart: 'thời gian bắt đầu',
  timeEnd: 'thời gian kết thúc',
  exportChapter: 'Xuất danh sách chương',
  exportResult: 'Xuất danh kết quả thi',
  changePassword: 'Thay đổi mật khẩu',
  confirmPassword: 'Xác nhận mật khẩu',
  personalInfo: 'Thông tin cá nhân',
  newPassword: 'Mật khẩu mới',
  oldPassword: 'Mật khẩu cũ',
  templateUser: 'Mẫu nhập dữ liệu người dùng',
  templateQuestion: 'Mẫu nhập dữ liệu câu hỏi',
  logIn: 'Đăng nhập',
  score: 'Điểm',
};

const english = {
  vietnamese: 'Vietnamese',
  english: 'English',
  search: 'Enter your search ...',
  roles: 'Roles',
  user: 'User',
  subject: 'Subject',
  chapter: 'Chapter',
  question: 'Question',
  exam: 'Exam',
  schedule: 'Schedule',
  result: 'Result',
  admin: 'Admin',
  teacher: 'Teacher',
  student: 'Student',
  newUser: 'New user',
  importFile: 'Import file',
  avatar: 'Avatar',
  code: 'ID',
  fullName: 'Full name',
  gender: 'Gender',
  birthday: 'Birthday',
  phone: 'Phone',
  importAvatar: 'Change avatar',
  update: 'Update',
  cancel: 'Cancel',
  male: 'Male',
  female: 'Female',
  password: 'Password',
  add: 'Add',
  newSubject: 'New subject',
  createdBy: 'Created by',
  createdDate: 'Created date',
  subjectName: 'Subject name',
  chapterName: 'Chapter name',
  newChapter: 'New chapter',
  newQuestion: 'New question',
  level: 'Level',
  allLevel: 'All level',
  easy: 'Easy',
  normal: 'Normal',
  hard: 'Hard',
  questionName: 'Question name',
  answer: 'Answer',
  newExam: 'Thêm đề thi mới',
  examName: 'Exam name',
  status: 'Status',
  active: 'Active',
  nonActive: 'Nonactive',
  no: 'No',
  scheduleName: 'Schedule name',
  newSchedule: 'New schedule',
  time: 'Time',
  timeStart: 'Time start',
  timeEnd: 'Time end',
  exportChapter: 'Export list chapters',
  exportResult: 'Export results',
  changePassword: 'Change password',
  confirmPassword: 'Confirm password',
  personalInfo: 'Personal information',
  newPassword: 'New password',
  oldPassword: 'Old password',
  templateUser: 'Template import user data',
  templateQuestion: 'Template import question data',
  logIn: 'Log in',
  score: 'Score',
};

export const changeLanguageReducer = (state = {}, action) => {
  switch (action.type) {
    case VIETNAMESE:
      return vietnamese;
    case ENGLISH:
      return english;
    default:
      return JSON.parse(localStorage.getItem('type')) === 'ENGLISH' ? english : vietnamese;
  }
};
