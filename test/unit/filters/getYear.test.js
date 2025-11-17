const getYear = require('../../../filters/getYear');

describe('getYear Filter', () => {
    const RealDate = Date;

    const mockDate = (isoDate) => {
        global.Date = class extends RealDate {
            constructor() {
                super();
                return new RealDate(isoDate);
            }
        };
    }

    afterEach(() => {
        global.Date = RealDate;
    });

    test.each([
        ['2024-07-01T00:00:00Z', 2024],
        ['2025-01-01T00:00:00Z', 2025],
        ['2026-12-31T23:59:59Z', 2026],
        ['2036-12-31T23:59:59Z', 2036],
        ['2076-12-31T23:59:59Z', 2076],
    ])('returns %i for %s', (isoDate, expectedYear) => {
        mockDate(isoDate);
        expect(getYear()).toBe(expectedYear);
    });
});