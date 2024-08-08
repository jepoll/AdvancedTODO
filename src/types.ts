export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  List: undefined;
  Profile: undefined;
};

export interface User {
    email: string,
    username: string;
    password: string;
    role: string;
    jwt?: string;
}

  