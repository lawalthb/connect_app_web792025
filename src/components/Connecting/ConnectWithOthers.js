import { useEffect, useState } from 'react';
import ConnectWithOthersDetail from './ConnectWithOthersDetail';
import ConnectCategiries from './ConnectCategories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { explore, getCountry } from '../Utils/api';
import Loader from '../Loader/Loader';
import Modal from '../Modal';

const ConnectWithOthers = ({
  socialCircles,
  socialId,
  myStoryData,
  otherStoryData,
  token,
}) => {
  const [optionDetail, setOptionDetail] = useState(false);
  const [optionDetailData, setOptionDetailData] = useState(false);
  const [connectShop, setConnectShop] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: explore,
    onSuccess: (data) => {
      reset();
      setOptionDetailData(data);
      handleOptionDetail();
    },
    onError: (err) => {
      console.error('Explore users failed:', err.message);
    },
  });

  const { data: countryList, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
  });

  useEffect(() => {
    setLoadingId(socialId);
    if (socialId) {
      mutate({ social_id: [socialId] });
    }
  }, []);

  const handleOptionDetail = () => {
    setOptionDetail((prev) => !prev);
  };

  const handleButtonClick = (id) => {
    if (id === 23) {
      setConnectShop(true);
      return;
    }
    setLoadingId(id);
    mutate({ social_id: [id] });
  };

  if (isPending || isLoadingCountry) return <Loader />;
  return (
    <div className="px-4">
      {!optionDetail && (
        <>
          <h3 className="font-bold text-[40px] text-[#A20030]">Category</h3>
          <ConnectCategiries
            socialCircles={socialCircles}
            handleButtonClick={handleButtonClick}
            isLoading={isPending}
            loadingId={loadingId}
            error={error}
          />
        </>
      )}
      {optionDetail && (
        <ConnectWithOthersDetail
          profiles={optionDetailData.data}
          socialId={loadingId}
          handleButtonClick={handleButtonClick}
          countryList={countryList?.data?.countries}
          handleBack={handleOptionDetail}
          socialCircles={socialCircles}
          myStoryData={myStoryData}
          otherStoryData={otherStoryData}
          token={token}
        />
      )}
      {connectShop && (
        <Modal
          isOpen={connectShop}
          onClose={() => setConnectShop(false)}
          size="max-w-xl"
        >
          <div className="mt-16 text-center px-6 pb-8">
            {/* Title */}
            <h3 className="font-bold text-3xl md:text-4xl text-[#A20030] mb-4">
              🚀 Connect Shop Coming Soon
            </h3>

            {/* Subtext */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Thank you for installing{' '}
              <span className="font-semibold">ConnectApp</span>. We are building
              the perfect marketplace where you can buy and sell products
              directly within your community.
              <br />
              Be the first to know when we launch!
            </p>

            {/* Email Input & Button */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#A20030] focus:outline-none text-gray-700"
              />
              <button
                onClick={() => setConnectShop(false)}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#A20030] text-white font-semibold hover:bg-[#870026] transition-all"
              >
                Notify Me
              </button>
            </div>

            {/* Small note */}
            <p className="text-xs text-gray-500 mt-3">
              We’ll only send updates about the launch. No spam, ever.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ConnectWithOthers;
