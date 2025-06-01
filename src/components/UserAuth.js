import { useEffect, useState } from 'react';
import TabSelector from './Layout/TabSelector';

import LoginUser from './LoginUser';
import SignUpUser from './SignUpUser';
import SocialAuth from './LoginUser/SocialAuth';

const UserAuth = ({
  firstTabName = 'Login with your email',
  secondTabName = 'Login with your social account',
}) => {
  const [activeTab, setActiveTab] = useState(firstTabName);

  const onTabChange = (newValue) => {
    setActiveTab(newValue);
  };
  return (
    <div className="px-32">
      <TabSelector
        firstTabName={firstTabName}
        secondTabName={secondTabName}
        onTabChange={onTabChange}
        activeTab={activeTab}
      />
      <div className="mx-auto w-[420px]">
        {activeTab === 'Login with your email' && <LoginUser />}
        {activeTab === 'Sign Up with your email' && <SignUpUser />}
        {(activeTab === 'Login with your social account' ||
          activeTab === 'Sign Up with your social account') && <SocialAuth />}
      </div>
    </div>
  );
};

export default UserAuth;
