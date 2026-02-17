const logger = require("../../logger").get();

describe('logger', () => {
  it('should have new fields in the config', () => {
    expect(logger._manager._options.meta.orgId).toEqual('userDetails.orgId');
    expect(logger._manager._options.meta.orgName).toEqual('userDetails.orgName');
    expect(logger._manager._options.meta.teamId).toEqual('userDetails.teamId');
    expect(logger._manager._options.meta.teamName).toEqual('userDetails.teamName');
    expect(logger._manager._options.meta.username).toEqual('userDetails.username');
  });
});