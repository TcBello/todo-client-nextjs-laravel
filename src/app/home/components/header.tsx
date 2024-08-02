import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { useAuth } from "@/providers/auth_provider";
import { useLoader } from "@/providers/loader_provider";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout, resetUserState } from "@/redux/slices/user_slice";
import DispatchStatus from "@/enums/dispatch_status";
import { resetTodosState } from "@/redux/slices/todo_slice";
import { removeReduxState } from "@/data/local/redux_state_local_storage";

const Header = () => {
  const auth = useAuth();

  const loader = useLoader();

  const dispatch = useAppDispatch();
  const user = useAppSelector((reducer) => reducer.user.data);

  /**
   * Handles the logout when button is clicked
   */
  async function handleLogout() {
    loader?.setLoading(true);

    const dispatchResponse = await dispatch(logout());

    if (dispatchResponse.meta.requestStatus == DispatchStatus.fulfilled) {
      dispatch(resetTodosState());
      dispatch(resetUserState());
      removeReduxState();
      auth?.setToken(null);
    }

    loader?.setLoading(false);
  }

  return (
    <Navbar maxWidth="full" className="bg-blue-500" position="static">
      <NavbarContent justify="center">
        <h1 className="font-bold text-2xl text-white mr-auto ml-auto">TODO</h1>
      </NavbarContent>

      <NavbarContent justify="end">
        <Popover placement="bottom">
          <PopoverTrigger>
            <User as="button" name="" className="transition-transform" />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <div className="p-2 space-y-4">
              <h1>
                Hello, <b>{user?.username}</b>
              </h1>
              <Button
                className="w-full bg-blue-500 text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
