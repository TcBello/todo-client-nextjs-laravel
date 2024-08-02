"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useSignUpController from "./signup_controller";
import { useLoader } from "@/providers/loader_provider";
import { Fragment } from "react";
import ModalLoader from "@/components/modal_loader";

export default function SignUpPage() {
  const {
    email,
    username,
    password,
    confirmPassword,
    emailErrorMessage,
    usernameErrorMessage,
    passwordErrorMessage,
    confirmPasswordErrorMessage,
    onChangeEmail,
    onChangeUsername,
    onChangePassword,
    onChangeConfirmPassword,
    isPasswordVisible,
    isConfirmPasswordVisible,
    showPassword,
    hidePassword,
    showConfirmPassword,
    hideConfirmPassword,
    handleSignUp,
  } = useSignUpController();

  const loader = useLoader();

  return (
    <Fragment>
      <ModalLoader isLoading={loader?.isLoading ?? false} />

      <div className="flex flex-col bg-white min-h-screen justify-center items-center gap-4">
        <h1 className="font-bold text-6xl">TODO</h1>
        <div className="space-y-4">
          <Input
            placeholder="Enter your email"
            label="Email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            isInvalid={emailErrorMessage != null}
            errorMessage={emailErrorMessage}
            color={emailErrorMessage != null ? "danger" : "default"}
          />
          <Input
            placeholder="Enter your username"
            label="Username"
            type="text"
            value={username}
            onChange={onChangeUsername}
            isInvalid={usernameErrorMessage != null}
            errorMessage={usernameErrorMessage}
            color={usernameErrorMessage != null ? "danger" : "default"}
          />
          <Input
            placeholder="Enter your password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={onChangePassword}
            isInvalid={passwordErrorMessage != null}
            errorMessage={passwordErrorMessage}
            color={passwordErrorMessage != null ? "danger" : "default"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() =>
                  isPasswordVisible ? hidePassword() : showPassword()
                }
                aria-label="toggle password visibility"
              >
                {isPasswordVisible ? (
                  <IoEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Input
            placeholder="Confirm your password"
            label="Confirm Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            isInvalid={confirmPasswordErrorMessage != null}
            errorMessage={confirmPasswordErrorMessage}
            color={confirmPasswordErrorMessage != null ? "danger" : "default"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() =>
                  isConfirmPasswordVisible
                    ? hideConfirmPassword()
                    : showConfirmPassword()
                }
                aria-label="toggle password visibility"
              >
                {isConfirmPasswordVisible ? (
                  <IoEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
        </div>
        <Button className="bg-blue-500 text-white" onClick={handleSignUp}>
          Sign Up
        </Button>
        <p>
          Have an account?{" "}
          <Link href={"/"} className="underline text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
}
