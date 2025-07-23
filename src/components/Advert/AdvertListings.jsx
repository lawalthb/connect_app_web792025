import { useState } from 'react';
import Table from '../Table';
import FilterModal from '../Modal/FilterModal';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '../Input/InputField';
import Button from '../Button';
import RadioGroup from '../Input/RadioGroup';
import ConfirmAd from './ConfirmAd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdvertsListings, pauseAdvert, resumeAdvert } from '../Utils/api';
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
  const [confirmAdSuccess, setConfirmAdSuccess] = useState(false);

  const [confirmAd, setConfirmAd] = useState(false);
  const [id, setId] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [confirmAction, setConfirmAction] = useState(null);

  const queryClient = useQueryClient();

  const {
    mutate: resumeAdverts,
    isPending: isResumingAdvert,
    isSuccess: isAdvertResumed,
    error: isAdvertError,
    reset: resetResumeAdverts,
  } = useMutation({
    mutationFn: resumeAdvert,
    onSuccess: () => {
      setConfirmAdSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['AdvertListings'] });
    },
    onError: (err) => {
      console.error('Advert update failed:', err.message);
    },
  });

  const {
    mutate: pauseAdverts,
    isPending: isPauseAdverts,
    isSuccess: isPauseAdvertsSuccess,
    error: isPauseAdvertsError,
    reset: resetPauseAdverts,
  } = useMutation({
    mutationFn: pauseAdvert,
    onSuccess: () => {
      setConfirmAdSuccess(true);
      queryClient.invalidateQueries({ queryKey: ['AdvertListings'] });
    },
    onError: (err) => {
      console.error('Advert update failed:', err.message);
    },
  });

  const { data = [], isLoading } = useQuery({
    queryKey: ['AdvertListings', perPage, page],
    queryFn: () => getAdvertsListings(perPage, page),
    enabled: !!perPage || !!page,
  });

  const methods = useForm({
    defaultValues: {
      status: 'active',
    },
  });

  const handlePageChange = (page) => {
    setPage(page);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClick = (actionKey, id) => {
    setId(id);
    setConfirmAction(actionKey);
    setConfirmAd(true);
  };

  const onConfirm = () => {
    if (confirmAction === 'resume') {
      resumeAdverts({ id });
    } else {
      pauseAdverts({ id });
    }
  };

  const handleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const handleConfirmAd = () => {
    resetPauseAdverts();
    resetResumeAdverts();
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
          { key: 'pause', label: 'Pause Ad' },
          { key: 'resume', label: 'Resume Ad' },
        ]}
        handleFilter={handleFilter}
        pagination={data?.data?.pagination}
        onPageChange={handlePageChange}
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

      {confirmAdSuccess && (
        <ConfirmAd
          isOpen={confirmAdSuccess}
          onClose={handleConfirmAd}
          title={`Advert ${confirmAction}`}
          description={`You have successfully ${confirmAction} this advert`}
          handleConfirm={handleConfirmAd}
        />
      )}
      {confirmAd && (
        <ConfirmAd
          isOpen={confirmAd}
          onClose={handleConfirmAd}
          title={`Confirmation`}
          description={`Are you sure you want to ${confirmAction} this advert`}
          handleConfirm={handleConfirmAd}
          isLoading={isResumingAdvert || isPauseAdverts}
          error={isAdvertError || isPauseAdvertsError}
          onConfirm={onConfirm}
          confirmation={true}
        />
      )}
    </>
  );
};

export default AdvertListings;
