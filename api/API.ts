import * as Auth from './auth';
import * as Companies from './companies';
import * as Events from './events';
import * as Tickets from './tickets';
import * as Users from './users';
import * as SignUp from './signup';
import * as Students from './students';
import * as SSs from './studentsessions';
import * as SSApplications from './sSApplications';
import * as S3bucket from './s3bucket'

export class API {
  static auth = Auth
  static companies = Companies
  static events = Events
  static tickets = Tickets
  static users = Users
  static signup = SignUp
  static students = Students
  static studentSessions = SSs
  static sSApplications = SSApplications
  static s3bucket = S3bucket
}
