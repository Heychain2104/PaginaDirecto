import asyncio
import websockets
import pytchat

# 🔥 PON AQUÍ TU ID DE DIRECTO
VIDEO_ID = "wFfFJMOuhyQ"

# Crear conexión al chat de YouTube
chat = pytchat.create(video_id=VIDEO_ID)

# Lista de clientes conectados (tu web)
clients = set()

async def handler(websocket):
    print("Cliente conectado")
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)
        print("Cliente desconectado")

async def send_chat():
    while chat.is_alive():
        data = chat.get()
        for c in data.sync_items():
            message = f"{c.author.name}:{c.message}"
            print(message)

            # Enviar mensaje a todos los clientes conectados
            if clients:
                await asyncio.gather(*[client.send(message) for client in clients])

        await asyncio.sleep(0.1)

async def main():
    server = await websockets.serve(handler, "localhost", 6789)
    print("Servidor iniciado en ws://localhost:6789")

    await asyncio.gather(
        server.wait_closed(),
        send_chat()
    )

asyncio.run(main())
