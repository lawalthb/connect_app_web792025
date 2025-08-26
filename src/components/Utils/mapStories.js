// utils/mapStories.ts
export const mapStories = (storiesFromApi) => {
  const groupedStories = {};

  storiesFromApi.forEach((s) => {
    const userId = s.user.id;

    if (!groupedStories[userId]) {
      groupedStories[userId] = {
        id: userId,
        user: {
          id: s.user.id,
          name: s.user.name,
          avatar: s.user.profile_image || '/default-avatar.png',
          isOwn: false, // set to true if it's the logged-in user
        },
        stories: [],
      };
    }

    groupedStories[userId].stories.push({
      id: s.id,
      type: s.type, // "video" | "image"
      url: s.file_url,
      duration: s.type === 'video' ? 15000 : 5000, // give default duration
      timestamp: new Date(s.created_at),
      views: s.views_count || 0,
    });
  });

  return Object.values(groupedStories);
};
