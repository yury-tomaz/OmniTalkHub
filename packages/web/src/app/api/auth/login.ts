import { AppDispatch } from "@/store/store";
import api from "@/utils/axios";
import { login } from "@/store/auth/auth-slice";

export const authenticate = (input: any)  => async (dispatch: AppDispatch) => {
  try {
    const result = await api.post('/api/v1/auth/login', {
      username: input.user,
      password: input.password,
    },{
      headers: {
        'x-tenant-id': 'teste',
      }
    });

    dispatch(login({
      accessToken: result.data.access_token,
      idToken: result.data.id_token,
      refreshToken: result.data.refresh_token,
      sessionState: result.data.session_state,
    }));
return
  }catch (e: any) {
    console.log(e.message);
    throw new Error(e.message);
  }
}