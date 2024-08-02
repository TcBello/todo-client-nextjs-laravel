import DispatchStatus from "@/enums/dispatch_status";
import { useAuth } from "@/providers/auth_provider";
import { useLoader } from "@/providers/loader_provider";
import { register, UserState } from "@/redux/slices/user_slice";
import { useAppDispatch } from "@/redux/store";
import { validateConfirmPassword, validateEmail, validateInput, validatePassword } from "@/utils/input_validator";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const useSignUpController = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
    null
  );
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string | null>(
    null
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<
    string | null
  >(null);
  
  const auth = useAuth();

  const router = useRouter();

  const loader = useLoader();

  const dispatch = useAppDispatch();

  /**
     * Handles the onChange method on email input field
     * @param e 
     */
  function onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  /**
     * Handles the onChange method on username input field
     * @param e 
     */
  function onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  /**
     * Handles the onChange method on password input field
     * @param e 
     */
  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  /**
     * Handles the onChange method on confirm password input field
     * @param e 
     */
  function onChangeConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  /**
     * Handles the onClick of show password icon button
     * @param e 
     */
  function showPassword() {
    setPasswordVisibility(true);
  }

  /**
     * Handles the onClick of hide password icon button
     * @param e 
     */
  function hidePassword() {
    setPasswordVisibility(false);
  }


  /**
     * Handles the onClick of show confirm password icon button
     * @param e 
     */
  function showConfirmPassword() {
    setConfirmPasswordVisibility(true);
  }

  /**
     * Handles the onClick of hide confirm password icon button
     * @param e 
     */
  function hideConfirmPassword() {
    setConfirmPasswordVisibility(false);
  }

  /**
   * Handles the onClick of sign up button
   */
  async function handleSignUp() {
    setEmailErrorMessage(validateEmail(email));
    setPasswordErrorMessage(validatePassword(password));
    setUsernameErrorMessage(validateInput(username));
    setConfirmPasswordErrorMessage(validateConfirmPassword(confirmPassword, password));

    if (emailErrorMessage == null && passwordErrorMessage == null && usernameErrorMessage == null && confirmPasswordErrorMessage == null) {
      loader?.setLoading(true);
      const dispatchResponse = await dispatch(register({username: username, email: email, password: password}));
      loader?.setLoading(false);

      if(dispatchResponse.meta.requestStatus == DispatchStatus.fulfilled) {
        auth?.setToken((dispatchResponse.payload as UserState).token);

        router.replace("/home");
      }
    }
  }

  return {
    email,
    username,
    password,
    confirmPassword,
    emailErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    confirmPasswordErrorMessage,
    isPasswordVisible,
    isConfirmPasswordVisible,
    onChangeEmail,
    onChangeUsername,
    onChangePassword,
    onChangeConfirmPassword,
    handleSignUp,
    showPassword,
    hidePassword,
    showConfirmPassword,
    hideConfirmPassword
  };
}

export default useSignUpController;
