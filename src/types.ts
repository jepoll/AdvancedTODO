import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
};

export type DrawerParamList = {
  List: undefined;
  Profile: undefined;
};

export type ProfileScreenPropsStack = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type ProfileScreenPropsDrawer = DrawerScreenProps<DrawerParamList, 'Profile'>;

export type ProfileScreenProps = ProfileScreenPropsStack & ProfileScreenPropsDrawer;

export interface User {
    email: string,
    username: string;
    password: string;
    role: string;
    jwt?: string;
}

  