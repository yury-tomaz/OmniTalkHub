export interface AuthenticateInputDTO {
  realm: string;
  username: string;
  password: string;
}

export interface AuthenticateOutputDTO {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  not_before_policy: number;
  session_state: string;
  scope: string;
}