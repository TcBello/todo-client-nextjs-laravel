import { Skeleton } from "@nextui-org/skeleton";

const SkeletonTodoItem = (props: { isLoaded: boolean }) => {
  return (
    <Skeleton isLoaded={props.isLoaded} className="rounded-lg">
      <div className="h-28 w-full" />
    </Skeleton>
  );
};

export default SkeletonTodoItem;
