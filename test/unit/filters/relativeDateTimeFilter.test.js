const relativeDateTimeFilter = require('../../../filters/relativeDateTimeFilter');

describe('relativeDateTimeFilter', () => {
    it('should return "-" when date is non existent', () => {
        const result = relativeDateTimeFilter(null);

        expect(result).toEqual("-");
    });

    it('should return "-" when date is after current date', () => {
        const lastActiveDate = new Date();
        lastActiveDate.setDate(lastActiveDate.getDate() + 1);

        const result = relativeDateTimeFilter(lastActiveDate);

        expect(result).toEqual("-");
    });

    it('should return "< 1 day ago" when provided date is less than 24 hours ago', () => {
        const lastActiveDate = new Date();

        const result = relativeDateTimeFilter(lastActiveDate);

        expect(result).toEqual("< 1 day ago");
    });

    it('should return "1 day ago" when provided date is between 24 and 48 hours ago', () => {
        const lastActiveDate = new Date();
        lastActiveDate.setDate(lastActiveDate.getDate() - 1);

        const result = relativeDateTimeFilter(lastActiveDate);

        expect(result).toEqual("1 day ago");
    });
    
    it('should return "x days ago" when provided date is greater than 48 hours ago', () => {
        const lastActiveDate = new Date();
        lastActiveDate.setDate(lastActiveDate.getDate() - 2);

        const result = relativeDateTimeFilter(lastActiveDate);

        expect(result).toEqual("2 days ago");
    });

    it('should return "Invalid Date" when provided with invalid date', () => {
        const result = relativeDateTimeFilter("10 April 2025, 10:30am");

        expect(result).toEqual("Invalid Date");
    })
});