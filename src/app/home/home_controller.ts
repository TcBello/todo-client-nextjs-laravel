import DispatchStatus from "@/enums/dispatch_status";
import { useLoader } from "@/providers/loader_provider";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "@/redux/slices/todo_slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { validateInput } from "@/utils/input_validator";
import { useDisclosure } from "@nextui-org/modal";
import { ChangeEvent, useState } from "react";

const useHomeController  = () => {
    const [todo, setTodo] = useState("");
    const [editTodo, setEditTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState("");
    const [todoErrorMessage, setTodoErrorMessage] = useState<string | null>(null);
    const [editTodoErrorMessage, setEditTodoErrorMessage] = useState<string | null>(null);

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const loader = useLoader();

    const dispatch = useAppDispatch();
    const todoList = useAppSelector(reducer => reducer.todos.data);

    /**
     * Handles the onChange method on input field
     * @param e 
     */
    function onChangeTodo(e: ChangeEvent<HTMLInputElement>) {
        setTodo(e.target.value);
    }

    /**
     * Handles the onChange method on input field
     * @param e 
     */
    function onChangeEditTodo(e: ChangeEvent<HTMLInputElement>) {
        setEditTodo(e.target.value);
    }

    /**
     * Clear the todo input field
     */
    function clear() {
        setTodo("");
    }

    /**
     * Handles the fetch data of todos
     * @param userId 
     */
    async function handleFetchTodos(userId: string) {
        dispatch(fetchTodos({userId: userId}));
    }

    /**
     * Handles the adding of todo
     * @param userId 
     */
    async function handleAdd(userId: string) {
        loader?.setLoading(true);
        setTodoErrorMessage(validateInput(todo));

        var response = await dispatch(addTodo({userId: userId, content: todo}));

            if(response.meta.requestStatus == DispatchStatus.fulfilled) {
                clear();
            }
        
        loader?.setLoading(false);
    }

    /**
     * Handles the onClick of edit button
     * @param content 
     * @param todoId 
     */
    function handleEdit(content: string, todoId: string) {
        setEditTodo(content);
        setEditTodoId(todoId);
        onOpen();
    }

    /**
     * Handles the onClick of delete button
     * @param todoId 
     * @param userId 
     */
    async function handleDelete(todoId: string, userId: string) {
        loader?.setLoading(true);
        await dispatch(deleteTodo({userId: userId, todoId: todoId}));
        loader?.setLoading(false);
    }

    /**
     * Handles the onClick of apply change of todo edit
     * @param userId 
     */
    async function handleApplyEdit(userId: string) {
        loader?.setLoading(true);
        setEditTodoErrorMessage(validateInput(editTodo));

        if(editTodoErrorMessage === null && editTodoId.toString().length > 0) {
            const dispatchResponse = await dispatch(updateTodo({userId: userId, todoId: editTodoId, content: editTodo}));

            if(dispatchResponse.meta.requestStatus == DispatchStatus.fulfilled) {
                loader?.setLoading(false);
                onClose();
            }
        }
    }

    /**
     * Handles the onClick of close button in edit modal
     */
    function handleCloseEdit() {
        setEditTodoId("");
        setEditTodo("");
        onClose();
    }

    return {
        todo,
        todoList,
        editTodo,
        todoErrorMessage,
        editTodoErrorMessage,
        isOpen,
        onOpenChange,
        onChangeTodo,
        onChangeEditTodo,
        handleAdd,
        handleEdit,
        handleApplyEdit,
        onOpen,
        handleDelete,
        handleFetchTodos,
        handleCloseEdit
    };
}

export default useHomeController;
