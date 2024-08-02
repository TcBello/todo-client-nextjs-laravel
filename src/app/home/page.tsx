"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Fragment, useEffect } from "react";
import Header from "./components/header";
import TodoItem from "./components/todo_item";
import useHomeController from "./home_controller";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/modal";
import ModalLoader from "@/components/modal_loader";
import { useLoader } from "@/providers/loader_provider";
import SkeletonTodoItem from "./components/skeleton_todo_item";
import ProtectedRoute from "@/components/protected_route";
import { fetchData } from "@/redux/slices/user_slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import DispatchStatus from "@/enums/dispatch_status";
import UserEntity from "@/domain/entities/user_entity";
import LoadingState from "@/enums/loading_state";
import { useAuth } from "@/providers/auth_provider";

const LoadingTodo = (props: { isLoading: boolean }) => {
  return (
    <Fragment>
      <SkeletonTodoItem isLoaded={!props.isLoading} />
      <SkeletonTodoItem isLoaded={!props.isLoading} />
      <SkeletonTodoItem isLoaded={!props.isLoading} />
    </Fragment>
  );
};

function HomePage() {
  const {
    todo,
    editTodo,
    editTodoErrorMessage,
    todoList,
    todoErrorMessage,
    isOpen,
    onOpenChange,
    onChangeTodo,
    onChangeEditTodo,
    handleAdd,
    handleEdit,
    handleApplyEdit,
    handleDelete,
    handleFetchTodos,
    handleCloseEdit,
  } = useHomeController();

  const loader = useLoader();

  const auth = useAuth();

  const dispatch = useAppDispatch();
  const user = useAppSelector((reducer) => reducer.user.data);
  const isTodoLoading = useAppSelector((reducer) => reducer.todos.isLoading);

  /**
   * Handles the fetching of user data and the user's list of todos
   * when the page is initialized
   */
  useEffect(() => {
    if (auth?.token != null) {
      dispatch(fetchData()).then((fetchUserData) => {
        if (fetchUserData.meta.requestStatus == DispatchStatus.fulfilled) {
          const user = fetchUserData.payload as UserEntity;
          handleFetchTodos(user.id);
        }
      });
    }
  }, [auth?.token]);

  return (
    <Fragment>
      <ModalLoader isLoading={loader?.isLoading ?? false} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            <h1>Edit Todo</h1>
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Edit your todo here..."
              onChange={onChangeEditTodo}
              value={editTodo}
              isInvalid={editTodoErrorMessage != null}
              errorMessage={editTodoErrorMessage}
              color={editTodoErrorMessage != null ? "danger" : "default"}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseEdit}>
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => handleApplyEdit(user?.id ?? "")}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Header />

      <div className="flex flex-col h-[90vh] p-8 bg-white gap-5">
        <div className="flex flex-row gap-4">
          <Input
            placeholder="Enter your todo"
            onChange={onChangeTodo}
            value={todo}
            isInvalid={todoErrorMessage != null}
            errorMessage={todoErrorMessage}
            color={todoErrorMessage != null ? "danger" : "default"}
          />
          <Button
            className="bg-blue-500 text-white"
            onClick={() => handleAdd(user?.id ?? "")}
          >
            Add
          </Button>
        </div>

        <div className="w-full h-full bg-blue-50 rounded-md flex flex-col gap-2 overflow-y-scroll p-4">
          {isTodoLoading != LoadingState.success && todoList.length == 0 ? (
            <LoadingTodo isLoading={true} />
          ) : (
            todoList.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  todo={item}
                  onEdit={() => handleEdit(item.content, item.id)}
                  onDelete={() => handleDelete(item.id, user?.id ?? "")}
                />
              );
            })
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default ProtectedRoute(HomePage);
