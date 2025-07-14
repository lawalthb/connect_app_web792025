import Logout from './Logout';
import SettingsCard from './SettingsCard';
import SettingsHeader from './SettingsHeader';

const MainSettings = ({ handleSettingsClick, userData }) => {
  const settingsData = [
    {
      name: 'Account Setting',
      description: 'Access your account settings',
    },
    {
      name: 'Profile Image',
      description: 'Access your profile image',
    },
    {
      name: 'Change Password',
      description: 'Access your password settings',
    },
    {
      name: 'Change Country',
      description: 'Access country settings',
    },
    {
      name: 'Add External Links',
      description: 'Access your external link settings',
    },
    {
      name: 'Subscription',
      description: 'Access subscription settings',
    },
    {
      name: 'Delete Account',
      description: 'Access your account deletion',
    },
    {
      name: 'Notification',
      description: 'Access your notifications settings',
    },
    {
      name: 'Help & Support',
      description: 'Access your help&support settings',
    },
  ];

  return (
    <>
      <SettingsHeader userData={userData} />
      <div className="border border-[#A20030] w-[90%] lg:w-[60%] py-20 px-10 rounded-lg mx-auto mt-20">
        <div className="text-[#5C5C5C]">
          <h3 className="font-semibold text-[18px] leading-6">
            General Settings
          </h3>
          <p className="font-normal text-sm">Make changes to your settings</p>
        </div>
        <div className="my-12">
          {settingsData.map((data, index) => (
            <div key={index} className="mb-5">
              <SettingsCard
                handleSettingsClick={handleSettingsClick}
                data={data}
              />
            </div>
          ))}
        </div>
        <Logout handleSettingsClick={handleSettingsClick} />
      </div>
    </>
  );
};

export default MainSettings;
