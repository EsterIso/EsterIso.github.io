
emailjs.init('mWoB3VR6hPLXgObZq');

const form = document.getElementById('contact-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await emailjs.sendForm(
            'service_gb97uwk',      
            'template_q70j4yx',     
            form
        );

        console.log('Email sent successfully:', response);
        alert('Message sent successfully!');
        form.reset();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send message. Please try again.');
    }
});
