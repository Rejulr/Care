import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {OnboardingCarousel, OnboardingProgress, Screen} from '../../components';
import {StackNavigation} from '../../navigators';
import {IScroll, SCROLL_DEFAULT} from '../../utils';

export const Onboarding = () => {
  const [progress, setProgress] = useState<IScroll>(SCROLL_DEFAULT);

  const carouselIndex = (index: IScroll) => {
    setProgress(index);
  };
  const navigation = useNavigation<StackNavigation>();
  return (
    <Screen
      buttonLabel="Get Started"
      buttonOnPress={() => navigation.navigate('Verification')}>
      <OnboardingProgress progress={progress} />
      <OnboardingCarousel carouselIndex={carouselIndex} />
    </Screen>
  );
};
