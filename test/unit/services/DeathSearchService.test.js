'use strict';

const DeathSearchService = require('../../../services/DeathSearchService');

describe('DeathSearchService tests', () => {
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
        const received = DeathSearchService.processRecord(record);

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
        const received = DeathSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toEqual(true);
      });
    });
    describe('corrected flag should be true', () => {
      it('if record correction is not "None"', () => {

        // Arrange
        const record = {
          status: {
            correction: 'Corrected'
          }
        };

        // Act
        const received = DeathSearchService.processRecord(record);

        // Assert
        expect(received.flags.corrected).toEqual(true);
      });
    });
  });
});
