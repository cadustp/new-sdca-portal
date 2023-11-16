import { useSession } from "@clerk/clerk-react";
import React, { useEffect } from "react";

type DispatchProps = {
  doLoginRequest: Function,
};

const SsoLogin: React.FC<DispatchProps> = ({ doLoginRequest }) => {
  const { isLoaded, isSignedIn, session } = useSession();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      doLoginRequest({
        login: {
          email: session.user.primaryEmailAddress?.emailAddress,
          session: session.id
        }
      })
    }
  }, [isLoaded, isSignedIn]);

  return <></>
}

export default SsoLogin;