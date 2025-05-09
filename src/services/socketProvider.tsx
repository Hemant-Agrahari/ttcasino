import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketEvents = {
  currentBalance: any;
  maintenanceMode: any;
  playerConnect: any;
  forceLogout: any;
};

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emitEvent: <K extends keyof SocketEvents>(
    event: K,
    data: SocketEvents[K],
  ) => void;
  listenEvent: <K extends keyof SocketEvents>(
    event: K,
    callback: (data: SocketEvents[K]) => void,
  ) => void;
  removeListener: (event: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const socket = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL as string;
    return io(url, { autoConnect: true });
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      console.log('Socket.io connected');
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('Socket.io disconnected');
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.on('connect', handleConnect);
      socket.on('disconnect', handleDisconnect);
    };
  }, [socket]);

  const emitEvent = <K extends keyof SocketEvents>(
    event: K,
    data: SocketEvents[K],
  ) => {
    if (isConnected) {
      socket.emit(event, data);
    } else {
      console.warn('Socket not connected. Cannot emit event:', event);
    }
  };

  const listenEvent = (event: string, callback: (data: any) => void) => {
    socket.on(event, callback);
  };

  const removeListener = (event: string) => {
    socket.off(event);
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, emitEvent, listenEvent, removeListener }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
