import { createContext } from 'react';
import type { AuthContextType } from '../utils/types';

export const AuthenticationContext = createContext<AuthContextType | undefined>(undefined);