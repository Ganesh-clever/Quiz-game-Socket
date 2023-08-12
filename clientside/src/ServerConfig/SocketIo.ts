import { io } from 'socket.io-client';

export const SocketConn = io('http://localhost:3001');