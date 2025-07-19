import Button from '../Button';
import AdvertFallbackImage from '@/Images/AdvertFallbackImage.png';

const Preview = ({ data, handleBackToPerformance, handleConfirmAd }) => {
  const preveiwData = [
    {
      name: 'Ad Name',
      input: data.ad_headline,
    },
    {
      name: 'Target Audience',
      input: data.target_audience,
    },
    {
      name: 'Description',
      input: data.description,
    },
    {
      name: 'Budget',
      input: data.budget,
    },
    {
      name: 'Daily Budget',
      input: data.daily_budget,
    },
    {
      name: 'Start Date',
      input: data.start_date,
    },
    {
      name: 'End Date',
      input: data.end_date,
    },
    {
      name: 'Shedule',
      input: data.shedule,
    },
    {
      name: 'Ad Copy',
      input: data.ad_copy,
    },
    {
      name: 'Ad Placement',
      input: data.ad_placement,
    },
  ];
  return (
    <div className="w-[90%] lg:w-[70%] mx-auto mt-10 space-y-10">
      <div className=" border border-[#A20030] rounded-[30px] p-3 lg:p-10">
        <img
          src={data.identityMedia || AdvertFallbackImage.src}
          alt="Preview Image"
          className="min-h-[407px] rounded-[10px] w-full object-cover"
        />
        <div className="px-3 lg:px-10 py-7 space-y-2">
          {preveiwData.map((data, index) => (
            <div
              key={index}
              className="flex justify-between text-[#5C5C5C] font-normal text-base leading-6"
            >
              <h3>{data.name}</h3>
              <p>{data.input || '-'}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-x-10 items-center max-w-[510px] ml-auto">
        <Button
          label="Back"
          variant="outlined"
          onClick={handleBackToPerformance}
          btnclass="w-full h-14"
        />
        <Button
          label="Create Advert"
          onClick={handleConfirmAd}
          btnclass="w-full h-14"
        />
      </div>
    </div>
  );
};

export default Preview;
