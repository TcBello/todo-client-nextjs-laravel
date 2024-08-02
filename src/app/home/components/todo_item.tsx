import TodoEntity from "@/domain/entities/todo_entity";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";

const TodoItem = (props: {
  todo: TodoEntity;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card className="min-h-24">
      <CardBody className="overflow-hidden">
        <p className="pt-2 pb-2">{props.todo.content}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row gap-2 w-full justify-end">
          <Button className="bg-blue-500 text-white" onClick={props.onEdit}>
            Edit
          </Button>
          <Button color="danger" onClick={props.onDelete}>
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TodoItem;
