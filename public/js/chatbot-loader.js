document.addEventListener('DOMContentLoaded', function() {
    // Create a Web Worker for background processing
    const worker = new Worker('/js/chatbot-worker.js');
    
    // Create an iframe for the chatbot
    const iframe = document.createElement('iframe');
    iframe.src = '/chatbot.html';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '400px';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '1000';
    iframe.style.display = 'none';
    
    // Add the iframe to the page
    document.body.appendChild(iframe);
    
    // Create a button to toggle the chatbot
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-comments"></i>';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.width = '60px';
    button.style.height = '60px';
    button.style.borderRadius = '50%';
    button.style.background = '#e74c3c';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    button.style.transition = 'all 0.3s ease';
    button.style.zIndex = '1001';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.fontSize = '24px';
    
    // Add notification indicator
    const notificationDot = document.createElement('div');
    notificationDot.style.position = 'absolute';
    notificationDot.style.top = '0';
    notificationDot.style.right = '0';
    notificationDot.style.width = '12px';
    notificationDot.style.height = '12px';
    notificationDot.style.background = '#f1c40f';
    notificationDot.style.borderRadius = '50%';
    notificationDot.style.display = 'none';
    button.appendChild(notificationDot);
    
    // Add hover effect
    button.onmouseover = () => {
        button.style.transform = 'scale(1.1)';
        button.style.background = '#c0392b';
    };
    button.onmouseout = () => {
        button.style.transform = 'scale(1)';
        button.style.background = '#e74c3c';
    };
    
    // Toggle chatbot visibility
    let isVisible = false;
    button.onclick = () => {
        isVisible = !isVisible;
        iframe.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            iframe.style.animation = 'slideUp 0.3s ease-out';
            notificationDot.style.display = 'none';
        }
    };
    
    // Handle background processing
    worker.onmessage = function(e) {
        if (e.data.type === 'notification') {
            if (!isVisible) {
                notificationDot.style.display = 'block';
            }
        }
    };
    
    // Add the button to the page
    document.body.appendChild(button);
});
