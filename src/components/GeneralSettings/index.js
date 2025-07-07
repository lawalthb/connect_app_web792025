import { useCallback, useEffect, useState } from 'react';
import MainSettings from './MainSettings';
import Notifications from './Notifications';
import ProfileSettings from './ProfileSettings';
import BackToPreviousScreen from '../BackToPreviousScreen';
import ChangePassword from './ChangePassword';
import ChangeCountry from './ChangeCountry';
import AddExternalLinks from './AddExternalLinks';
import ConfirmationModal from './ConfirmationModal';
import LogoutIcon from '@/Images/Icons/LogoutIcon.svg';
import Subscription from './Subscription';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  changePassword,
  deleteAccount,
  getSubscription,
  useLogout,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import useUserStore from '@/zustandStore/useUserStore';

const GeneralSettings = () => {
  const [activeSettings, setActiveSettings] = useState({});

  const router = useRouter();

  const { user, loading, refreshUser } = useUserStore();

  console.log(user, 'user');

  const logout = useLogout();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
  });

  const {
    mutate: changePasswordMutation,
    isPending: isLoadingChangePassword,
    isSuccess: isChangePasswordSuccess,
    isError: isChangePasswordError,
    error: changePasswordError,
    reset: resetChangePasswordMutation,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      setTimeout(() => {
        resetChangePasswordMutation();
        handleBackToHomePage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Change password failed:', err.message);
    },
  });

  const {
    mutate: deleteAccountMutation,
    isPending: isLoadingDeleteAccount,
    isSuccess: isDeleteAccountSuccess,
    isError: isDeleteAccountError,
    error: deleteAccountError,
  } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      setTimeout(() => {
        logout();
      }, 2000);
    },
    onError: (err) => {
      console.error('Delete account failed:', err.message);
    },
  });

  useEffect(() => {
    const { active } = router.query;

    if (active) {
      const normalizedKey = active.replace(/\s+/g, '').toLowerCase();

      const newSettings = Object.fromEntries(
        Object.keys(activeSettings).map((key) => [key, false]),
      );

      setActiveSettings({
        ...newSettings,
        [normalizedKey]: true,
      });
      router.replace('/settings', undefined, { shallow: true });
    }
  }, [router.query]);

  const handleSettingsClick = (identifier) => {
    const newSettings = Object.fromEntries(
      Object.keys(activeSettings).map((key) => [key, false]),
    );

    const normalizedKey = identifier.replace(/\s+/g, '').toLowerCase();

    setActiveSettings({
      ...newSettings,
      [normalizedKey]: true,
    });

    console.log('Active:', {
      ...newSettings,
      [normalizedKey]: true,
    });
  };

  const allInactive = Object.values(activeSettings).every((value) => !value);

  const handleBackToHomePage = useCallback(() => {
    setActiveSettings({});
  }, []);

  const onSubmitNewPassword = (data) => {
    changePasswordMutation(data);
  };
  const onSubmitNewCountry = (data) => {
    console.log(data);
  };
  const onSubmitExternalLinks = (data) => {
    console.log(data);
  };
  const handleLogout = () => {
    logout();
  };
  const handleDelete = (data) => {
    deleteAccountMutation(data);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mt-16 pb-60">
      {!allInactive && (
        <div className="mx-40">
          <BackToPreviousScreen onBackClick={handleBackToHomePage} />
        </div>
      )}
      {allInactive && (
        <MainSettings
          handleSettingsClick={handleSettingsClick}
          userData={user}
        />
      )}
      {activeSettings.notification && <Notifications />}
      {activeSettings.accountsetting && <ProfileSettings />}
      {activeSettings.subscription && <Subscription data={data.data} />}

      <ChangePassword
        activeSettings={activeSettings}
        handleBackToHomePage={handleBackToHomePage}
        onSubmitNewPassword={onSubmitNewPassword}
        error={changePasswordError}
        isLoading={isLoadingChangePassword}
        isSuccess={isChangePasswordSuccess}
      />
      <ChangeCountry
        activeSettings={activeSettings}
        handleBackToHomePage={handleBackToHomePage}
        onSubmitNewCountry={onSubmitNewCountry}
      />
      <AddExternalLinks
        activeSettings={activeSettings}
        handleBackToHomePage={handleBackToHomePage}
        onSubmitNewCountry={onSubmitExternalLinks}
      />
      <ConfirmationModal
        activeSettings={activeSettings.logout}
        handleBackToHomePage={handleBackToHomePage}
        title={'Logout'}
        description={'Are you sure you want to logout'}
        handleConfirm={handleLogout}
        confrimLabel={'Logout'}
        icon={() => <LogoutIcon />}
      />
      <ConfirmationModal
        activeSettings={activeSettings.deleteaccount}
        handleBackToHomePage={handleBackToHomePage}
        title={'Delete Account'}
        description={'Are you sure you want to delete your account'}
        handleConfirm={handleDelete}
        confrimLabel={'Delete'}
        icon={() => <LogoutIcon />}
        error={deleteAccountError}
        isSuccess={isDeleteAccountSuccess}
        isLoading={isLoadingDeleteAccount}
      />
    </div>
  );
};

export default GeneralSettings;
