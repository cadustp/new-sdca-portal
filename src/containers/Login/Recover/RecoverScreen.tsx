import React, { useEffect, useState } from "react";
import "../styles.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../../../assets/branding/new_logo.svg"
import { useNavigate, useParams } from "react-router-dom";
import ClerkBadge from "../../../components/ClerkBadge";

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

const RecoverScreen: React.FC<StateProps & DispatchProps> = ({ updatePasswordRequest }) => {
  const [recover, setRecover] = useState({ password: "", confirmation: "" });
  const navigate = useNavigate();
  const params = useParams();
  const [styles, setStyles] = useState({
    passInput: "",
    passLabel: "",
    wrongPass: false,
    buttonCollor: "",
    showPass: false,
  });

  const handleRecoverPassword = (e: any) => {
    e.preventDefault();

    updatePasswordRequest({
      token: params.token,
      password: recover.password,
      password_confirmation: recover.confirmation,
    });
  };

  useEffect(() => {
    if (
      recover.password.length >= 6
      && recover.confirmation.length >= 6
      && recover.password === recover.confirmation
    ) setStyles((prev) => ({ ...prev, buttonCollor: "active-btn" }));
    else {
      setStyles((prev) => ({ ...prev, buttonCollor: "" }));
    }
  }, [recover])

  return (
    <div className="rootBox">
      <form className="form" onSubmit={ (e) => handleRecoverPassword(e) }>
        <ClerkBadge />

        <div className="header">
          <img src={Logo} width={180} alt="Dayway Logo" />
        </div>

        <div className="input-box">
          <label htmlFor="password" className={`label ${styles.passLabel}`}>Senha</label>

          <div className="icon-box" onClick={() => setStyles((prev) => ({ ...prev, showPass: !prev.showPass }))}>
            { styles.showPass ? <Visibility /> : <VisibilityOff /> }
          </div>
        
          <input
            onChange={(e) => setRecover((prev) => ({ ...prev, password: e.target.value }))}
            id="password"
            name="password"
            type={ styles.showPass ? "text" : "password" }
            className={`input ${styles.passInput}`}
          />

          {
            styles.wrongPass && (
              <span className="title-text wrong-pass-msg">Senha Incorreta!</span>
            )
          }
        </div>

        <div className="input-box">
          <label htmlFor="password" className={`label ${styles.passLabel}`}>Confirme sua senha</label>

          <div className="icon-box" onClick={() => setStyles((prev) => ({ ...prev, showPass: !prev.showPass }))}>
            { styles.showPass ? <Visibility /> : <VisibilityOff /> }
          </div>
        
          <input
            onChange={(e) => setRecover((prev) => ({ ...prev, confirmation: e.target.value }))}
            id="password"
            name="password"
            type={ styles.showPass ? "text" : "password" }
            className={`input ${styles.passInput}`}
          />

          {
            styles.wrongPass && (
              <span className="title-text wrong-pass-msg">Senha Incorreta!</span>
            )
          }
        </div>

        <button className={`signin-btn ${styles.buttonCollor}`} type="submit" disabled={!styles.buttonCollor}>
          Redefinir senha
        </button>

        <div className="footer">
          <p onClick={() => navigate("/login")} className="footer-link">
            Fazer login
          </p>
        </div>
      </form>
    </div>
  )
}

export default RecoverScreen;