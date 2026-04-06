function addChatMessage(msg){
    const chat = document.getElementById('chat');
    const p = document.createElement('p');
    p.textContent = msg;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
}
