import { useFormContext, useWatch, set } from 'react-hook-form';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import { format } from 'date-fns';

const DateRangeFields = ({ startDate, endDate }) => {
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setMinDate(format(today, 'yyyy-MM-dd'));
  }, []);

  const {
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        setError('end_date', {
          type: 'manual',
          message: 'End date must be after start date',
        });
      } else {
        clearErrors('end_date');
      }
    }
  }, [startDate, endDate, setError, clearErrors]);

  return (
    <div className="flex gap-4 w-full">
      <InputField
        label="Start Date"
        type="date"
        name="start_date"
        className="md:max-w-48"
        min={minDate}
      />
      <InputField
        label="End Date"
        type="date"
        name="end_date"
        className="md:max-w-48"
        min={minDate}
        error={errors.end_date?.message}
      />
    </div>
  );
};

export default DateRangeFields;
