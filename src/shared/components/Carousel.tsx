import { useState } from 'react';
import Slider from 'react-slick';
import { imgData } from '@images/imgData';
import { Box, Circle, HStack, Image, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styCarousel.css'


interface ImageData {
  id: number;
  imgUrl: string;
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    icon={<ChevronRightIcon />}
    aria-label="Next slide"
    position="absolute"
    top="50%"
    right="10px"
    transform="translateY(-50%)"
    zIndex={2}
    onClick={onClick}
  />
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <IconButton
    icon={<ChevronLeftIcon />}
    aria-label="Previous slide"
    position="absolute"
    top="50%"
    left="10px"
    transform="translateY(-50%)"
    zIndex={2}
    onClick={onClick}
  />
);

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const settings = {
    with: 100,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrentIndex(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
    };

  return (
    <Box className="slider-container" maxW="full" overflow="hidden" position="relative">
      <Slider {...settings}>
        {imgData.map((item: ImageData) => (
          <Box key={item.id} className="slide-item">
            <Image src={item.imgUrl} width={'full'} height={'fit-content'} objectFit="cover"/>
          </Box>
        ))}
      </Slider>
      <HStack className="dots-container" justify="center" mt={1}>
        {imgData.map((_: ImageData, idx: number) => (
          <Circle
            key={idx}
            size="22px"
            bg={idx === currentIndex ? 'blue.500' : 'gray.300'}
            onClick={() => setCurrentIndex(idx)}
            cursor="pointer"
          />
        ))}
      </HStack>
    </Box>
  );
};

export default Carousel;