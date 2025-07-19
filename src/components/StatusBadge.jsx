const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: 'bg-green-100 text-green-700',
    Paused: 'bg-yellow-100 text-yellow-700',
    Ended: 'bg-red-100 text-red-700',
    Completed: 'bg-blue-100 text-blue-700',
    Draft: 'bg-gray-100 text-gray-600',
  };

  const badgeStyle =
    statusStyles[status] || 'bg-gray-200 text-gray-700 border border-gray-300';

  return (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium whitespace-nowrap capitalize ${badgeStyle}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
