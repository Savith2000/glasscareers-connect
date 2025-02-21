
export type UserRole = 'student' | 'business' | 'admin';

export interface UserMetadata {
  role: UserRole;
}

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  full_name?: string;
  company_name?: string;
  created_at: string;
}
