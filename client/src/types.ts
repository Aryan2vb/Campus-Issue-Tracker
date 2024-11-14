export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Department {
  id: string;
  department_name: string;
  contact_email: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}