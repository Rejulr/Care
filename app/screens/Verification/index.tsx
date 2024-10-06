import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Screen} from '../../components';
import {Document, PersonalInformation, Specialty} from '../../layout';
import {StackNavigation} from '../../navigators';

export const Verification = () => {
  const [layout, setLayout] = useState(1);
  const navigation = useNavigation<StackNavigation>();
  const next = () => {
    if (layout === 3) {
      navigation.navigate('VerificationStatus');
    } else {
      setLayout(layout + 1);
    }
  };
  return (
    <Screen buttonLabel="Continue" buttonOnPress={next}>
      {layout === 1 ? (
        <PersonalInformation />
      ) : layout === 2 ? (
        <Specialty />
      ) : layout === 3 ? (
        <Document />
      ) : (
        <></>
      )}
    </Screen>
  );
};
