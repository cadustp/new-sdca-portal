import React, { useEffect, useState } from "react";
import "../styles.css"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../../../assets/branding/new_logo.svg"
import { useNavigate, useParams } from "react-router-dom";
import ClerkBadge from "../../../components/ClerkBadge";
import Loading from '../../../components/Loading';
import { RESPONSE_STATUS, SNACKBAR_VARIANTS } from "../../../helpers/consts";
import CustomSnackbar from "../../../components/shared/CustomSnackbar/CustomSnackbar";

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

const RecoverScreen: React.FC<Props & StateProps & DispatchProps> = ({
  updatePasswordRequest,
  status,
  clearStatus,
  intl
}) => {
  const [recover, setRecover] = useState({ password: "", confirmation: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [styles, setStyles] = useState({
    passInput: "",
    passLabel: "",
    buttonCollor: "",
    showPass: false,
  });

  const responseSuccess = status === RESPONSE_STATUS.SUCCESS;

  const handleRecoverPassword = (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    updatePasswordRequest({
      token: params.token,
      password: recover.password,
      password_confirmation: recover.confirmation,
    });

    setRecover({ password: "", confirmation: "" });
  };

  const StatusSnackBar = () => (
    <CustomSnackbar
      data={{
        message: handleSnackMessage(),
        type: responseSuccess ? SNACKBAR_VARIANTS.SUCCESS : SNACKBAR_VARIANTS.ERROR,
        open: status.length,
      }}
      handleClose={handleClose}
    />
  );

  const handleClose = () => {
    clearStatus();
  };


  const handleSnackMessage = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    if (responseSuccess) return intl.messages['login.recover.success'];
    else {
      return intl.messages['login.recover.error'];
    }
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

  useEffect(() => {
    console.log("isLoading: ", isLoading);
  }, [isLoading])

  return (
    <div className="rootBox">
      { isLoading && <Loading size="small" /> }

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
            value={recover.password}
          />
        </div>

        <div className="input-box">
          <label htmlFor="confirmation" className={`label ${styles.passLabel}`}>Confirme sua senha</label>

          <div className="icon-box" onClick={() => setStyles((prev) => ({ ...prev, showPass: !prev.showPass }))}>
            { styles.showPass ? <Visibility /> : <VisibilityOff /> }
          </div>
        
          <input
            onChange={(e) => setRecover((prev) => ({ ...prev, confirmation: e.target.value }))}
            id="confirmation"
            name="confirmation"
            type={ styles.showPass ? "text" : "password" }
            className={`input ${styles.passInput}`}
            value={recover.confirmation}
          />
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

      <StatusSnackBar />
    </div>
  )
}

export default RecoverScreen;