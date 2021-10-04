/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Companies: undefined;
  Profile: undefined;
  Events: undefined
};

export type CompaniesParamList = {
  CompaniesScreen: undefined;
  CompanyDetailsScreen: {
    id: number;
  };
};

export type ProfileParamList = {
  ProfileScreen: undefined;
  EventDetailsScreen: {
    id: number;
  }
}

export type EventsParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    id: number;
  }
}
