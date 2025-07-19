import Button from '../Button';
import { IoChevronForwardSharp } from 'react-icons/io5';
import LineChartComp from '../Charts/LineChartComp';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import StackedBarChartComp from '../Charts/StackedBarChartComp';
import { useEffect } from 'react';

const Performance = ({
  handleCreateAd,
  handlePerformanceData,
  advertDashboardData,
  handleYearChange,
  impressions,
  analyticsAvailableYear,
}) => {
  const methods = useForm({
    defaultValues: {
      year: analyticsAvailableYear,
    },
  });

  const { control } = methods;
  const selectedYear = useWatch({ control, name: 'year' });

  useEffect(() => {
    if (selectedYear) {
      handleYearChange(selectedYear);
    }
  }, [selectedYear]);

  const simplifiedData = impressions.map((item) => ({
    month: item.month,
    impressions: item.impressions,
  }));

  const simplifiedConversionsData = impressions.map((item) => ({
    label: item.month,
    value: item.conversions,
    rest: item.impressions - item.conversions,
  }));

  const performanceData = [
    {
      name: 'Total Budget',
      amount: advertDashboardData.total_budget,
    },
    {
      name: 'Total Ads',
      amount: advertDashboardData.total_ads,
    },
    {
      name: 'Remaining Budget',
      amount: advertDashboardData.remaining_budget,
    },
    {
      name: 'Impressions',
      amount: advertDashboardData.total_impressions,
    },
    {
      name: 'Clicks',
      amount: advertDashboardData.total_clicks,
    },
    {
      name: 'Conversions',
      amount: advertDashboardData.total_conversions,
    },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex gap-x-4">
        <Button
          label="Create Ad"
          btnclass="w-full h-14 max-w-[204px] ml-auto"
          onClick={handleCreateAd}
        />
        <Button
          label="Listings"
          variant="outlined"
          btnclass="w-full h-14 max-w-[204px]"
          onClick={handlePerformanceData}
        />
      </div>

      <div className="overflow-x-auto mt-6">
        <div className="flex gap-4 min-w-max grid-cols-5">
          {performanceData.map((data, index) => (
            <div
              key={index}
              className="flex justify-between bg-[#A200301C] rounded-[16px] w-[227px] text-[#2E2E2E] p-6 shrink-0"
            >
              <div>
                <p className="font-normal text-[12px] leading-6 w-max">
                  {data.name}
                </p>
                <h3 className="font-semibold text-[28px] leading-8 mt-3">
                  {data.amount}
                </h3>
              </div>
              <IoChevronForwardSharp className="mt-1" />
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-semibold text-[24px] leading-6 text-[#2E2E2E] my-16">
        Performance
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
          <div className="lg:p-10">
            <LineChartComp
              data={simplifiedData}
              title="Impression overtime"
              chartLabel="Impressions"
              analyticsAvailableYear={analyticsAvailableYear}
            />
          </div>
          <div className="lg:p-10 w-full lg:w-[70%]">
            <StackedBarChartComp
              data={simplifiedConversionsData}
              title="Conversion by Campaign"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Performance;
