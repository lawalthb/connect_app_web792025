import { TbWorldSearch } from 'react-icons/tb';
import { LiaUserEditSolid } from 'react-icons/lia';
import { LiaLinkSolid } from 'react-icons/lia';
import { RiWechatLine } from 'react-icons/ri';
import Link from 'next/link';
import { getCode } from 'country-list';
import { useRouter } from 'next/router';

const ProfileDetail = ({ userData }) => {
  const router = useRouter();
  const data = [
    {
      name: 'Post',
      input: userData?.total_posts,
    },
    {
      name: 'Total Likes',
      input: userData?.total_likes,
    },
    {
      name: 'Connected',
      input: userData?.total_connections,
    },
  ];

  const handleChatClick = () => {
    router.push('/chat');
  };

  const countryCode = userData?.country
    ? getCode(userData?.country?.name)
    : null;
  const flagUrl = countryCode
    ? `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`
    : null;

  const socialLinks = userData?.social_links
    ? JSON.parse(userData.social_links)?.map((link) => ({
        name: link.platform,
        url: link.url,
      }))
    : null;

  return (
    <div className="border border-[#A20030] p-4 rounded-lg bg-white shadow-md my-10">
      <h3 className="text-[#2B2F38] font-semibold text-[36px] leading-8 text-center">
        {userData?.name}
      </h3>
      <p className="text-[#667085] text-[20px] font-normal leading-[22px] text-center mt-3">
        {`@${userData?.username}`}
      </p>
      <div className="float-right">
        <RiWechatLine
          onClick={handleChatClick}
          className=" size-10 -mt-10 cursor-pointer text-[#A20030]"
        />
      </div>
      <div className="flex justify-center gap-10 items-center mt-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center mt-4 px-4 py-2"
          >
            <h3 className="text-[#2B2F38] font-semibold text-[24px] leading-[26px]">
              {item.input}
            </h3>
            <p className="text-[#667085] text-[20px] font-normal leading-[22px] w-max mt-2">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-[#2B2F38] font-semibold text-[24px] leading-[26px]">
          Details
        </h3>
        <div className="flex gap-2 items-center text-[#667085] my-2">
          <TbWorldSearch className="size-5 " />
          <div className="flex gap-x-3">
            <p className="font-normal text-[20px] leading-[22px] capitalize">
              {userData?.country?.name}
            </p>
            {flagUrl && (
              <img
                src={flagUrl}
                alt={`${userData?.country?.name} flag`}
                className="h-5 w-8"
              />
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center justified-start text-[#667085]">
          <LiaUserEditSolid className="size-5" />
          <p className="font-normal text-[20px] leading-[22px]">
            {userData?.bio}
          </p>
        </div>
        <div className="flex gap-2 items-center text-[#667085] my-2">
          <LiaLinkSolid className="size-5" />
          {socialLinks?.[0]?.url && (
            <Link
              href={socialLinks?.[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-[20px] leading-[22px] cursor-pointer hover:text-[#A20030]"
            >
              {socialLinks?.[0]?.url}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
