import { useDispatch, useSelector } from "@/store/hooks";
import { recoverTokens } from "@/utils/login";
import { useEffect } from "react";
import { login } from "@/store/auth/auth-slice";
import { useRouter } from "next/navigation";

interface PageParams {
	params: {
		id: string;
	};
}

function WithAuth<P extends PageParams>(
	WrappedComponent: React.ComponentType<P>
) {
	const WithAuthWrapper: React.FC<P> = (props: P) => {
		const router = useRouter();
		const auth = useSelector((state) => state.auth);
		const dispatch = useDispatch();

		useEffect(() => {
			if(!auth.auth) {
				try {
					dispatch(login(recoverTokens()))
				}catch (e) {
					router.push('/login');
				}
			}
		}, [auth]);

		return <WrappedComponent {...props} />;
	};

	WithAuthWrapper.displayName = `withAuth(WithAuthWrapper)`;
	return WithAuthWrapper;
}

export default WithAuth;