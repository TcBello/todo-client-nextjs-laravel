import { API_LOGIN_ROUTE, API_LOGOUT_ROUTE, API_REGISTER_ROUTE } from "@/constants/api_routes_constants";
import UserEntity from "@/domain/entities/user_entity";
import BaseAuth from "@/domain/repositories/base_auth";
import RestMethod from "@/enums/rest_method";
import fetcher, { headerWithAuthorization } from "@/utils/fetcher";
import { getToken, removeToken, setToken } from "../local/token_data_local_storage";

export default class RemoteAuthRepository implements BaseAuth {
    /**
     * Handles the logout logic in remote repository
     */
    async logout(): Promise<boolean> {
        try {
            const token = getToken();

            const response = await fetcher({
                url: API_LOGOUT_ROUTE,
                method: RestMethod.get,
                headers: headerWithAuthorization(token ?? "")
            });

            if(response.status === 200) {
                removeToken();
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    }

    /**
     * Handles the login logic in remote repository
     * @param email 
     * @param password 
     */
    async login(email: string, password: string): Promise<UserEntity | null> {
        try {
            const data = JSON.stringify({
                email: email,
                password: password
            });

            const response = await fetcher({
                url: API_LOGIN_ROUTE,  
                method: RestMethod.post,
                body: data
            });

            if(response.status === 200) {
                var jsonData = await response.json();

                setToken(jsonData.token);

                return UserEntity.fromJSON(jsonData.data);
            }
            
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    /**
     * Handles the register logic in remote repository
     * @param username 
     * @param email 
     * @param password 
     */
    async register(username: string, email: string, password: string): Promise<UserEntity | null> {
        try {
            var data = JSON.stringify({
                username: username,
                email: email,
                password: password
            });

            const response = await fetcher({
                url: API_REGISTER_ROUTE,
                method: RestMethod.post,
                body: data
            });

            if(response.status === 201) {
                const jsonData = await response.json();

                setToken(jsonData.token);

                return UserEntity.fromJSON(jsonData.data);
            }
        } catch (error) {
            console.error(error);
        }

        return null;
    }
}
