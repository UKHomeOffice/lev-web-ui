module.exports.formatLastActive = (users) => {
    const now = new Date();
  
    for (const user of users) {
      if (user.lastActive == null) {
        user.relativeLastActive = '-';
      } else {
        const lastActiveDate = new Date(user.lastActive);
        const timeDiff = now - lastActiveDate;
  
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
  
        if (days >= 1) {
          user.relativeLastActive = days === 1 ? '1 day ago' : `${days} days ago`;
        } else {
          user.relativeLastActive = '< 1 day ago';
        }
      }
    }

    return users;
};

module.exports.formatLastActiveFullDate = (user) => {
    const dateString = user.lastActive;

    if (!dateString) return '-';
    const date = new Date(dateString);
    const day = date.getDate();
    const ordinal = getOrdinal(day);
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;

    return `${day}${ordinal} ${month} ${year}, ${hours}:${minutes}${ampm}`;
};

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const getOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: 
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
}