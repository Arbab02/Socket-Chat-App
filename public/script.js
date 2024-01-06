const socket = io();
let userName;

// Function to prompt for a username
function getUserName() {
  userName = prompt('Please enter your name:');
  if (!userName || userName.trim() === '') {
    userName = 'Guest'; // Set a default name if the user enters nothing
  }
}

getUserName();

const messages = document.getElementById('messages');
const input = document.getElementById('message-input');
const button = document.getElementById('send');
const statusHeading = document.getElementById('status-heading');

button.addEventListener('click', () => {
  const message = input.value;
  if (message.trim() !== '') {
    socket.emit('chat message', { user: userName, text: message });
    input.value = '';
  }
});

// Event to receive message history from the server
socket.on('message history', (history) => {
  history.forEach((msg) => {
    displayMessage(msg);
  });
});

socket.on('chat message', (msg) => {
  displayMessage(msg);
});

socket.on('disconnect', () => {
  statusHeading.innerHTML = 'A user is disconnected';
});

socket.on('reconnect', () => {
  statusHeading.innerHTML = 'Chat Room';
});

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  searchMessages(searchTerm);
});

function searchMessages(query) {
  const allMessages = document.querySelectorAll('#messages a');
  allMessages.forEach((message) => {
    const messageText = message.textContent.toLowerCase();
    if (messageText.includes(query.toLowerCase())) {
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  });
}

// Function to display a message
function displayMessage(msg) {
  const a = document.createElement('a');
  a.setAttribute('href', `${msg.text}`);
  a.style.display = 'block';
  a.style.textDecoration = 'none';
  a.style.color = 'white';
  a.textContent = `${msg.user}: ${msg.text}`;
  messages.appendChild(a);
}
