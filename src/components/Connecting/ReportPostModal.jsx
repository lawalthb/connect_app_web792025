import { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import { useMutation } from '@tanstack/react-query';
import { reportUser } from '../Utils/api';

const ReportPostModal = ({ isOpen, onClose, feedId }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportPayload, setReportPayload] = useState(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ data, id }) => reportUser(data, id),
    onSuccess: () => {
      setReportPayload(null);
      onClose();
    },
    onError: (err) => {
      console.error('Report failed:', err.message);
    },
  });

  const reports = [
    { id: 1, reason: 'Spam', description: 'This post looks like spam content' },
    {
      id: 2,
      reason: 'Misinformation',
      description: 'This post contains fake or misleading information',
    },
    {
      id: 3,
      reason: 'Harassment',
      description: 'This post is abusive or targets individuals or groups',
    },
    {
      id: 4,
      reason: 'Violence',
      description: 'This post promotes violence or dangerous organizations',
    },
    {
      id: 5,
      reason: 'Hate Speech',
      description: 'This post contains hate speech or symbols',
    },
    {
      id: 6,
      reason: 'Nudity or Sexual Content',
      description: 'This post contains nudity or sexual content',
    },
    {
      id: 7,
      reason: 'Not Interested',
      description: 'I am not interested in this kind of posts',
    },
    { id: 8, reason: 'Other', description: 'Other reason not listed above' },
  ];

  const handleSelect = (id, reason, description) => {
    setSelectedReport(id);
    setReportPayload({ reason, description });
  };

  const handleSubmit = () => {
    if (!selectedReport) {
      return;
    }
    mutate({ data: reportPayload, id: feedId });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="max-w-xl">
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Report Post
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please tell us why you are reporting this post. Only one reason can be
          selected.
        </p>

        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
          {reports.map((report) => (
            <label
              key={report.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition"
            >
              <input
                type="checkbox"
                value={report.id}
                checked={selectedReport === report.id}
                onChange={() =>
                  handleSelect(report.id, report.reason, report.description)
                }
                className="mt-1 accent-[#A20030] w-4 h-4"
              />
              <div>
                <p className="text-gray-800 font-medium">{report.reason}</p>
                <p className="text-gray-500 text-sm">{report.description}</p>
              </div>
            </label>
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-3">
          <Button
            label="Cancel"
            variant="outlined"
            onClick={onClose}
            btnclass="w-full h-14"
            disabled={isPending}
          />
          <Button
            label="Submit Report"
            btnclass="w-full h-14"
            onClick={handleSubmit}
            disabled={isPending || !selectedReport}
            isLoading={isPending}
          />
        </div>
        <ErrorMsg errorMessage={error?.message} />
      </div>
    </Modal>
  );
};

export default ReportPostModal;
