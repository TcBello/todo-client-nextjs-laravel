"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import useLoginController from "./login_controller";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Home() {
  const {
    email,
    password,
    emailErrorMessage,
    passwordErrorMessage,
    onChangeEmail,
    onChangePassword,
    isPasswordVisible,
    showPassword,
    hidePassword,
    handleLogin,
  } = useLoginController();

  return (
    <main className="flex flex-col bg-white min-h-screen justify-center items-center gap-4">
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
      </div>
      <Button className="bg-blue-500 text-white" onClick={handleLogin}>
        Login
      </Button>
      <p>
        Don't have an account?{" "}
        <Link href={"/signup"} className="underline text-blue-500">
          Sign up
        </Link>
      </p>
    </main>
  );
}
