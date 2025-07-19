import { useCallback, useState } from 'react';
import Table from '../Table';
import SearchField from '../Input/SearchField';
import FilterButton from '../FilterButton';
import FilterModal from '../Modal/FilterModal';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '../Input/InputField';
import Button from '../Button';
import RadioGroup from '../Input/RadioGroup';
import ConfirmAd from './ConfirmAd';
import { useQuery } from '@tanstack/react-query';
import { getUgetAdvertsListingsser } from '../Utils/api';
import Loader from '../Loader/Loader';

const columns = [
  { key: 'ad_name', label: 'Ad Name' },
  { key: 'type', label: 'Type' },
  { key: 'start_date', label: 'Start Date' },
  { key: 'end_date', label: 'End Date' },
  { key: 'target_impressions', label: 'Target' },
  { key: 'progress_percentage', label: 'Progress' },
  { key: 'clicks', label: 'Clicks' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' },
];

const adsData = [
  {
    id: 1,
    name: 'Spring Sale Campaign',
    type: 'Banner',
    startDate: '2025-06-01',
    endDate: '2025-06-15',
    target: 'Young Adults',
    progress: 60,
    clicks: 345,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Summer Giveaway',
    type: 'Video',
    startDate: '2025-06-10',
    endDate: '2025-06-30',
    target: 'All Users',
    progress: 80,
    clicks: 780,
    status: 'Paused',
  },
  {
    id: 3,
    name: 'Back to School',
    type: 'Image',
    startDate: '2025-07-01',
    endDate: '2025-07-14',
    target: 'Students',
    progress: 45,
    clicks: 212,
    status: 'Active',
  },
  {
    id: 4,
    name: 'New Product Launch',
    type: 'Video',
    startDate: '2025-07-10',
    endDate: '2025-07-31',
    target: 'Tech Enthusiasts',
    progress: 20,
    clicks: 95,
    status: 'Draft',
  },
  {
    id: 5,
    name: 'Holiday Deals',
    type: 'Banner',
    startDate: '2025-08-01',
    endDate: '2025-08-20',
    target: 'General Public',
    progress: 95,
    clicks: 1200,
    status: 'Active',
  },
  {
    id: 6,
    name: 'Flash Friday',
    type: 'Image',
    startDate: '2025-08-05',
    endDate: '2025-08-07',
    target: 'E-commerce Shoppers',
    progress: 100,
    clicks: 950,
    status: 'Completed',
  },
  {
    id: 7,
    name: 'Autumn Promo',
    type: 'Banner',
    startDate: '2025-09-01',
    endDate: '2025-09-15',
    target: 'Retail Customers',
    progress: 40,
    clicks: 300,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Free Trial Week',
    type: 'Video',
    startDate: '2025-09-20',
    endDate: '2025-09-27',
    target: 'New Users',
    progress: 75,
    clicks: 500,
    status: 'Paused',
  },
  {
    id: 9,
    name: 'Year-End Blowout',
    type: 'Image',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    target: 'All Users',
    progress: 30,
    clicks: 150,
    status: 'Draft',
  },
  {
    id: 10,
    name: 'Fitness Challenge',
    type: 'Video',
    startDate: '2025-10-10',
    endDate: '2025-10-24',
    target: 'Health Enthusiasts',
    progress: 50,
    clicks: 430,
    status: 'Active',
  },
];

const AdvertListings = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [confirmAd, setConfirmAd] = useState(null);
  const [confirmData, setConfirmData] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { data = [], isLoading } = useQuery({
    queryKey: ['AdvertListings'],
    queryFn: () => getUgetAdvertsListingsser(perPage, page),
    enabled: !!perPage || !!page,
  });

  const methods = useForm({
    defaultValues: {
      status: 'active',
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleClick = (actionKey) => {
    console.log(`Action performed: ${actionKey}`);
    setConfirmData(actionKey);

    handleConfirmAd();
  };
  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const handleConfirmAd = () => {
    setConfirmAd((prev) => !prev);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Table
        adsData={data?.data?.ads}
        columns={columns}
        handleClick={handleClick}
        actionOptions={[
          { key: 'paused', label: 'Pause Ad' },
          { key: 'stopped', label: 'Stop Ad' },
          { key: 'deleted', label: 'Delete Ad' },
        ]}
        handleFilter={handleFilter}
      />
      {showFilter && (
        <FilterModal showFilter={showFilter} handleFilter={handleFilter}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4 my-5"
            >
              <RadioGroup control={methods.control} name="status" />
              <InputField
                label={'Ad Name'}
                type="text"
                name={'name'}
                required={false}
              />
              <div className="flex justify-between gap-x-10 w-full">
                <InputField
                  label={'Start Date'}
                  type="date"
                  name={'start_date'}
                  required={false}
                />
                <InputField
                  label={'End Date'}
                  type="date"
                  name={'end_date'}
                  required={false}
                />
              </div>

              <Button
                type="submit"
                label="Apply Filter"
                className="w-full h-14"
              />
            </form>
          </FormProvider>
        </FilterModal>
      )}

      {confirmAd && (
        <ConfirmAd
          isOpen={confirmAd}
          onClose={handleConfirmAd}
          title={`Advert ${confirmData}`}
          description={`You have successfully ${confirmData} this advert`}
          handleConfirm={handleConfirmAd}
        />
      )}
    </>
  );
};

export default AdvertListings;
