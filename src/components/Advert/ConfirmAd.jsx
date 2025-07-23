import ConfirmationIcon from '@/Images/Icons/ConfirmationIcon';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import Modal from '../Modal';
import TickIcon from '@/Images/Icons/TickIcon.svg';

const ConfirmAd = ({
  isOpen,
  onClose,
  title,
  description,
  handleConfirm,
  confrimLabel = 'Done',
  onConfirm,
  isLoading,
  error,
  confirmation = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="max-w-xl">
      <div className="size-[90px] bg-[#A20030] flex items-center justify-center rounded-full mx-auto">
        {!confirmation && <TickIcon />}
        {confirmation && <ConfirmationIcon />}
      </div>
      <div className="mt-5 text-[#5C5C5C] text-center">
        <h3 className=" font-semibold text-[28px] leading-8 capitalize">
          {title}
        </h3>
        <p className="font-normal text-base leading-6 my-14 mx-16">
          {description}
        </p>
      </div>

      {!confirmation && (
        <Button
          label={confrimLabel}
          btnclass="w-full h-14"
          onClick={handleConfirm}
        />
      )}
      {confirmation && (
        <div className="flex gap-4 mt-6">
          <Button
            label="No"
            variant="outlined"
            onClick={handleConfirm}
            btnclass="w-full h-14"
            disabled={isLoading}
          />
          <Button
            label="Yes"
            btnclass="w-full h-14"
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      )}
      <ErrorMsg errorMessage={error?.message} />
    </Modal>
  );
};

export default ConfirmAd;
