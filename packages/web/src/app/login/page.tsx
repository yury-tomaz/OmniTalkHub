"use client";
import { useSelector } from "@/store/hooks";
import { makeLoginUrl } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
 const auth = useSelector((state) => state.auth);
 const router = useRouter();

 useEffect(() => {
  if (auth.auth == null) {
   window.location.href = makeLoginUrl();
  } else {
   router.push("/");
  }
 }, [auth]);


 return <div>Loading...</div>;
}