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