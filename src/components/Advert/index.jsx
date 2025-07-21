import { useState } from 'react';
import BackToPreviousScreen from '../BackToPreviousScreen';
import Performance from './Performance';
import CreateAdvert from './CreateAdvert';
import ConfirmAd from './ConfirmAd';
import AdvertListings from './AdvertListings';
import {
  getAdvertDashboardData,
  getAnalyticsAvailableYear,
  getCountry,
  getImpressions,
  getSocialCircles,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { getCurrentYear } from '../Utils/methods';
import { useAdvertImageStore } from '@/zustandStore/useAdvertImageStore';
import { useCountryStore } from '@/zustandStore/useCountryStore';

const Advert = () => {
  const [createAd, setCreateAd] = useState(false);
  const [preveiwAd, setPreviewAd] = useState(false);
  const [performanceTable, setPerformanceTable] = useState(false);
  const [confirmAd, setConfirmAd] = useState(null);
  const [year, setYear] = useState(getCurrentYear());

  const { advertImage, clearMediaState } = useAdvertImageStore();
  const { setSelectedCountry } = useCountryStore();

  const { data: impressions = [], isLoading: isloadingImpressions } = useQuery({
    queryKey: ['impressions', year],
    queryFn: () => getImpressions(year),
    enabled: !!year,
  });

  const { data: countryList, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
  });

  const {
    data: analyticsAvailableYear,
    isLoading: isLoadinganalyticsAvailableYear,
  } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalyticsAvailableYear,
  });

  const { data: advertDashboardData, isLoading: isLoadingAdvertDashboardData } =
    useQuery({
      queryKey: ['advertDashboardData'],
      queryFn: getAdvertDashboardData,
    });

  const { data: socialCircles, isLoading: isLoadingSocialCircles } = useQuery({
    queryKey: ['socialCircle'],
    queryFn: getSocialCircles,
  });

  const handleYearChange = (newYear) => {
    setYear(newYear);
  };

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
      clearMediaState();
      setSelectedCountry(null);
    }
  };

  const handlePreviewAd = () => {
    setCreateAd(false);
    setPreviewAd(true);
  };

  const handlePerformanceData = () => {
    setCreateAd(false);
    setPreviewAd(false);
    setPerformanceTable((prev) => !prev);
  };

  if (
    isLoadingCountry ||
    isLoadingSocialCircles ||
    isLoadingAdvertDashboardData ||
    isloadingImpressions ||
    isLoadinganalyticsAvailableYear
  )
    return <Loader />;

  return (
    <div className="mx-7 lg:mx-28 my-16">
      {(createAd || preveiwAd || performanceTable) && (
        <BackToPreviousScreen onBackClick={handleBackToPerformance} />
      )}

      {!createAd && !preveiwAd && !performanceTable && (
        <Performance
          handleCreateAd={handleCreateAd}
          handlePerformanceData={handlePerformanceData}
          advertDashboardData={advertDashboardData?.data?.summary}
          handleYearChange={handleYearChange}
          impressions={impressions?.data?.data}
          analyticsAvailableYear={analyticsAvailableYear?.data?.years}
        />
      )}

      {(createAd || preveiwAd) && (
        <CreateAdvert
          handleConfirmAd={handleConfirmAd}
          handlePreviewAd={handlePreviewAd}
          countryList={countryList?.data?.countries}
          socialCircles={socialCircles?.data?.social_circles}
          preveiwAd={preveiwAd}
          createAd={createAd}
          handleBackToPerformance={handleBackToPerformance}
          advertImage={advertImage}
          clearMediaState={clearMediaState}
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
