import { API_CURRENT_USER_ROUTE } from "@/constants/api_routes_constants";
import UserEntity from "@/domain/entities/user_entity";
import BaseUser from "@/domain/repositories/base_user";
import RestMethod from "@/enums/rest_method";
import fetcher, { headerWithAuthorization } from "@/utils/fetcher";
import { getToken } from "../local/token_data_local_storage";

export class RemoteUserRepository implements BaseUser {
    /**
     * Handles the fetch data of the current logged in user
     */
    async getCurrentUser(): Promise<UserEntity | null> {
        try {
            const token = getToken();

            const response = await fetcher({
                url: API_CURRENT_USER_ROUTE,
                method: RestMethod.get,
                headers: headerWithAuthorization(token ?? "")
            });

            if(response.status === 200) {
                const jsonData = await response.json();

                return UserEntity.fromJSON(jsonData.data);
            }
        } catch (error) {
            console.error(error);
        }

        return null;
    }
}
