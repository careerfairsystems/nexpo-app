/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { Company } from './api/companies';
import { SingleEvent } from './api/events';

export type RootStackParamList = {
  Login: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  Companies: undefined;
  Profile: undefined;
  Events: undefined
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type CompaniesParamList = {
  CompaniesScreen: undefined;
  CompanyDetailsScreen: {
    company: Company;
  };
};

export type ProfileParamList = {
  ProfileScreen: undefined;
}

export type EventsParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    event: SingleEvent;
  }
}
