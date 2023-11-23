import React, { useState } from "react"
import PropTypes from "prop-types";
import { CloseOutlined, VerifiedOutlined } from "@mui/icons-material";
import "./styles.css"

type Props = {
  handleMfaModal: Function;
  user: { email: string }
};

const MfaModal: React.FC<Props> = ({ handleMfaModal, user }) => {
  const [checked, setChecked] = useState(false);

  const closeModal = (e: any) => {
    e.preventDefault();

    if (checked) {
      const prevHideModal = JSON.parse(localStorage.getItem("hideMfaModal") || "{}");
      localStorage.setItem(
        "hideMfaModal", 
        JSON.stringify({ ...prevHideModal, [user.email]: true })
      );
    }

    handleMfaModal(false);
  }

  const configMfa = (e: any) => {
    e.preventDefault();

    const mfaUrl = process.env.REACT_APP_CLERK_MFA_UR || null;

    if (mfaUrl) window.location.href = mfaUrl;
    else {
      handleMfaModal(false);
    }
  }

  return (
    <div className="mfa-container" onClick={(e) => closeModal(e)}>
      <div className="mfa-box" onClick={(e) => e.stopPropagation()}>
        <div className="mfa-header">
          <CloseOutlined className="mfa-close-icon" onClick={(e) => closeModal(e)} />
          <VerifiedOutlined fontSize="large" className="mfa-verify-icon" />
          <h2 className="mfa-title">
            { "Aumente a segurança da sua conta com a autenticação de múltiplos fatores (MFA)" }
          </h2>
        </div>
        
        <div className="mfa-footer">
          <p className="mfa-text">
            { "A autenticação por múltiplos fatores (MFA) aumenta a segurança da sua conta, reduzindo riscos de acessos indevidos e vazamento de dados. Gostaria de configurar a MFA para sua conta?" }
          </p>

          <label htmlFor="mfa-check" className="mfa-label">
            <input id="mfa-check" className="mfa-check" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
            Não mostrar isso novamente
          </label>

          <div className="mfa-btn-box">
            <button 
              type="button" 
              className="mfa-btn mfa-cancel-btn"
              onClick={(e) => closeModal(e)}
            >
              Cancelar
            </button>

            <button 
              type="button" 
              className="mfa-btn mfa-config-btn"
              onClick={(e) => configMfa(e)}
            >
              Configurar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

MfaModal.propTypes = {
  handleMfaModal: PropTypes.func.isRequired,
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

export default MfaModal;