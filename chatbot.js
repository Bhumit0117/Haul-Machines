/**
 * Chatbot Logic
 * Handles user interaction and provides answers from a knowledge base.
 */
document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbot = document.querySelector('.chatbot');
  const closeBtn = document.querySelector('.chatbot-header .close-btn');
  const backBtn = document.querySelector('.chatbot-header .back-btn'); // Select Back Button
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSendBtn = document.getElementById('chatbotSendBtn');
  const chatbotBody = document.querySelector('.chatbot-body');
  const quickOptionsDiv = document.querySelector('.quick-options');

  let chatState = null;

  // Toggle Chat Window
  chatbotToggle.addEventListener('click', () => {
    chatbot.classList.toggle('show');
    if (chatbot.classList.contains('show')) {
      chatbotInput.focus();
      // Render quick options when chatbot is opened
      renderQuickOptions(); 
    } else {
      quickOptionsDiv.innerHTML = ''; // Clear options when chatbot is closed
    }
  });

  closeBtn.addEventListener('click', () => chatbot.classList.remove('show'));

  // Knowledge Base: Add your questions and answers here
  const qaPairs = [
    {
      keywords: ['help', 'support', 'assistance', 'about'],
      answer: "I can help with questions about our products, services, pricing, and contact information. What do you need help with?"
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'hy'],
      answer: 'Hello there! How can I assist you with our machines today?'
    },
    {
      keywords: ['buy', 'product', 'products', 'machine', 'machines', 'forklift', 'tractor', 'loader', 'oil'],
      answer: 'We have a wide range of powerful electric forklifts, farming tractors, and industrial loaders. You can see them in our <a href="#products">Products section</a>.'
    },
    {
      keywords: ['oil change', 'service', 'services', 'repair', 'maintenance', 'install', 'installation'],
      answer: 'We offer on-site installation, 24/7 support, oil changes, and leasing options. Check out the <a href="#services">Services section</a> for more details.'
    },
    {
      keywords: ['contact', 'phone', 'email', 'call', 'reach', 'connect'],
      answer: 'You can contact us using the form in the <a href="#contact">Contact section</a>. We will get back to you shortly!'
    },
    {
      keywords: ['delivery', 'shipping', 'location', 'where', 'deliver'],
      answer: 'We deliver to most industrial and farming locations across India. You can find more info in our <a href="#faq">FAQ section</a>.'
    },
    {
      keywords: ['delivery & installation', 'delivery and installation'],
      answer: 'Delivery across India in about 7–10 working days for in‑stock machines, with on‑site installation and operator training available.'
    },
    {
      keywords: ['price', 'cost', 'quote', 'money', 'pricing'],
      answer: 'Our prices are competitive. Please check the products grid for specific pricing or contact us for a bulk quote.'
    },
    {
      keywords: ['warranty', 'guarantee'],
      answer: 'All our machines come with a standard 1-year manufacturer warranty. Extended warranty plans are also available.'
    },
    {
      keywords: ['hours', 'open', 'time', 'timing', 'timings'],
      answer: 'Our support team is available 24/7. Our physical offices are open Mon-Sat, 9 AM to 6 PM.'
    },
    {
      keywords: ['bye', 'goodbye', 'thank', 'thanks', 'ok'],
      answer: "You're welcome! Have a great day."
    }
  ];

  // New: Define quick options for the chatbot
  const quickOptions = [
    { text: 'Products', query: 'products' },
    { text: 'Services', query: 'services' },
    { text: 'Contact', query: 'contact' },
    { text: 'Help', query: 'help' },
    { text: 'Suggest a machine', query: 'Suggest a machine' },
    { text: 'Delivery & installation', query: 'Delivery & installation' },
    { text: 'Know oil difference', query: 'Know oil difference' },
    { text: 'Compare two oils', query: 'Compare two oils' }
  ];

  const handleChat = (userInputText) => { // Modified: accepts userInputText as argument
    const userInput = userInputText || chatbotInput.value.trim(); // Use argument or input field
    if (!userInput) return;

    appendMessage(userInput, 'user-message');
    chatbotInput.value = '';
    quickOptionsDiv.innerHTML = ''; // Clear quick options after user input

    // Show Back button when user navigates away from main menu
    if (backBtn) backBtn.style.display = 'block';

    // A short delay to simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      appendMessage(botResponse, 'bot-message');
      appendBackButton();
    }, 250); // Reduced delay for faster response
  };

  const appendBackButton = () => {
    const div = document.createElement('div');
    div.style.textAlign = 'left';
    div.style.margin = '5px 0 10px 5px';
    const btn = document.createElement('button');
    btn.textContent = 'Back to Menu';
    btn.classList.add('quick-option-button');
    btn.style.fontSize = '0.75rem';
    btn.style.padding = '5px 10px';
    btn.addEventListener('click', () => {
      renderQuickOptions();
      chatbotBody.scrollTop = 0;
      div.remove();
    });
    div.appendChild(btn);
    chatbotBody.appendChild(div);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  };

  const appendMessage = (text, className) => {
    const messageElem = document.createElement('div');
    messageElem.classList.add('message', className);
    messageElem.innerHTML = `<p>${text}</p>`;
    chatbotBody.appendChild(messageElem);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  };

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let bestMatch = { score: 0, answer: null };

    // Handle state for machine suggestion
    if (chatState === 'awaiting_machine_usage') {
      if (lowerInput.includes('warehouse')) {
        chatState = null;
        return "Here are suitable machines for warehouse use:<br>• <b>Haul Electric Forklift 3.5T</b> (₹14.5L) – Electric, eco-friendly.<br>• <b>Compact Electric Pallet Truck</b> (₹3.2L) – Great for tight spaces.<br>• <b>High-Lift Order Picker</b> (₹9.8L) – For high-rack storage.";
      } else if (lowerInput.includes('farming') || lowerInput.includes('farm')) {
        chatState = null;
        return "Here are suitable machines for farming:<br>• <b>Smart Electric Tractor 50 HP</b> (₹11L) – Efficient & powerful.<br>• <b>Rotavator Attachment 7 ft</b> (₹1.75L) – Essential for soil preparation.";
      } else if (lowerInput.includes('construction')) {
        chatState = null;
        return "Here are suitable machines for construction:<br>• <b>Rough‑Terrain Diesel Forklift 5T</b> (₹18.5L) – Heavy duty.<br>• <b>4x4 Telehandler 12m Boom</b> (₹26L) – High reach.<br>• <b>Hydraulic Loader Backhoe</b> (₹22L) – Versatile digging.";
      } else {
        return "What do you need the machine for – warehouse, farming, or construction?";
      }
    }

    if (lowerInput.includes('suggest a machine') || lowerInput.includes('suggest machine')) {
      chatState = 'awaiting_machine_usage';
      return "What do you need the machine for – warehouse, farming, or construction?";
    }

    // Find the best matching answer by scoring keywords
    for (const pair of qaPairs) {
      let currentScore = 0;
      for (const keyword of pair.keywords) {
        if (lowerInput.includes(keyword)) {
          // Longer keywords are more specific and get a higher score
          currentScore += keyword.length;
        }
      }

      if (currentScore > bestMatch.score) {
        bestMatch = { score: currentScore, answer: pair.answer };
      }
    }

    if (bestMatch.score > 0) {
      return bestMatch.answer;
    }
    
    // Provide a more helpful response for questions
    if (/\?/.test(input) || /what|who|where|when|why|how|do you|can you/.test(lowerInput)) {
        return "I can't answer that specific question, but I can help with topics like products, services, pricing, or delivery. What would you like to know?";
    }

    // Default response if no keywords match
    return "I'm sorry, I didn't quite understand that. You can ask me about products, services, pricing, or contact information.";
  };

  // New: Function to render quick options
  const renderQuickOptions = () => {
    quickOptionsDiv.innerHTML = ''; // Clear existing options
    // Hide Back button when on main menu
    if (backBtn) backBtn.style.display = 'none';

    quickOptions.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('quick-option-button');
      button.textContent = option.text;
      button.addEventListener('click', () => handleChat(option.query));
      quickOptionsDiv.appendChild(button);
    });
  };

  // Back button functionality
  if (backBtn) {
    backBtn.addEventListener('click', renderQuickOptions);
  }

  chatbotSendBtn.addEventListener('click', () => handleChat()); // Call handleChat without argument for send button
  chatbotInput.addEventListener('keypress', (e) => e.key === 'Enter' && handleChat()); // Call handleChat without argument for enter key
});