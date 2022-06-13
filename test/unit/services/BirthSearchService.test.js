'use strict';

const BirthSearchService = require('../../../services/BirthSearchService');

describe('BirthSearchService tests', () => {
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
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toBe(true);
      });

      it('if record cancelled', () => {

        // Arrange
        const record = {
          status: {
            cancelled: true
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toBe(true);
      });

      it('if record potentially fictitious', () => {

        // Arrange
        const record = {
          status: {
            potentiallyFictitious: true
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toBe(true);
      });

      it('if record is a reregistration', () => {

        // Arrange
        const record = {
          status: {
            reregistration: 'Re-registered'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toBe(true);
      });

      it('if record has a marginal note', () => {

        // Arrange
        const record = {
          status: {
            marginalNote: 'Marginal'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.refer).toBe(true);
      });
    });

    describe('fatherAdded flag should be true', () => {
      it('if record reregistration is "Father added"', () => {

        // Arrange
        const record = {
          status: {
            reregistration: 'Father added'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.fatherAdded).toBe(true);
      });
    });

    describe('subsequentlyMarried flag should be true', () => {
      it('if reregistration status is "Subsequently married"', () => {

        // Arrange
        const record = {
          status: {
            reregistration: 'Subsequently married'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.subsequentlyMarried).toBe(true);
      });
    });

    describe('fatherModified flag should be true', () => {
      it('if reregistration status is "Father modified"', () => {

        // Arrange
        const record = {
          status: {
            reregistration: 'Father modified'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.fatherModified).toBe(true);
      });
    });

    describe('replaced flag should be true', () => {
      it('if reregistration status is "Replacement registration"', () => {

        // Arrange
        const record = {
          status: {
            reregistration: 'Replacement registration'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.replaced).toBe(true);
      });
    });

    describe('corrected flag should be true', () => {
      it('if correction status is not "None"', () => {

        // Arrange
        const record = {
          status: {
            correction: 'Corrected'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.corrected).toBe(true);
      });
    });

    describe('courtOrderInPlace flag should be true', () => {
      it('if marginalNote status is "Court order in place"', () => {

        // Arrange
        const record = {
          status: {
            marginalNote: 'Court order in place'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.courtOrderInPlace).toBe(true);
      });
    });

    describe('courtOrderRevoked flag should be true', () => {
      it('if marginalNote status is "Court order revoked"', () => {

        // Arrange
        const record = {
          status: {
            marginalNote: 'Court order revoked'
          }
        };

        // Act
        const received = BirthSearchService.processRecord(record);

        // Assert
        expect(received.flags.courtOrderRevoked).toBe(true);
      });
    });
  });
});
