import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules'
import { Image } from '@chakra-ui/react'

import carousel1 from '@images/carousel1.jpg'
import carousel2 from '@images/carousel2.jpg'
import carousel3 from '@images/carousel3.jpg'
import carousel4 from '@images/carousel4.jpg'
import carousel5 from '@images/carousel5.jpg'

const SwiperImages = [carousel1, carousel2, carousel3, carousel4, carousel5]


const Carousel = () => {
  return (
    <Swiper pagination={true} navigation={true}
    modules={[Navigation, Pagination]}>
    {
        SwiperImages.map(image => (
            <SwiperSlide key={image}>
                <Image pointerEvents='none' p='4em' src={image} />
            </SwiperSlide>
        ))
    }
    </Swiper>
  )
}

export default Carousel