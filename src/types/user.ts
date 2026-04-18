export interface UserProfile {
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
}

export interface UserAvatar {
  avatar: string | null;
}

export interface User extends UserProfile, UserAvatar {
  id: number;
}

export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}
