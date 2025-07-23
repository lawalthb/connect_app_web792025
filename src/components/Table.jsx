import { useState, useEffect } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import ActionDropdown from './ActionDropDown';
import StatusBadge from './StatusBadge';
import SearchField from './Input/SearchField';
import FilterButton from './FilterButton';
import ExportModal from './Modal/ExportModal';
import Button from './Button';
import HandleExportIcon from '@/Images/Icons/HandleExportIcon.svg';
import { handleExport } from './Utils/methods';

const Table = ({
  adsData,
  columns,
  handleClick,
  actionOptions,
  handleFilter,
  pagination,
  onPageChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showExport, setShowExport] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState([]);

  const handleCheckboxChange = (format) => {
    setSelectedFormat((prev) => (prev === format ? '' : format));
  };

  const handleSubmit = () => {
    const filteredColumns = columns.filter((col) => col.key !== 'action');

    handleExport(selectedFormat, adsData, filteredColumns);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-wrapper')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleExportModal = () => {
    setShowExport((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={handleExportModal}
        className="flex items-center justify-center gap-3 ml-auto w-28 mb-10 cursor-pointer hover:border hover:border-[#A20030] hover:rounded-xl py-2"
      >
        <HandleExportIcon />
        <p className="font-[500] text-base leading-6 text-[#A20030]">Export</p>
      </div>
      <div className="flex items-center justify-center gap-3 ml-auto max-w-md">
        <div className="w-[384px]">
          <SearchField />
        </div>
        <div className="w-[91px]">
          <FilterButton handleFilter={handleFilter} />
        </div>
      </div>
      <div className="mt-10 overflow-x-auto rounded-lg shadow border bg-white">
        {/* Desktop Table */}
        <div className="hidden lg:block min-h-[500px] overflow-y-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10">
              <tr>
                {columns?.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 font-medium whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {adsData?.map((ad) => (
                <tr key={ad.id} className="border-t hover:bg-gray-50">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 align-top whitespace-nowrap"
                    >
                      {col.key === 'progress' ? (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div
                              className="bg-[#A20030] h-2.5 rounded-full"
                              style={{ width: `${ad.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {ad.progress}%
                          </span>
                        </>
                      ) : col.key === 'status' ? (
                        <StatusBadge status={ad.status} />
                      ) : col.key === 'action' ? (
                        <div className="relative dropdown-wrapper">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(ad.id)}
                          >
                            <HiDotsVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
                          </button>
                          {openDropdown === ad.id && (
                            <ActionDropdown
                              onClose={() => toggleDropdown(null)}
                              handleClick={handleClick}
                              items={actionOptions}
                              advert={ad}
                            />
                          )}
                        </div>
                      ) : (
                        <span className="capitalize">{ad[col.key]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden flex flex-col gap-4 p-4">
          {adsData.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-gray-500 text-xs font-medium uppercase whitespace-nowrap">
                      {col.label}
                    </div>
                    <div className="text-sm text-gray-800 text-right flex-1">
                      {col.key === 'progress' ? (
                        <div className="w-full">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                            <div
                              className="bg-[#A20030] h-2.5 rounded-full"
                              style={{ width: `${ad.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {ad.progress}%
                          </span>
                        </div>
                      ) : col.key === 'status' ? (
                        <StatusBadge status={ad.status} />
                      ) : col.key === 'action' ? (
                        <div className="relative dropdown-wrapper">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(ad.id)}
                          >
                            <HiDotsVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
                          </button>
                          {openDropdown === ad.id && (
                            <ActionDropdown
                              onClose={() => toggleDropdown(null)}
                              handleClick={handleClick}
                              items={actionOptions}
                              advert={ad}
                            />
                          )}
                        </div>
                      ) : (
                        <span className="truncate">{ad[col.key]}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {pagination && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => onPageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 border rounded text-sm ${
                  page === pagination.current_page
                    ? 'bg-[#A20030] text-white'
                    : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
            className="px-3 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {showExport && (
        <ExportModal showExport={showExport} handleExport={handleExportModal}>
          <div className="flex flex-col gap-4">
            <div className="w-full px-7 py-5 bg-[#A2003021] rounded-xl my-5">
              <h3 className="font-semibold text-[18px] leading-6 text-gray-600">
                Select an option to export the list
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {['PDF', 'CSV', 'Excel'].map((format) => (
                <label
                  key={format}
                  className="inline-flex items-center gap-2 cursor-pointer text-base font-normal text-gray-800"
                >
                  <input
                    type="checkbox"
                    value={format.toLowerCase()}
                    checked={selectedFormat.includes(format.toLowerCase())}
                    onChange={() => handleCheckboxChange(format.toLowerCase())}
                    className="accent-[#A20030] w-4 h-4"
                  />
                  {format}
                </label>
              ))}
            </div>
            <Button
              type="button"
              label="Export"
              className="w-full h-14 mt-4"
              onClick={handleSubmit}
              disabled={selectedFormat.length === 0}
            />
          </div>
        </ExportModal>
      )}
    </>
  );
};

export default Table;
