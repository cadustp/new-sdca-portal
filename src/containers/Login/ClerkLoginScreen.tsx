import { useSignIn } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
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
  const { isLoaded, signIn, setActive } = useSignIn();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [styles, setStyles] = useState({
    passInput: "",
    passLabel: "",
    wrongPass: false,
    emailInput: "",
    emailLabel: "",
    wrongEmail: false
  });
  const [submitCalls, setSubmitCalls] = useState(0);
  const SIGN_UP_LINK = "http://localhost:3000/sign-up";
  const baseUrl = process.env.REACT_APP_BASE_URI_API;
  const endpoint = process.env.REACT_APP_V1_ENDPOINT;
  const [user] = useCurrentUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSubmitCalls((prev) => prev + 1);

    if (!isLoaded || submitCalls > 5) return;

    const { email, password } = login;

    try {
      const result = await signIn.create({ identifier: email, password });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSubmitCalls(0);
        doLoginRequest({ login });
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
          setStyles((prev) => ({ ...prev, passInput: "pass-error", passLabel: "error", wrongPass: true}));
        } else {
          console.log('chegou aqui :(');
          console.log(response);
          console.log(response.body);
        }
      }

      if (error.errors[0].message === "Password is incorrect. Try again, or use another method.") {
        setStyles((prev) => ({ ...prev, passInput: "input-error", passLabel: "error", wrongPass: true}));
      }

      if (error.errors[0].message === "Identifier is invalid.") {
        setStyles((prev) => ({ ...prev, emailInput: "input-error", emailLabel: "error", wrongEmail: true }));
      }
    }

  }

  useEffect(() => {
    if (user?.id) navigate("/dashboard");
  }, [user]);

  return (
    <div className="rootBox">
      <form className="form">
        <div className="header">
          <img src={Logo} width={180} alt="Dayway Logo" />
        </div>
        
        <div className="input-box">
          <label htmlFor="email" className={`label ${styles.emailLabel}`}>Email</label>
        
          <input
            onChange={(e) => setLogin((prev) => ({ ...prev, email: e.target.value }))}
            id="email"
            name="email"
            type="email"
            className={`input ${styles.emailInput}`}
          />

          {
            styles.wrongEmail && (
              <span className="title-text wrong-pass-msg">Incorrect email!</span>
            )
          }
        </div>
        
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
        
        <button className="signin-btn" onClick={handleSubmit}>Continue</button>

        <div className="footer">
          <span className="footer-text">No account?</span>
          <a href={SIGN_UP_LINK} className="footer-link">Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default withRouter(ClerkLoginScreen);