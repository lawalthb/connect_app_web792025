import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ProfileCard from './Connecting/ProfileCard';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { swipeCount } from './Utils/api';
import { useRouter } from 'next/router';

const ProfileCourasel = ({ handleViewProfile, profiles, socialId }) => {
  const router = useRouter();
  const [previousIndex, setPreviousIndex] = useState(0);
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
    let request_type;
    if (currentIndex > previousIndex) {
      request_type = 'right_swipe';
    } else if (currentIndex < previousIndex) {
      request_type = 'left_swipe';
    }
    if (request_type && profiles[currentIndex]) {
      const selectedProfile = profiles[currentIndex];
      const payload = {
        user_id: selectedProfile.id,
        social_id: socialId,
        request_type,
        message: "Hi! I'd love to connect with you.",
      };
      mutate(payload);
    }
    setPreviousIndex(currentIndex);
  };

  return (
    <div className="w-full max-w-[805px] mx-auto">
      <Swiper
        style={{ '--swiper-navigation-color': '#A20030' }}
        modules={[EffectFlip, Autoplay, Navigation]}
        effect="flip"
        grabCursor={true}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        navigation
        pagination={{ clickable: true }}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProfileCourasel;
