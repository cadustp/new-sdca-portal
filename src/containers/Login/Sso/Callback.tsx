import { useClerk, useSignIn, useSignUp } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn, isLoaded, setActive } = useSignIn();
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!isLoaded || !signUpLoaded) return;

    if (signIn.firstFactorVerification.status === "transferable") {
      const response = await signUp.create({ transfer: true });

      if (response.status === "complete") {
        await setActive({ session: response.createdSessionId })
          .then(() => navigate("/sso-login"));
      }
    } else {
      handleRedirectCallback({ redirectUrl: "/sso-login" });
    }
  }

  useEffect(() => {
    handleTransfer()
  }, [isLoaded]);

  return <></>
}

export default Callback;