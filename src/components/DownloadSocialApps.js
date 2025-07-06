import Image from 'next/image';
import GooglePlayStoreBadge from '@/Images/GooglePlayStoreBadge.png';
import AppStoreBadge from '@/Images/AppStoreBadge.png';

const DownloadSocialApps = () => {
  return (
    <div className="flex gap-2 lg:gap-7">
      <Image
        src={AppStoreBadge}
        alt="App Store badge"
        className="cursor-pointer"
      />
      <Image
        src={GooglePlayStoreBadge}
        alt="Play Store badge"
        className="cursor-pointer"
      />
    </div>
  );
};

export default DownloadSocialApps;
