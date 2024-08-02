export default class TodoEntity {
    public id: string;
    public userId: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(id: string, userId: string, content: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    /**
     * Handles the mapping of data from JSON to TodoEntity object
     * @param json 
     */
    static fromJSON(json: any): TodoEntity {
        return new TodoEntity(json.id, json.user_id, json.content, json.created_at, json.updated_at);
    }

    /**
     * Handles the mapping of data from TodoEntity object to JSON
     * @param todo 
     */
    static toJSON(todo: TodoEntity): string {
        const formattedTodo = {
            id: todo.id,
            user_id: todo.userId,
            content: todo.content,
            created_at: todo.createdAt,
            updated_at: todo.updatedAt
        }

        return JSON.stringify(formattedTodo);
    }
}
