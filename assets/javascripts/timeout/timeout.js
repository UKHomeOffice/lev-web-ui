(function (window) {
  function createTimeoutController({ timeout, warningDuration, onWarning, onTimeout }) {
    let idleTime = Date.now();
    let countdown = warningDuration / 1000;

    function tick() {
      const now = Date.now();
      const elapsed = now - idleTime;

      if (elapsed > timeout - warningDuration) {
        onWarning(countdown);
        countdown--;
      }

      if (elapsed > timeout) {
        onTimeout();
      }
    }

    return { tick };
  }

  window.Timeout = { createTimeoutController };

  document.addEventListener('DOMContentLoaded', () => {
    // timeout set at 30 mins
    const timeout = 30 * 60 * 1000;
    // warning set at 2 mins before timeout
    const warningDuration = 2 * 60 * 1000;

    const controller = createTimeoutController({
      timeout,
      warningDuration,
      onWarning: showTimeoutModal,
      onTimeout: () => {
        hideTimeoutModal();
        showRedirectModal();
        window.location = '/logout?sessionTimeout=true';
      }
    });

    hideTimeoutModal();
    hideRedirectModal();

    setInterval(() => controller.tick(), 1000);
  });

  function showTimeoutModal(secondsRemaining) {
    const modal = document.getElementById('modal-container');
    if (!modal) return;

    modal.style.display = 'flex';

    const label = document.getElementById('timeout-countdown-label');
    if (!label) return;

    label.textContent =
      secondsRemaining <= 60
        ? `${secondsRemaining} seconds.`
        : '2 minutes.';

    document.getElementById('staySignedInBtn').onclick = function () {
      window.location.reload();
    };
  }

  function hideTimeoutModal() {
    const modal = document.getElementById('modal-container');
    if (modal) modal.style.display = 'none';
  }

  function showRedirectModal() {
    const modal = document.getElementById('redirect-modal-container');
    if (modal) modal.style.display = 'flex';
  }

  function hideRedirectModal() {
    const modal = document.getElementById('redirect-modal-container');
    if (modal) modal.style.display = 'none';
  }
})(window);
