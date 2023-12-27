import { AppDispatch } from "@/store/store";
import { login } from "@/store/auth/auth-slice";
import axiosServices from "@/utils/axios";


export const authenticate = (code: string) => async (dispatch: AppDispatch) => {

  const isLocalhost = window.location.hostname === 'localhost';
  let realm;

  if (isLocalhost) {
    realm = 'teste';
  } else {
    realm = window.location.hostname.split('.')[0];
  }

  const data = {
    realm: realm, 
    client_id: 'react_client',
    code: code,
  }
  
  try {
    const result = await axiosServices.post('/auth/code', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })


    dispatch(login({
      accessToken: result.data.access_token,
      idToken: result.data.id_token,
      refreshToken: result.data.refresh_token,
      sessionState: result.data.session_state,
    }));
    return;
    
  } catch (e: any) {
    throw new Error(e)
  }
}