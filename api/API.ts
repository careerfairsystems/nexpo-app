import * as Auth from './auth';
import * as Companies from './companies';
import * as events from './events';
import * as Users from './users';

export class API {
  static auth = Auth
  static companies = Companies
  static events = events
  static users = Users
}
