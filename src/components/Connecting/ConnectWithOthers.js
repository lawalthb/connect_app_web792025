import { useEffect, useState } from 'react';
import ConnectWithOthersDetail from './ConnectWithOthersDetail';
import ConnectCategiries from './ConnectCategories';
import { useMutation, useQuery } from '@tanstack/react-query';
import { explore, getCountry } from '../Utils/api';
import Loader from '../Loader/Loader';

const ConnectWithOthers = ({ socialCircles, socialId }) => {
  const [optionDetail, setOptionDetail] = useState(false);
  const [optionDetailData, setOptionDetailData] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: explore,
    onSuccess: (data) => {
      reset();
      setOptionDetailData(data);
      setOptionDetail(true);
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

  const handleButtonClick = (id) => {
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
        />
      )}
    </div>
  );
};

export default ConnectWithOthers;
