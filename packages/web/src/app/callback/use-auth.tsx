"use client";
import { useDispatch, useSelector } from "@/store/hooks";
import { authenticate } from "@/app/api/auth/login";

export const useLogin = () => {
 const auth = useSelector((state) => state.auth);
 const dispatch = useDispatch();

 const handleLogin = async (code: string) => {
  try{
   await dispatch(authenticate(code));
  }catch(e){
   console.log(e);
  }
 };


 return {
  models: { auth },
  operations: {
   handleLogin,
  }
 };
};