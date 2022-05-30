export interface ServerToClientEvents {
  pong: (a: string) => void
  pongAll: (a: string) => void
  
  newMessage: (message: string, userId: string, datetime: Date) => void

  userJoined: (userId: string) => void
  rooms: (rooms: string[]) => void

  setField: (coordinateX: number, coordinateY: number, color: string, userId: string) => void
  nextFieldChangePossible: (datetime: Date) => void
}
  
export interface ClientToServerEvents {
  ping: () => void

  newMessage: (message: string, room: string) => void
  joinRoom: (room: string) => void
  getRooms: () => void

  changeField: (coordinateX: number, coordinateY: number, color: string ) => void
}
  
export interface InterServerEvents {
  ping: () => void;
}
  
export interface SocketData {
  name: string;
  age: number;
}