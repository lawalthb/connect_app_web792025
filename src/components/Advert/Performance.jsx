import Button from '../Button';
import { IoChevronForwardSharp } from 'react-icons/io5';
import LineChartComp from '../Charts/LineChartComp';
import { FormProvider, useForm } from 'react-hook-form';
import StackedBarChartComp from '../Charts/StackedBarChartComp';

const Performance = ({ handleCreateAd, handlePerformanceData }) => {
  const methods = useForm();
  const performanceData = [
    {
      name: 'Total Budget',
      amount: '$ 10,000',
    },
    {
      name: 'Remaining Budget',
      amount: '$ 10,000',
    },
    {
      name: 'Impressions',
      amount: '$ 10,000',
    },
    {
      name: 'Clicks',
      amount: '$ 10,000',
    },
    {
      name: 'Conversions',
      amount: '$ 10,000',
    },
  ];

  const lineChartData = [
    { date: 'Jan', value: 10000 },
    { date: 'Feb', value: 30000 },
    { date: 'Mar', value: 50000 },
    { date: 'Apr', value: 70000 },
    { date: 'May', value: 170000 },
    { date: 'Jun', value: 90000 },
  ];

  const stackedBarData = [
    { label: 'Mon', value: 4000, rest: 6000 },
    { label: 'Tue', value: 5000, rest: 5000 },
    { label: 'Wed', value: 7000, rest: 3000 },
    { label: 'Thu', value: 6000, rest: 4000 },
    { label: 'Fri', value: 8000, rest: 2000 },
    { label: 'Sat', value: 6500, rest: 3500 },
    { label: 'Sun', value: 5500, rest: 4500 },
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
              data={lineChartData}
              title="Impression overtime"
              chartLabel="Impressions"
            />
          </div>
          <div className="lg:p-10 w-full lg:w-[70%]">
            <StackedBarChartComp
              data={stackedBarData}
              title="Conversion by Campaign"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Performance;
