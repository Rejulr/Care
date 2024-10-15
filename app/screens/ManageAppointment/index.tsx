import React, {useState} from 'react';
import {Screen} from '../../components';
import {useAppStore} from '../../data';
import {Basic, WorkingHours} from '../../layout';

export const ManageAppointment = () => {
  const {fee, dateRange} = useAppStore();
  const [layout, setLayout] = useState(1);

  const basicAppointmentInformationValid = fee && dateRange ? true : false;
  const nextLayout = () => {
    if (layout === 2) {
      setLayout(3);
    } else {
      setLayout(layout + 1);
    }
  };

  const enableButton = layout === 1 ? basicAppointmentInformationValid : false;
  console.log(basicAppointmentInformationValid);
  return (
    <Screen
      useAlignment
      buttonLabel="Continue"
      buttonOnPress={nextLayout}
      enabled={enableButton}>
      {layout === 1 ? <Basic /> : <WorkingHours />}
    </Screen>
  );
};
