import UserAvatar from './UserAvatar';

const { default: Modal } = require('../Modal');

const ProfileImage = ({ show, onClose }) => {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Change Profile Image,Avater,Video"
      size="max-w-xl"
      showFilterIcon={true}
    >
      <div className="mt-10 flex flex-wrap gap-3 justify-center">
        {[1, 2, 3, 4, 5].map((image, index) => {
          return (
            <div key={index}>
              <UserAvatar />;
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ProfileImage;
