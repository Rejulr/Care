import React from 'react';
import {CalenderTab} from '../../assets/svgs';
import {Box, Screen} from '../../components';
import {Header} from '../../components/Verification';
import {DAYS, formatDate, moderateScale} from '../../utils';

export const Appointment = () => {
  const day = new Date().getDay();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Screen styles={{backgroundColor: 'white'}} useAlignment useDefault>
      <Box
        flexDirection="row"
        mt="ll"
        justifyContent="space-between"
        alignItems="center">
        <Header
          title={DAYS[day - 1]}
          summary={formatDate(new Date())}
          addDefault={false}
        />
        <Box
          justifyContent="center"
          alignItems="center"
          height={46}
          width={46}
          backgroundColor="secondary2"
          borderRadius={moderateScale(100)}>
          <CalenderTab />
        </Box>
      </Box>
    </Screen>
  );
};
