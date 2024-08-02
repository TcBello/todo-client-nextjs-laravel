import { API_CREATE_TODO_ROUTE, API_DELETE_TODO_ROUTE, API_GET_TODOS_ROUTE, API_UPDATE_TODO_ROUTE } from "@/constants/api_routes_constants";
import TodoEntity from "@/domain/entities/todo_entity";
import BaseTodo from "@/domain/repositories/base_todo";
import RestMethod from "@/enums/rest_method";
import fetcher, { headerWithAuthorization } from "@/utils/fetcher";
import { getToken } from "../local/token_data_local_storage";

export default class RemoteTodoRepository implements BaseTodo {
    /**
     * Handles the add logic of todo in remote repository
     * @param userId 
     * @param content 
     */
    async addTodo(userId: string, content: string): Promise<TodoEntity | null> {
        try {
            const formattedData = JSON.stringify({user_id: userId, content: content});
            const token = getToken();

            const response = await fetcher({
                url: API_CREATE_TODO_ROUTE,
                method: RestMethod.post,
                body: formattedData,
                headers: headerWithAuthorization(token ?? "")
            });

            if(response.status === 200) {
                const jsonData = await response.json();

                return TodoEntity.fromJSON(jsonData.data)
            }
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    /**
     * Handles the fetch data logic of todo in remote repository
     * @param userId 
     */
    async fetchTodos(userId: string): Promise<TodoEntity[] | null> {
        try {
            const token = getToken();

            const response  = await fetcher({
                url: API_GET_TODOS_ROUTE(userId),
                method: RestMethod.get,
                headers: headerWithAuthorization(token ?? "")
            })

            if(response.status === 200) {
                const jsonData = await response.json() as {}[];

                return jsonData.map((json) => TodoEntity.fromJSON(json));
            }

            return [];
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    /**
     * Handles the update logic of todo in remote repository
     * @param todoId 
     * @param content 
     */
    async updateTodo(todoId: string, content: string): Promise<TodoEntity | null> {
        try {
            const formattedData = JSON.stringify({content: content});
            const token = getToken();

            const response = await fetcher({
                url: API_UPDATE_TODO_ROUTE(todoId),
                method: RestMethod.put,
                body: formattedData,
                headers: headerWithAuthorization(token ?? "")
            });

            if(response.status === 200) {
                const jsonData = await response.json();

                return TodoEntity.fromJSON(jsonData.data);
            }
        } catch (error) {
            console.error(error);
        }

        return null;
    }

    /**
     * Handles the delete logic of todo in remote repository
     * @param todoId 
     */
    async deleteTodo(todoId: string): Promise<boolean | null> {
        try {
            const token = getToken();

            const response = await fetcher({
                url: API_DELETE_TODO_ROUTE(todoId),
                method: RestMethod.delete,
                headers: headerWithAuthorization(token ?? "")
            });

            if(response.status === 200) {
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
        }

        return null;
    }
}
