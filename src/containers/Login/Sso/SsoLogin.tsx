import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

type DispatchProps = {
  doLoginRequest: Function,
};

const SsoLogin: React.FC<DispatchProps> = ({ doLoginRequest }) => {
  const { isLoaded, isSignedIn, session } = useSession();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const email = session.user.primaryEmailAddress?.emailAddress || '';
      doLoginRequest({ login: { email, session: session.id } })
    }
  }, [isLoaded]);

  return (
    <div>Sso Login</div>
  )
}

export default SsoLogin;