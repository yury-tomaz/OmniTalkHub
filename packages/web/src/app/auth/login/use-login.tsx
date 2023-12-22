"use client";
import { useDispatch, useSelector } from "@/store/hooks";
import { authenticate } from "@/app/api/auth/login";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.auth !== null) {
      router.push("/");
    }
  }, [auth]);

  const login = () => {
    if(!user || !password) {
      return;
    }

    dispatch(authenticate({
      user,
      password
    }));
  }

  const updateUser = (user: string) => {
    setUser(user);
  }

  const updatePassword = (password: string) => {
    setPassword(password);
  }

  return {
    models: {user, password},
    operations: {
      login,
      updateUser,
      updatePassword
    }
  };
};