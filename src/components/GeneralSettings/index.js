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
  getCountry,
  getProfileImages,
  getSubscription,
  useLogout,
  verifyMe,
} from '../Utils/api';
import Loader from '../Loader/Loader';
import useUserStore from '@/zustandStore/useUserStore';
import ProfileImage from './ProfileImage';
import VerifyMe from './VerifyMe';

const GeneralSettings = () => {
  const [activeSettings, setActiveSettings] = useState({});
  const [socialId, setSocialId] = useState(null);

  const router = useRouter();

  const { user, loading, refreshUser } = useUserStore();

  const { logout, isLoggingOut } = useLogout();

  const { data, isLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubscription,
  });

  const { data: profileImages, isLoading: isLoadingProfileImages } = useQuery({
    queryKey: ['profileImages'],
    queryFn: getProfileImages,
  });

  const { data: countryList, isLoading: isLoadingCountry } = useQuery({
    queryKey: ['country'],
    queryFn: getCountry,
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
    mutate: verifyMeMutation,
    isPending: isVerifying,
    isSuccess: isVerifySuccess,
    error: isVerifyError,
    reset: resetVerifyMeMutation,
  } = useMutation({
    mutationFn: verifyMe,
    onSuccess: () => {
      setTimeout(() => {
        resetVerifyMeMutation();
        handleBackToHomePage();
      }, 2000);
    },
    onError: (err) => {
      console.error('Verification failed:', err.message);
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
    const { id } = router.query;

    if (active) {
      setSocialId(id);
      const normalizedKey = active.replace(/\s+/g, '').toLowerCase();

      const newSettings = Object.fromEntries(
        Object.keys(activeSettings).map((key) => [key, false]),
      );

      setActiveSettings({
        ...newSettings,
        [normalizedKey]: true,
      });
      // router.replace('/settings', undefined, { shallow: true });
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
  };

  const allInactive = Object.values(activeSettings).every((value) => !value);

  const handleBackToHomePage = useCallback(() => {
    const { id } = router.query;
    console.log(id);
    if (id) {
      router.push(`/connecting?active=categories&id=${id}`);

      return;
    }
    setActiveSettings({});
  }, []);

  const onSubmitNewPassword = (data) => {
    changePasswordMutation(data);
  };

  const onSubmitVerification = (data) => {
    console.log(data, 'data');
    verifyMeMutation(data);
  };

  const handleLogout = () => {
    logout();
  };
  const handleDelete = (data) => {
    deleteAccountMutation(data);
  };

  if (isLoading || isLoadingCountry || isLoadingProfileImages)
    return <Loader />;

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
          profileImages={profileImages?.data?.images}
          mainProfileImage={profileImages?.data?.main_profile_image}
        />
      )}
      {activeSettings.notification && <Notifications />}
      {activeSettings.accountsetting && (
        <ProfileSettings countryList={countryList?.data?.countries} />
      )}
      {activeSettings.subscription && <Subscription data={data?.data} />}
      <ProfileImage
        show={activeSettings.profileimage}
        onClose={handleBackToHomePage}
        data={data?.data}
        profileImages={profileImages?.data?.images}
      />

      <VerifyMe
        activeSettings={activeSettings}
        handleBackToHomePage={handleBackToHomePage}
        onSubmitVerification={onSubmitVerification}
        error={isVerifyError}
        isLoading={isVerifying}
        isSuccess={isVerifySuccess}
      />
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
        countryList={countryList?.data?.countries}
      />
      <AddExternalLinks
        activeSettings={activeSettings}
        handleBackToHomePage={handleBackToHomePage}
      />
      <ConfirmationModal
        activeSettings={activeSettings.logout}
        handleBackToHomePage={handleBackToHomePage}
        title={'Logout'}
        description={'Are you sure you want to logout'}
        handleConfirm={handleLogout}
        confrimLabel={'Logout'}
        icon={() => <LogoutIcon />}
        isLoading={isLoggingOut}
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
