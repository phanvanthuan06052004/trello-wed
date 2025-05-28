import { io } from 'socket.io-client'
import { API_HOST } from './utils/Constants'
export const socketIoInstance = io(API_HOST)
