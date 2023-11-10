import React, { useEffect } from "react";

type DispatchProps = {
  doLoginRequest: Function,
};

const SsoLogin: React.FC<DispatchProps> = ({ doLoginRequest }) => {

    useEffect(() => {
        // recuperar a sessão do usuário no clerk
        // chamar api com email e session_id do usuário
        // realizar fluxo de login com doLoginRequest
    }, []);

    return (
        <div>Sso Login</div>
    )
}

export default SsoLogin;