import asyncio
import websockets
import pytchat
import os

VIDEO_ID = "wFfFJMOuhyQ"

chat = pytchat.create(video_id=VIDEO_ID)
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

            if clients:
                await asyncio.gather(*[client.send(message) for client in clients])

        await asyncio.sleep(0.1)

async def main():
    PORT = int(os.environ.get("PORT", 10000))
    server = await websockets.serve(handler, "0.0.0.0", PORT)
    print(f"Servidor en puerto {PORT}")

    await asyncio.gather(
        server.wait_closed(),
        send_chat()
    )

asyncio.run(main())
