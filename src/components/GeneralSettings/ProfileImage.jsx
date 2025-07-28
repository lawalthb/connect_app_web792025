import Button from '../Button';
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
      <div className="my-10 flex flex-wrap gap-3 justify-center">
        {[1, 2, 3, 4, 5].map((image, index) => {
          return (
            <div key={index}>
              <UserAvatar />;
            </div>
          );
        })}
      </div>
      <Button label="Update" type="submit" btnclass="w-full h-14" />
    </Modal>
  );
};

export default ProfileImage;
