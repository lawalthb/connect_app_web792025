import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import Modal from '../Modal';
import PropTypes from 'prop-types';
import SuccessMsg from '../SuccessMsg';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '../Input/InputField';

const ConfirmationModal = ({
  activeSettings,
  handleBackToHomePage,
  title,
  description,
  handleConfirm,
  confrimLabel,
  icon: Icon,
  error,
  isSuccess,
  isLoading,
}) => {
  const methods = useForm();

  return (
    <Modal
      isOpen={activeSettings}
      onClose={handleBackToHomePage}
      size="max-w-xl"
    >
      <div className="size-[90px] bg-[#D42620] flex items-center justify-center rounded-full mx-auto">
        {Icon && <Icon />}
      </div>
      <div className="mt-5 text-[#5C5C5C] text-center">
        <h3 className=" font-semibold text-[28px] leading-8">{title}</h3>
        <p className="font-normal text-base leading-6 my-14">{description}</p>
      </div>
      {title === 'Delete Account' && (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleConfirm)}
            className="space-y-4 mt-10"
          >
            <InputField label={'Password'} type="password" name={'password'} />
            <div className="flex gap-5">
              <Button
                label="Back"
                variant="outlined"
                onClick={handleBackToHomePage}
                btnclass="w-full h-14"
              />
              <Button
                label={confrimLabel}
                btnclass="w-full h-14"
                type="submit"
                isLoading={isLoading}
              />
            </div>
          </form>
        </FormProvider>
      )}
      {title !== 'Delete Account' && (
        <div className="flex gap-5">
          <Button
            label="Back"
            variant="outlined"
            onClick={handleBackToHomePage}
            btnclass="w-full h-14"
          />
          <Button
            label={confrimLabel}
            btnclass="w-full h-14"
            onClick={handleConfirm}
          />
        </div>
      )}
      <ErrorMsg errorMessage={error?.message} />
      {isSuccess && (
        <SuccessMsg successMessage="Account deleted successfully" />
      )}
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  icon: PropTypes.elementType, // Accepts a React component
  activeSettings: PropTypes.bool.isRequired,
  handleBackToHomePage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
