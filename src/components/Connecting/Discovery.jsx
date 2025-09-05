import { useMutation } from '@tanstack/react-query';
import { explore, exploreByPost } from '../Utils/api';
import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Discovery = ({ handleShowSwipePage }) => {
  const [users, setUsers] = useState([]);
  const [userClicked, setUserClicked] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: exploreByPost,
    onSuccess: (data) => {
      setUsers(data.data);
    },
    onError: (err) => {
      console.error('Explore users failed:', err.message);
    },
  });

  const handleButtonClick = () => {
    mutate({ social_id: [26] });
  };

  useEffect(() => {
    handleButtonClick();
  }, []);

  if (isPending) return <Loader />;
  if (error) return <ErrorMsg errorMessage={error?.message} />;

  const handleImageClick = (id) => {
    setUserClicked(id);
  };

  return (
    <div className="w-full lg:w-[70%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-3 justify-items-center">
      {users?.map((user) => {
        return (
          <div
            key={user.id}
            onClick={() => handleImageClick(user.id)}
            className="w-[283px] h-[380px] relative"
          >
            <Image
              src={user?.user?.profile_url}
              alt="User"
              fill
              className="object-cover rounded-[10px]"
            />

            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 rounded-[10px]" />

              <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 pb-10 text-white">
                <div className="max-w-[387px] lg:max-w-full">
                  <div className="mb-8 lg:mb-4">
                    <Image
                      onClick={() => handleShowSwipePage(user.user.id)}
                      src={user?.user?.profile_images?.[0]?.profile_url}
                      alt={user?.name || 'User'}
                      width={60}
                      height={60}
                      className="cursor-pointer rounded-full object-cover aspect-square"
                    />
                  </div>
                  <h3 className="font-semibold text-base">
                    {user?.user?.name}
                  </h3>
                </div>
              </div>
            </>
          </div>
        );
      })}
    </div>
  );
};

export default Discovery;
