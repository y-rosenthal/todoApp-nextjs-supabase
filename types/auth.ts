import { User, Profile } from "./models";

export interface BaseState {
  isLoading: boolean;
  error: string | null;
}

export interface AuthState extends BaseState {
  user: User | null;
  profile: Profile | null;
  session: any;
  isLoggedIn: boolean;
  email: string;
  password: string;
  isSignUpMode: boolean;
}

export interface AuthOperations {
  signOut: () => Promise<void>;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
  handleSignup: () => Promise<void>;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setIsSignUpMode: (value: boolean) => void;
  clearError: () => void;
  updateUserProfile: (updates: Partial<Profile>) => Promise<void>;
}

export type UseAuthReturn = AuthState & AuthOperations;
