import UserEntity from "../entities/user_entity";

interface BaseUser {
    getCurrentUser(): Promise<UserEntity | null>;
}

export default BaseUser;
