"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLogin } from "./use-auth";
import { Box, CircularProgress } from "@mui/material";

export default function Callback() {
 const router = useRouter();
 const { models, operations } = useLogin();
 const [isRequesting, setIsRequesting] = useState(false);
 const [isError, setIsError] = useState(false);

 useEffect(() => {
  if (models.auth.auth) {
   router.push("/");
   return;
  }

  const hash = window.location.hash.substring(1);
  const searchParams = new URLSearchParams(hash);

  const accessToken = searchParams.get("access_token") as string;
  const idToken = searchParams.get("id_token") as string;
  const state = searchParams.get("state") as string;
  const code = searchParams.get("code") as string;


  if (!accessToken || !idToken || !state) {
  router.push("/login");
  }

  handleLogin(code);
 }, [models.auth.auth]);

 

 async function handleLogin(code: string) {
  if (isRequesting || isError) {
    return;
  }
  setIsRequesting(true);

  try {
   await operations.handleLogin(code);
  } catch (error) {
   setIsError(true);
   console.error("Error during login:", error);
  } finally {
   setIsRequesting(false);
  }
 }

 return (
  <Box
   sx={{
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
   }}
  >
    {isRequesting && <CircularProgress />}
    {isError && <div>Something went wrong</div>}
  </Box>
 );
}

