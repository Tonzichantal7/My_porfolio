document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm') || document.querySelector('form[action="#"][method="post"]');
    const msgEl = document.getElementById('formMessage');
    const sendBtn = document.getElementById('contactSendBtn');
    if (!form) return;

    function showMessage(text, type = 'success') {
        if (!msgEl) {
            alert(text);
            return;
        }
        msgEl.textContent = text;
        msgEl.classList.remove('success', 'error', 'visible');
        msgEl.classList.add(type, 'visible');
        // remove visible after 5s
        setTimeout(() => msgEl.classList.remove('visible'), 5000);
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (form.querySelector('#name') || {}).value || '';
        const email = (form.querySelector('#email') || {}).value || '';
        const subject = (form.querySelector('#subject') || {}).value || '';
        const message = (form.querySelector('#message') || {}).value || '';

        if (!name.trim() || !email.trim() || !message.trim()) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // simulate sending
        if (sendBtn) {
            sendBtn.disabled = true;
            const prev = sendBtn.textContent;
            sendBtn.textContent = 'Sending...';
            setTimeout(() => {
                sendBtn.disabled = false;
                sendBtn.textContent = prev;
                form.reset();
                showMessage('Message sent successfully.', 'success');
            }, 800);
        } else {
            form.reset();
            showMessage('Message sent successfully.', 'success');
        }
    });
});
