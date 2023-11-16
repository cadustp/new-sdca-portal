import { useClerk, useSignIn, useUser } from "@clerk/clerk-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Logo from "../../assets/branding/new_logo.svg"
import "./clerk-styles.css"
import { withRouter } from "../../helpers/withRouter";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  isLoading: boolean,
  authError: boolean,
  status: string,
};

type DispatchProps = {
  doLoginRequest: Function,
  clearStatus: Function,
  resetInstructionsRequest: Function,
  updatePasswordRequest: Function,
};

const ClerkLoginScreen: React.FC<Props & StateProps & DispatchProps> = ({ doLoginRequest }) => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [submitCalls, setSubmitCalls] = useState(0);
  const codeRefs = useRef(new Array(6).fill(null));
  const [showSaml, setShowSaml] = useState(false);
  const [showMFA, setShowMFA] = useState(false);
  const { isSignedIn } = useUser();
  const [user] = useCurrentUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [styles, setStyles] = useState({
    passInput: "",
    passLabel: "",
    wrongPass: false,
    emailInput: "",
    emailLabel: "",
    wrongEmail: false,
    emailMessage: ""
  });

  const SIGN_UP_LINK = "http://localhost:3000/sign-up";
  const baseUrl = process.env.REACT_APP_BASE_URI_API;
  const endpoint = process.env.REACT_APP_V1_ENDPOINT;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (showMFA) return verifyMFA(e);
    
    if (login.email.endsWith("@falconi.com")) return handleSamlLogin(e);
    
    setSubmitCalls((prev) => prev + 1);

    if (!isLoaded || submitCalls > 5) return;

    if (isSignedIn) signOut();

    const { email, password } = login;

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSubmitCalls(0);
        doLoginRequest({ login });
      } else if(result.status === "needs_second_factor") {
        setShowMFA(true);
        return;
      } else {
        console.log(result);
      }
    } catch (error: any) {
      if (error.errors[0].message === "Couldn't find your account.") {
        const response = await fetch(
          `${baseUrl}${endpoint}users/sync_clerk`,
          {
            method: 'post',
            body: JSON.stringify({ user: { email } })
          }
        );

        if (response.status === 200) {
          handleSubmit(e);
        } else if (response.status === 404) {
          setStyles((prev) => ({ ...prev, passInput: "input-error", passLabel: "error", wrongPass: true}));
        } else {
          console.log(response);
        }
      }

      if (error.errors[0].message === "Password is incorrect. Try again, or use another method.") {
        setStyles((prev) => ({ ...prev, passInput: "input-error", passLabel: "error", wrongPass: true}));
      }

      if (error.errors[0].message === "Identifier is invalid.") {
        handleEmailStyles("Incorrect email!")
      }
    }

  }

  const verifyMFA = async (e: any) => {
    e.preventDefault();
    
    if (!isLoaded) return;

    try {
      const response = await signIn.attemptSecondFactor({ strategy: "totp", code: code.join("") });

      if (response.status === "complete") {
        await setActive({ session: response.createdSessionId });
        setSubmitCalls(0);
        doLoginRequest({ login });
      } else {
        console.log(response);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  const handleCodeChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    setCode((prev) => {
      prev[index] = value[value.length - 1];
      return prev;
    });

    if (!value && index > 0) {
      codeRefs.current[index - 1].focus();
    } else {
      if (index < 5 && value) {
        codeRefs.current[index + 1].focus();
      }
    }
  }

  const handleEmailStyles = (message: string) => {
    setStyles((prev) => ({ ...prev, emailInput: 'input-error', emailLabel: 'error', wrongEmail: true, emailMessage: message }));
  }

  const handleSamlLogin = async (e: any) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!login.email.endsWith("@falconi.com")){
      handleEmailStyles("Domain not allowed!");
      return
    }

    const emailExists: boolean = await fetch(
      `${baseUrl}${endpoint}authentication/email_exists`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: login.email })
      }
    ).then((response) => response.status === 200).catch((error) => {
      console.log(error);
      return false;
    });

    if (!emailExists) handleEmailStyles('Email not found');
    else {
      await signIn.authenticateWithRedirect({
        strategy: 'saml',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/sso-login',
        identifier: login.email
      });
    }
  }

  useEffect(() => {
    if (user?.id) navigate("/dashboard");
  }, [user]);

  return (
    <div className="rootBox">
      <form className="form" onSubmit={ showSaml ? (e) => handleSamlLogin(e) : (e) => handleSubmit(e) }>
        <div className="header">
          <img src={Logo} width={180} alt="Dayway Logo" />
        </div>

        { (!showSaml && !showMFA) && (
            <>
              <button
                className="social-connection"
                type="button"
                onClick={() => setShowSaml(true)}
              >
                <span className="social-img-container">
                  <img src="https://img.clerk.com/static/microsoft.svg?width=160" alt="Microsoft" />
                </span>

                <p>Continue with Microsoft</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 20 20"
                  className="social-btn-arrow"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.3 10h13.4m-5-5 5 5-5 5"
                  ></path>
                </svg>
              </button>

              <div className="divider-box">
                <div className="divider"></div>
                <p className="divider-text">or</p>
                <div className="divider"></div>
              </div>
            </>
          ) 
        }


        { showMFA ? (
            <>
              <h3>Insert Auth code:</h3>
              <div className="code-box">
                {
                  [0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      className="input code-input"
                      key={index}
                      type="text"
                      maxLength={1}
                      ref={(ref) => (codeRefs.current[index] = ref)}
                      onChange={(e) => handleCodeChange(index, e)}
                      inputMode="numeric"
                    />
                  ))
                }
              </div>
            </>
          ) : (
            <>
              <div className="input-box">
                <label htmlFor="email" className={`label ${styles.emailLabel}`}>
                  { showSaml ? "Microsoft Account Email" : "Email" }
                </label>
              
                <input
                  onChange={(e) => setLogin((prev) => ({ ...prev, email: e.target.value }))}
                  id="email"
                  name="email"
                  type="email"
                  className={`input ${styles.emailInput}`}
                />

                {
                  styles.wrongEmail && (
                    <span className="title-text wrong-pass-msg">{ styles.emailMessage }</span>
                  )
                }
              </div>

              {
                !showSaml && (
                  <div className="input-box">
                    <label htmlFor="password" className={`label ${styles.passLabel}`}>Password</label>
                  
                    <input
                      onChange={(e) => setLogin((prev) => ({ ...prev, password: e.target.value }))}
                      id="password"
                      name="password"
                      type="password"
                      className={`input ${styles.passInput}`}
                    />

                    {
                      styles.wrongPass && (
                        <span className="title-text wrong-pass-msg">Incorrect password!</span>
                      )
                    }
                  </div>
                )
              }
            </>
          )
        }

        <button className="signin-btn" type="submit">
          { showMFA ? "Verify" : "Continue" }
        </button>

        <div className="footer">
          <span className="footer-text">No account?</span>
          <a href={SIGN_UP_LINK} className="footer-link">Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default withRouter(ClerkLoginScreen);