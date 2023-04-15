import * as Auth from "./Auth";
import * as Companies from "./Companies";
import * as Events from "./Events";
import * as Tickets from "./Tickets";
import * as Users from "./Users";
import * as SignUp from "./SignUp";
import * as Students from "./Students";
import * as StudentSessions from "./StudentSessions";
import * as Applications from "./Applications";
import * as S3bucket from "./S3bucket";

export class API {
  static auth = Auth;
  static companies = Companies;
  static events = Events;
  static tickets = Tickets;
  static users = Users;
  static signup = SignUp;
  static students = Students;
  static studentSessions = StudentSessions;
  static applications = Applications;
  static s3bucket = S3bucket;
}
