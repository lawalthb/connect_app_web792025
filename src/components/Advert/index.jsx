import { useState } from 'react';
import BackToPreviousScreen from '../BackToPreviousScreen';
import Performance from './Performance';
import CreateAdvert from './CreateAdvert';
import Preview from './Preveiw';
import ConfirmAd from './ConfirmAd';
import AdvertListings from './AdvertListings';
import { getCountry, getSocialCircles } from '../Utils/api';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const Advert = () => {
  const [createAd, setCreateAd] = useState(false);
  const [preveiwAd, setPreviewAd] = useState(false);
  const [performanceTable, setPerformanceTable] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [confirmAd, setConfirmAd] = useState(null);

  const { data: countryList, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
  });

  const {
    data: socialCircles,
    isLoading: isLoadingSocialCircles,
    isError: isSocialCirclesError,
    error: socialCirclesError,
  } = useQuery({
    queryKey: ['socialCircle'],
    queryFn: getSocialCircles,
  });

  const handleCreateAd = () => {
    setCreateAd((prev) => !prev);
  };
  const handleConfirmAd = () => {
    setConfirmAd((prev) => !prev);
  };
  const handleBackToPerformance = () => {
    if (preveiwAd) {
      setPreviewAd(false);
      setCreateAd(true);
    } else {
      setCreateAd(false);
      setPerformanceTable(false);
    }
  };

  const handlePreviewAd = (data) => {
    console.log('Preview Ad:', data);
    setPreviewData(data);
    setCreateAd(false);
    setPreviewAd(true);
  };

  const handlePerformanceData = () => {
    setPerformanceTable((prev) => !prev);
    setCreateAd(false);
  };

  if (isLoadingCountry && isLoadingSocialCircles) return <Loader />;

  return (
    <div className="mx-7 lg:mx-28 my-16">
      {(createAd || preveiwAd || performanceTable) && (
        <BackToPreviousScreen onBackClick={handleBackToPerformance} />
      )}

      {!createAd && !preveiwAd && !performanceTable && (
        <Performance
          handleCreateAd={handleCreateAd}
          handlePerformanceData={handlePerformanceData}
        />
      )}
      {preveiwAd && (
        <Preview
          data={previewData}
          handleBackToPerformance={handleBackToPerformance}
          handleConfirmAd={handleConfirmAd}
        />
      )}
      {createAd && (
        <CreateAdvert
          handleConfirmAd={handleConfirmAd}
          handlePreviewAd={handlePreviewAd}
          countryList={countryList?.data?.countries}
          socialCircles={socialCircles?.data?.social_circles}
        />
      )}
      {confirmAd && (
        <ConfirmAd
          isOpen={confirmAd}
          onClose={() => {
            handleConfirmAd();
            handlePerformanceData();
          }}
          title={'Advert Under Review'}
          description={
            'Your ad will be reviewed by our admin for successful posting'
          }
          handleConfirm={() => {
            handleConfirmAd();
            handlePerformanceData();
          }}
        />
      )}
      <div className="-mx-10">{performanceTable && <AdvertListings />}</div>
    </div>
  );
};

export default Advert;
