import TodoEntity from "../entities/todo_entity";

export default interface BaseTodo {
    addTodo(userId: string, content: string): Promise<TodoEntity | null>;
    fetchTodos(userId: string): Promise<TodoEntity[] | null>;
    updateTodo(todoId: string, content: string): Promise<TodoEntity | null>;
    deleteTodo(todoId: string): Promise<boolean | null>;
}
