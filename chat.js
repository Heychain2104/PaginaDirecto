// 🔌 CAMBIA ESTA URL POR LA TUYA DE RENDER
const socket = new WebSocket("https://paginadirecto-1.onrender.com");

// 📡 Conexión
socket.onopen = () => {
    console.log("✅ Conectado al servidor");
};

// ❌ Error
socket.onerror = (error) => {
    console.log("❌ Error WebSocket:", error);
};

// 🔌 Desconexión
socket.onclose = () => {
    console.log("🔌 Conexión cerrada");
};

// 💬 Recibir mensajes del servidor
socket.onmessage = (event) => {
    const data = event.data;

    // Separar usuario y mensaje
    const parts = data.split(":");
    const user = parts[0] || "Anon";
    const msg = parts.slice(1).join(":") || "";

    addChatMessage(user, msg);

    // Detectar acción automáticamente
    checkActionFromChat(msg);
};

// 🧾 Mostrar mensaje en el chat
function addChatMessage(user, msg){
    const chat = document.getElementById('chat');

    const p = document.createElement('p');
    p.innerHTML = `<strong>${user}:</strong> ${msg}`;

    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
}

// 🎮 Detectar acciones desde el chat
function checkActionFromChat(msg){
    const action = msg.trim().toLowerCase();

    if(action === "shake"){
        sendAction("Shake");
    }
    else if(action === "tnt"){
        sendAction("TNT");
    }
    else if(action === "confeti"){
        sendAction("Confeti");
    }
}
