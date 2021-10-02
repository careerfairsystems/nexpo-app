/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { SingleEvent } from "./api/events";
import { Company } from "./api/companies";

export type RootStackParamList = {
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
    id: number;
  };
};

export type ProfileParamList = {
  ProfileScreen: undefined;
}

export type EventsParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    id: number;
  }
}
