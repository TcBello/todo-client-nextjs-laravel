import RemoteAuthRepository from "@/data/remote/remote_auth_repository";
import DispatchStatus from "@/enums/dispatch_status";
import { useAuth } from "@/providers/auth_provider";
import { login, UserState } from "@/redux/slices/user_slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { validateEmail, validateInput } from "@/utils/input_validator";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const useLoginController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);

  const auth = useAuth();

  const dispatch = useAppDispatch();

  /**
     * Handles the onChange method on email input field
     * @param e 
     */
  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  /**
     * Handles the onChange method on password input field
     * @param e 
     */
  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  /**
     * Handles the onClick of show password icon button
     */
  function showPassword() {
    setPasswordVisibility(true);
  }

  /**
     * Handles the onClick of hide password icon button
     */
  function hidePassword() {
    setPasswordVisibility(false);
  }

  /**
   * Handles the onClick of the login button
   */
  async function handleLogin() {
    setEmailErrorMessage(validateEmail(email));
    setPasswordErrorMessage(validateInput(password));

    if (emailErrorMessage == null && passwordErrorMessage == null) {
      var data = await dispatch(login({email: email, password: password}));

      if(data.meta.requestStatus == DispatchStatus.fulfilled) {
        auth?.setToken((data.payload as UserState).token);
      }
    }
  }

  return {
    email,
    password,
    emailErrorMessage,
    passwordErrorMessage,
    isPasswordVisible,
    onChangeEmail,
    onChangePassword,
    handleLogin,
    showPassword,
    hidePassword,
  };
};

export default useLoginController;
