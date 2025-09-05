import { formatDistanceToNow } from 'date-fns';

export function TimeAgoDateFormat({ dateString }) {
  if (!dateString) return null;

  // Normalize backend timestamps (with or without microseconds)
  const cleaned = dateString.replace(/\.\d+Z$/, 'Z'); // strip microseconds if present

  const date = new Date(cleaned);

  if (isNaN(date.getTime())) {
    return <span>Invalid date</span>;
  }

  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return <span>{timeAgo}</span>;
}
