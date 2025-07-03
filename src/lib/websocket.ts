import "client-only";

export const ws = new WebSocket(process.env.NEXT_PUBLIC_ENDPOINT_URL_WS+'/ws/v1/chat');