describe('createTimeoutController', () => {
  let createTimeoutController;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(0);

    global.window = {};
    global.document = { addEventListener: jest.fn() };

    require('../../../public/javascripts/timeout.js');

    createTimeoutController = global.window.Timeout.createTimeoutController;
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetModules();
  });

  function advance(ms) {
    jest.setSystemTime(Date.now() + ms);
  }

  test('does not trigger warning before threshold', () => {
    const onWarning = jest.fn();
    const onTimeout = jest.fn();

    const controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(15000);
    controller.tick();

    expect(onWarning).not.toHaveBeenCalled();
    expect(onTimeout).not.toHaveBeenCalled();
  });

  test('triggers warning once threshold is reached', () => {
    const onWarning = jest.fn();
    const onTimeout = jest.fn();

    const controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(21000);
    controller.tick();

    expect(onWarning).toHaveBeenCalledWith(10);
    expect(onTimeout).not.toHaveBeenCalled();
  });

  test('counts down warning each tick', () => {
    const onWarning = jest.fn();
    const onTimeout = jest.fn();

    const controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(21000);

    controller.tick();
    controller.tick();
    controller.tick();

    expect(onWarning.mock.calls).toEqual([
      [10],
      [9],
      [8]
    ]);
  });

  test('fires timeout when exceeded', () => {
    const onWarning = jest.fn();
    const onTimeout = jest.fn();

    const controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(31000);
    controller.tick();

    expect(onTimeout).toHaveBeenCalledTimes(1);
  });

  test('reload resets countdown + idle time', () => {
    const onWarning = jest.fn();
    const onTimeout = jest.fn();

    let controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(25000);
    controller.tick();

    expect(onWarning).toHaveBeenCalledWith(10);

    // simulate reload of page after button pressed
    controller = createTimeoutController({
      timeout: 30000,
      warningDuration: 10000,
      onWarning,
      onTimeout
    });

    advance(5000);
    controller.tick();

    expect(onWarning).toHaveBeenCalledTimes(1);
    expect(onTimeout).not.toHaveBeenCalled();
  });
});