import * as Auth from './auth';
import * as Companies from './companies';
import * as events from './events';
import * as tickets from './tickets';
import * as Users from './users';
import * as SignUp from './signup';

export class API {
  static auth = Auth
  static companies = Companies
  static events = events
  static tickets = tickets
  static users = Users
  static signup = SignUp
}
