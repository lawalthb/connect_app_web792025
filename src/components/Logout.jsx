import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi'; // Logout icon from react-icons
import { useLogout } from './Utils/api';

const Logout = () => {
  const router = useRouter();

  const logout = useLogout();

  return (
    <p
      onClick={logout}
      className="flex items-center gap-2 text-gray-700 hover:text-red-600 cursor-pointer transition duration-200 text-sm"
      role="button"
      tabIndex={0}
    >
      <FiLogOut className="w-4 h-4" />
      Logout
    </p>
  );
};

export default Logout;
