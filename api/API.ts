import * as Auth from "./Auth";
import * as Companies from "./Companies";
import * as Events from "./Events";
import * as Messages from "./Messages";
import * as Tickets from "./Tickets";
import * as Users from "./Users";
import * as SignUp from "./SignUp";
import * as Students from "./Students";
import * as StudentSessions from "./StudentSessions";
import * as Applications from "./Applications";
import * as S3bucket from "./S3bucket";
import * as Contacts from "./Contacts";
import * as SSO from "./SSO";
import * as FAQs from "./FAQs";
import * as Firebase from "./Firebase";
import * as Volunteers from "./Volunteers";
import * as Expo from './Expo';

export class API {
  static auth = Auth;
  static companies = Companies;
  static events = Events;
  static messages = Messages;
  static tickets = Tickets;
  static users = Users;
  static signup = SignUp;
  static students = Students;
  static studentSessions = StudentSessions;
  static applications = Applications;
  static s3bucket = S3bucket;
  static contacts = Contacts;
  static sso = SSO;
  static faqs = FAQs;
  static firebase = Firebase;
  static volunteers = Volunteers;
  static expo = Expo; 
}
