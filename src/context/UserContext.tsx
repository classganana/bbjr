// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  user: UserType | null; // Replace 'any' with the actual type of user data
  setUser: React.Dispatch<React.SetStateAction<any>>; // Adjust the type accordingly
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null); // Adjust the type accordingly

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export type UserType = {
    name: string,
    phoneNumber: string,
    class: number,
    board: string,
    userId: string,
    school: string,
    guardianEmail?: string,
    guardianName?: string,
    avatarId: string,
}