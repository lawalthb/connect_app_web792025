const SuccessMsg = ({ successMessage }) => {
  if (!successMessage) return null;

  return (
    <p className="text-sm text-center text-green-600 py-5">{successMessage}</p>
  );
};

export default SuccessMsg;
