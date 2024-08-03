export type RootStackParamList = {
    Login: undefined;
    List: { userType: string };
    Task: { taskId: string };
    Profile: undefined;
  };

export interface User {
    email: string,
    username: string;
    password: string;
    role: string;
    jwt: string | undefined;
}

  