import React, {useState} from 'react';
import {
  OnboardingCarousel,
  OnboardingFooter,
  OnboardingProgress,
  Screen,
} from '../../components';
import {IScroll, SCROLL_DEFAULT} from '../../utils';

export const Onboarding = () => {
  const [progress, setProgress] = useState<IScroll>(SCROLL_DEFAULT);

  const carouselIndex = (index: IScroll) => {
    setProgress(index);
  };
  return (
    <Screen>
      <OnboardingProgress progress={progress} />
      <OnboardingCarousel carouselIndex={carouselIndex} />
      <OnboardingFooter />
    </Screen>
  );
};
