import { exportToCsv } from './exportToCsv';
import { exportToExcel } from './exportToExcel';
import { exportToPdf } from './exportToPdf';
import { formatDistanceToNow, isFuture, format } from 'date-fns';

export const formatRelativeTime = (dateString = '') => {
  const date = new Date(dateString);

  if (isFuture(date)) {
    return `on ${format(date, 'MMMM d, yyyy')}`;
  }

  return `${formatDistanceToNow(date, { addSuffix: true })}`;
};

export const handleExport = (format, adsData, columns) => {
  if (format === 'pdf') {
    exportToPdf(adsData, columns);
  } else if (format === 'csv') {
    exportToCsv('advert-data.csv', columns, adsData);
  } else if (format === 'excel') {
    exportToExcel(adsData, columns);
  }
};

export const getFormFieldError = (errors, name) => {
  // Handle nested paths like "question.0.type"
  if (!name || !errors) return undefined;

  // Split the path into parts
  const parts = name?.split('.');

  // Navigate through the errors object
  let current = errors;
  for (const part of parts) {
    if (!current?.[part]) return undefined;
    current = current?.[part];
  }

  return current?.message;
};

// Utility to extract YouTube video ID
export const getYouTubeVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^\s&?]+)/;
  const match = url?.match(regex);
  return match ? match[1].split(/[&?]/)[0] : null;
};

export const formatYAxis = (tick) => {
  if (tick >= 1000000) return `${tick / 1000000}M`;
  if (tick >= 1000) return `${tick / 1000}k`;
  return tick;
};

export const formatTooltip = (value, data, chartLabel) => {
  const maxValue = Math.max(...data.map((d) => d.value || 0));
  const percent = maxValue ? ((value / maxValue) * 100).toFixed(1) : 0;
  return [`${percent}%`, chartLabel];
};

export const socialMediaLogos = [
  {
    type: 'Website',
    logo: 'https://img.icons8.com/doodle/48/domain.png',
  },
  {
    type: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png',
  },
  {
    type: 'Instagram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png',
  },
  {
    type: 'X (formerly Twitter)',
    logo: 'https://img.icons8.com/ios-glyphs/30/twitterx--v1.png',
  },
  {
    type: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
  },
  {
    type: 'Snapchat',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1200px-Snapchat_logo.svg.png',
  },
  {
    type: 'TikTok',
    logo: 'https://img.icons8.com/ios-filled/50/tiktok--v1.png',
  },
  {
    type: 'Pinterest',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/768px-Pinterest-logo.png',
  },
  {
    type: 'Reddit',
    logo: 'https://img.icons8.com/ios-glyphs/30/reddit--v1.png',
  },
  {
    type: 'YouTube',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/1024px-YouTube_full-color_icon_%282017%29.svg.png',
  },
  {
    type: 'WhatsApp',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png',
  },
  {
    type: 'Telegram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1024px-Telegram_logo.svg.png',
  },
  { type: 'Discord', logo: 'https://img.icons8.com/color/48/discord-logo.png' },
  { type: 'Tumblr', logo: 'https://img.icons8.com/color/48/tumblr.png' },
  { type: 'WeChat', logo: 'https://img.icons8.com/fluency/48/weixing.png' },
  { type: 'Viber', logo: 'https://img.icons8.com/fluency/48/viber.png' },
  {
    type: 'Line',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/1024px-LINE_logo.svg.png',
  },
  {
    type: 'Twitch',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twitch_logo.svg/1024px-Twitch_logo.svg.png',
  },
  { type: 'Threads', logo: 'https://img.icons8.com/ios-filled/50/threads.png' },
  {
    type: 'Mastodon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Mastodon_Logotype_%28Simple%29.svg/1024px-Mastodon_Logotype_%28Simple%29.svg.png',
  }, //PNG
  {
    type: 'Medium',
    logo: 'https://img.icons8.com/ios-filled/50/medium-logo.png',
  },
  { type: 'Quora', logo: 'https://img.icons8.com/color/48/quora.png' },
  {
    type: 'Signal',
    logo: 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/50/external-signal-the-most-scalable-encryption-tool-layout-logo-bold-tal-revivo.png',
  },
];

export const getCurrentYear = () => new Date().getFullYear();
