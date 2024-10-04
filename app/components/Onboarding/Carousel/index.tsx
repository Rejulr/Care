import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useCarousel} from '../../../hooks';
import {colors} from '../../../theme';
import {carouselData, IScroll} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$container, $item, $labelContainer, $labelHeading} from './styles';

type IOnboardingCarousel = {
  carouselIndex: (index: IScroll) => void;
};

export const OnboardingCarousel = ({carouselIndex}: IOnboardingCarousel) => {
  const {width} = Dimensions.get('window');
  const {onSnapToItem, scrollIndex} = useCarousel();
  const {secondary1, secondary2, secondary3} = colors;
  const CAROUSEL_ITEM_BACKGROUND_COLOR = [secondary1, secondary2, secondary3];

  useEffect(() => {
    carouselIndex(scrollIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollIndex]);

  return (
    <>
      <Carousel
        loop={false}
        autoPlayInterval={1500}
        width={width}
        style={$container}
        data={carouselData}
        pagingEnabled={true}
        onSnapToItem={onSnapToItem}
        renderItem={({index, item}) => (
          <Box key={index} flex={1} width={width} overflow="hidden">
            <Box
              borderRadius={10}
              justifyContent="center"
              style={[
                {backgroundColor: `${CAROUSEL_ITEM_BACKGROUND_COLOR[index]}`},
                $item,
              ]}
              alignItems="center"
              height="57%">
              {item.icon}
            </Box>

            <Box style={$labelContainer}>
              <Text textAlign="center" variant="mBold" style={$labelHeading}>
                {item.title}
              </Text>
              <Text paddingTop="xs" textAlign="center" variant="regular">
                {item.summary}
              </Text>
            </Box>
          </Box>
        )}
      />
    </>
  );
};
