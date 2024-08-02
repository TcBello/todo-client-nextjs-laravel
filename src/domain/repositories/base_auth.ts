import UserEntity from "../entities/user_entity";

export default interface BaseAuth {
    login(email: string, password: string): Promise<UserEntity | null>;
    register(username: string, email: string, password: string): Promise<UserEntity | null>;
    logout(): Promise<boolean>;
}
