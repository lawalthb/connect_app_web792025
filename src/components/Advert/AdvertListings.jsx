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
import { getUgetAdvertsListings } from '../Utils/api';
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

const AdvertListings = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [confirmAd, setConfirmAd] = useState(null);
  const [confirmData, setConfirmData] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const { data = [], isLoading } = useQuery({
    queryKey: ['AdvertListings'],
    queryFn: () => getUgetAdvertsListings(perPage, page),
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
