export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  role: string;
}

export interface AuthResponse {
  data: AuthResponseData;
  success: boolean;
}