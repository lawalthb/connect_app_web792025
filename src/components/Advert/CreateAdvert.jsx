import { FormProvider, useForm, useWatch } from 'react-hook-form';
import InputField from '../Input/InputField';
import SelectField from '../Input/SelectField';
import ImageUpload from '../ImageUpload';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { useEffect, useState } from 'react';
import MultiSelectDropdown from '../Input/MultiSelectDropDown';
import CustomSelect from '../Input/CustomSelect';
import DateRangeFields from '../Input/DateRangeFields';
import { useMutation } from '@tanstack/react-query';
import { postAdvert } from '../Utils/api';
import ErrorMsg from '../ErrorMsg';

const CreateAdvert = ({
  handleConfirmAd,
  handlePreviewAd,
  countryList,
  socialCircles,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const methods = useForm();
  const { control } = methods;

  const allValues = useWatch({ control });
  const startDate = useWatch({ control, name: 'start_date' });
  const endDate = useWatch({ control, name: 'end_date' });

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: postAdvert,
    onSuccess: () => {
      reset();
      setSelectedCountry(null);
      setSelectedOptions([]);
      handleConfirmAd();
    },
    onError: (err) => {
      console.error('Advert update failed:', err.message);
    },
  });

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((item) => item.id === option.id);
      return exists
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, { id: option.id, name: option.name }];
    });
  };
  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const onSubmit = (data) => {
    const { identityMedia, shedule, acknowledge, ad_copy, ...rest } = data;
    const payload = {
      ...rest,
      type: 'banner',
      'target_social_circles[0]': selectedOptions[0]?.id ?? '',
      'target_social_circles[1]': selectedOptions[1]?.id ?? '',
      'target_social_circles[2]': selectedOptions[2]?.id ?? '',
      'target_countries[0]': selectedCountry?.value,
      'media_files[]': data.identityMedia ? data.identityMedia : '',
    };

    mutate(payload);
  };

  const formattedCountries = countryList?.flat();

  const options = formattedCountries?.map((item) => ({
    value: item.id,
    label: item.name,
    logo: item.flag,
  }));

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto mt-10">
      <div className="my-5">
        <h3 className="text-[#5C5C5C] font-[500] text-[24px] leading-6">
          Create Advert
        </h3>
        <p className="font-normal text-base leading-6 text-[#8F8F8F] mt-5">
          Fill in details for your advert to promote your services
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-10 w-full">
            <div className="w-full md:w-1/2">
              <InputField label={'Ad Headline'} type="text" name={'ad_name'} />
            </div>
            <div className="flex gap-10 w-full md:w-1/2">
              <CustomSelect
                value={selectedCountry}
                onChange={handleChange}
                options={options}
                label="Target Audience"
                placeholder="Choose country..."
              />
            </div>
          </div>
          <div className="w-full">
            <InputField
              label={'Description'}
              type="text"
              name={'description'}
            />
            <MultiSelectDropdown
              label="Ad Placement"
              options={socialCircles}
              selectedOptions={selectedOptions}
              handleOptionToggle={handleOptionToggle}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-10 w-full">
            <div className="flex gap-4 w-full md:w-1/2">
              <DateRangeFields startDate={startDate} endDate={endDate} />
            </div>
            <div className="w-fill md:w-1/2">
              <SelectField
                label="Schedule"
                name="shedule"
                defaultValue=""
                required={false}
              >
                {['Daily'].map((placement) => (
                  <option key={placement} value={placement}>
                    {placement}
                  </option>
                ))}
              </SelectField>
            </div>
          </div>
          <div className="my-10">
            <ImageUpload
              handlePreview={(url) => methods.setValue('identityMedia', url)}
            />
          </div>
          <div className="flex gap-x-4">
            <InputField
              label={'Ad Copy'}
              type="text"
              name={'ad_copy'}
              required={false}
            />
            <InputField label={'Budget'} type="number" name={'budget'} />
            <InputField
              label={'Daily Budget'}
              type="number"
              name={'daily_budget'}
            />
          </div>

          <div className="flex items-center gap-x-2 my-10">
            <Checkbox name={'acknowledge'} id={'notify_user'} />
            <label
              htmlFor={'acknowledge'}
              className="font-normal text-sm text-[#5C5C5C]"
            >
              By continuing, you acknowledge you have agreed to the{' '}
              <span className="text-[#A20030]">Terms and Conditions</span>
            </label>
          </div>
          <div className="flex gap-x-5 items-center max-w-[510px] ml-auto">
            <Button
              label="Create Advert"
              type="submit"
              btnclass="w-full h-14"
              disabled={startDate > endDate}
              isLoading={isPending}
            />
            <Button
              label="Preview Ad"
              variant="outlined"
              onClick={() => handlePreviewAd?.(allValues)}
              btnclass="w-full h-14"
            />
          </div>
        </form>
        <ErrorMsg errorMessage={error?.message} />
      </FormProvider>
    </div>
  );
};

export default CreateAdvert;
