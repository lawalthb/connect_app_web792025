import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import ProfileCard from './Connecting/ProfileCard';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { swipeCount } from './Utils/api';
import { useRouter } from 'next/router';

const ProfileCourasel = ({
  handleViewProfile,
  profiles,
  socialId,
  handleUserData,
  handleButtonClick,
}) => {
  const router = useRouter();
  const [previousIndex, setPreviousIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: swipeCount,
    onSuccess: (data) => {
      handleSwipeCount(data.data.swipe_stats);
    },
    onError: (err) => {
      console.error('Swipe failed:', err.message);
    },
  });

  const handleSwipeCount = (swipeStats) => {
    if (swipeStats.daily_limit === swipeStats.total_swipes) {
      router.push('/settings?active=subscription');
    }
  };

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.realIndex;
    handleUserData(profiles[currentIndex]);
    let direction = null;

    if (currentIndex > previousIndex) {
      direction = 'right';
    } else if (currentIndex < previousIndex) {
      direction = 'left';
    }

    if (direction) {
      setSwipeDirection(direction);
      setTimeout(() => setSwipeDirection(null), 1500);
    }

    setPreviousIndex(currentIndex);
    setActiveIndex(currentIndex);

    if (direction && profiles[currentIndex]) {
      const selectedProfile = profiles[currentIndex];
      const payload = {
        user_id: selectedProfile.id,
        social_id: socialId,
        request_type: direction === 'right' ? 'right_swipe' : 'left_swipe',
        message: "Hi! I'd love to connect with you.",
      };
      mutate(payload);
    }
  };

  return (
    <div className="w-full max-w-[805px] mx-auto">
      <Swiper
        style={{ '--swiper-navigation-color': '#A20030' }}
        modules={[Navigation, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        loop={true}
        grabCursor={true}
        className="rounded-[30px]"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setPreviousIndex(swiper.realIndex);
        }}
        onSlideChange={handleSlideChange}
      >
        {profiles.map((profile, index) => (
          <SwiperSlide
            key={index}
            className="w-full max-w-[805px] flex justify-center"
          >
            <ProfileCard
              profile={profile}
              handleViewProfile={handleViewProfile}
              swipeDirection={activeIndex === index ? swipeDirection : null}
              handleButtonClick={handleButtonClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProfileCourasel;
