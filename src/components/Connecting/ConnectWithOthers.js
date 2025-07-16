import { useState } from 'react';
import ConnectWithOthersDetail from './ConnectWithOthersDetail';
import ConnectCategiries from './ConnectCategories';
import { useMutation } from '@tanstack/react-query';
import { explore } from '../Utils/api';

const ConnectWithOthers = ({ socialCircles }) => {
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

  const handleButtonClick = (id) => {
    setLoadingId(id);
    mutate({ social_id: [id] });
  };
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
        />
      )}
    </div>
  );
};

export default ConnectWithOthers;
