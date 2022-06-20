'use strict';

const PartnershipSearchService = require('../../../services/PartnershipSearchService');

describe('PartnershipSearchService tests', () => {
  describe('processRecord()', () => {
    describe('refer flag should be true', () => {
      it('if record is blocked', () => {

        // Arrange
        const record = {
          status: {
            blocked: true
          }
        };

        // Act
        const received = PartnershipSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toEqual(true);
      });

      it('if record marginal note is not "None"', () => {

        // Arrange
        const record = {
          status: {
            marginalNote: 'Marginal'
          }
        };

        // Act
        const received = PartnershipSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toEqual(true);
      });
    });
  });
});
