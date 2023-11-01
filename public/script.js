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

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = `${msg.user}: ${msg.text}`;
  messages.appendChild(li);
});

socket.on('disconnect', () => {
  statusHeading.innerHTML = 'A user is disconnected';
});

socket.on('reconnect', () => {
  statusHeading.innerHTML = 'Chat Room';
});
