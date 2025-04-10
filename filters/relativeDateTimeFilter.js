const relativeDateTime = (lastActive) => {
  const now = new Date();
  const lastActiveDate = new Date(lastActive);

  if (!lastActive || lastActive > now) return '-';
  if (isNaN(lastActiveDate.getTime())) return 'Invalid Date';

  const timeDiff = now - lastActiveDate;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else {
    return '< 1 day ago';
  }
};

module.exports = relativeDateTime;