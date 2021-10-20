import * as Auth from './auth';
import * as Companies from './companies';
import * as Events from './events';
import * as Tickets from './tickets';
import * as Users from './users';
import * as SignUp from './signup';
import * as Files from './files';
import * as CompanyConnections from './companyconnections';

export class API {
  static auth = Auth
  static companies = Companies
  static events = Events
  static tickets = Tickets
  static users = Users
  static signup = SignUp
  static files = Files
  static companyconnections = CompanyConnections
}
