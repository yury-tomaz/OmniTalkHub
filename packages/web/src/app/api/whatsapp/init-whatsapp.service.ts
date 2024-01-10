import { AppDispatch } from "@/store/store";
import axiosServices from "@/utils/axios";

export const initWhatsappService = () => async (dispatch: AppDispatch) => {
    const isLocalhost = window.location.hostname === 'localhost';
    let realm;
  
    if (isLocalhost) {
      realm = process.env.NEXT_PUBLIC_REALM!;
    } else {
      realm = window.location.hostname.split('.')[0];
    }


    try{
        await axiosServices.post('/baileys', {}, {});
    }catch(e:any){
        throw new Error(e)
    }


  
} 