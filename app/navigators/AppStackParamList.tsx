import {NavigationProp} from '@react-navigation/native';

export type AppStackParamList = {
  Onboarding: undefined;
  Verification: undefined;
  VerificationStatus: undefined;
  ManageAppointment: undefined;
  CustomDateRange: undefined;
  HomeTab: undefined;
  Capture: {type: 'SELFIE' | 'ID'};
};
export type StackNavigation = NavigationProp<AppStackParamList>;
