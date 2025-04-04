// Background processing for chatbot
self.onmessage = function(e) {
    if (e.data.type === 'process') {
        // Process the message in the background
        const response = processMessage(e.data.message);
        
        // Send notification back to main thread
        self.postMessage({
            type: 'notification',
            message: 'New message processed'
        });
        
        // Send response back to main thread
        self.postMessage({
            type: 'response',
            message: response
        });
    }
};

function processMessage(message) {
    // Simulate processing time
    const processingTime = Math.random() * 1000;
    
    // Process message in background
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = generateResponse(message);
            resolve(response);
        }, processingTime);
    });
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';
    
    if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
        response = {
            text: "I can help you search land records. Would you like to:",
            options: [
                "Search by survey number",
                "Search by owner name",
                "View recent searches"
            ]
        };
    }
    else if (lowerMessage.includes('survey') || lowerMessage.includes('measure')) {
        response = {
            text: "Let me help you with land surveying. You can:",
            options: [
                "Start new survey",
                "View 3D visualization",
                "Calculate area"
            ]
        };
    }
    else {
        response = {
            text: "I'm here to help! What would you like to know about?",
            options: [
                "Land records",
                "Surveys",
                "Contact support"
            ]
        };
    }
    
    return response;
}
