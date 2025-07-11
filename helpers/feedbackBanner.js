/**
 * Helper function called that Nunjucks can use to determine whether to display a feedback banner.
 * @returns {*|boolean}
 */
const displayFeedbackBanner = () => {
  const startDate = new Date(process.env.FEEDBACK_START);
  const endDate = new Date(process.env.FEEDBACK_END);
  const currentDate = new Date();
  return process.env.FEEDBACK_CONTENT_HTML && currentDate >= startDate && currentDate <= endDate;
};

module.exports = displayFeedbackBanner;
