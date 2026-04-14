/**
 * Partnership Inquiry Form Handler
 * Integrated with Formspree
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('partnership-form');
  const statusMessage = document.getElementById('status-message');
  const statusText = document.getElementById('status-text');
  const submitBtn = document.getElementById('submit-btn');

  /**
   * Show feedback message to the user
   * @param {string} message - The message to display
   * @param {boolean} isSuccess - Whether the operation was successful
   */
  const showStatus = (message, isSuccess) => {
    statusText.textContent = message;
    statusMessage.classList.remove('hidden', 'success', 'error');
    statusMessage.classList.add(isSuccess ? 'success' : 'error');
    statusMessage.style.display = 'block';
    statusMessage.style.opacity = '1';

    // Auto-hide success message after 5 seconds
    if (isSuccess) {
      setTimeout(() => {
        statusMessage.style.opacity = '0';
        setTimeout(() => {
          statusMessage.classList.add('hidden');
          statusMessage.style.display = 'none';
        }, 300);
      }, 5000);
    }
  };

  /**
   * Handle form submission
   */
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Disable submit button during processing
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = '보내는 중...';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showStatus('제휴 문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!', true);
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          showStatus(data['errors'].map(error => error['message']).join(', '), false);
        } else {
          showStatus('문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', false);
        }
      }
    } catch (error) {
      showStatus('네트워크 오류가 발생했습니다. 연결 상태를 확인해 주세요.', false);
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});
