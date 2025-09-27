import { createContext } from 'react';
import type { LoginViewContextType } from '../utils/types';

export const LoginViewContext = createContext<LoginViewContextType | undefined>(undefined);