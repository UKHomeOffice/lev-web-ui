const displayFeedbackBanner = require('../../../helpers/feedbackBanner');

describe('displayFeedbackBanner()', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    jest.useFakeTimers();
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.useRealTimers();
  });

  it('returns true when FEEDBACK_CONTENT_HTML is set and current date is within range', () => {
    process.env.FEEDBACK_CONTENT_HTML = '<p>Feedback</p>';
    process.env.FEEDBACK_START = '2025-07-01 00:00:00';
    process.env.FEEDBACK_END = '2025-07-31 23:59:59';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(true);
  });

  it('returns false when FEEDBACK_CONTENT_HTML is set but current date is before range', () => {
    process.env.FEEDBACK_CONTENT_HTML = '<p>Feedback</p>';
    process.env.FEEDBACK_START = '2025-07-12 00:00:00';
    process.env.FEEDBACK_END = '2025-07-31 23:59:59';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(false);
  });

  it('returns false when FEEDBACK_CONTENT_HTML is set but current date is after range', () => {
    process.env.FEEDBACK_CONTENT_HTML = '<p>Feedback</p>';
    process.env.FEEDBACK_START = '2025-07-01 00:00:00';
    process.env.FEEDBACK_END = '2025-07-10 23:59:59';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(false);
  });

  it('returns false when FEEDBACK_CONTENT_HTML is not set', () => {
    process.env.FEEDBACK_CONTENT_HTML = '';
    process.env.FEEDBACK_START = '2025-07-01 00:00:00';
    process.env.FEEDBACK_END = '2025-07-31 23:59:59';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(false);
  });

  it('returns false when FEEDBACK_START is invalid', () => {
    process.env.FEEDBACK_CONTENT_HTML = '<p>Feedback</p>';
    process.env.FEEDBACK_START = 'invalid-date';
    process.env.FEEDBACK_END = '2025-07-31 23:59:59';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(false);
  });

  it('returns false when FEEDBACK_END is invalid', () => {
    process.env.FEEDBACK_CONTENT_HTML = '<p>Feedback</p>';
    process.env.FEEDBACK_START = '2025-07-01 00:00:00';
    process.env.FEEDBACK_END = 'invalid-date';
    jest.setSystemTime(new Date('2025-07-11 12:00:00'));
    expect(displayFeedbackBanner()).toBe(false);
  });
});
