import Button from '../Button';
import UserAvatar from '../GeneralSettings/UserAvatar';
import Modal from '../Modal';

const PostStories = ({ show, onClose }) => {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Add Media"
      size="max-w-xl"
      showFilterIcon={true}
    >
      <div className="my-10 flex flex-wrap gap-3 justify-center">
        {[1, 2, 3, 4, 5, 6].map((image, index) => {
          return (
            <div key={index}>
              <UserAvatar isStories={true} />;
            </div>
          );
        })}
      </div>
      <Button label="Post Story" type="submit" btnclass="w-full h-14" />
    </Modal>
  );
};

export default PostStories;
