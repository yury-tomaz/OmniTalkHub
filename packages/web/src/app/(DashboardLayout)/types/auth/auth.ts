export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  username?: string;
  password?: string;
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
  submit: () => void;
}

export interface signInType {
  title?: string;
}
