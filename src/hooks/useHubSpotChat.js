import { useEffect } from 'react';
import './styles.css';

let refreshIntervalId;

function verifyWidget() {
  const iframe = document.getElementById('hubspot-messages-iframe-container');

  if (iframe) {
    clearInterval(refreshIntervalId);
    iframe.onmouseleave = function () {
      window.HubSpotConversations.widget.close();
    };
  }
}

function registerLoggedUser(user) {
  const _hsq = window._hsq = window._hsq || [];
  _hsq.push(['identify', {
    email: user.email,
  }]);
}

const useChatHubSpot = (show, user) => {
  const url = '//js.hs-scripts.com/20445392.js';
  // registerLoggedUser(user);

  useEffect(() => {
    if (show) {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      script.id = 'hs-script-loader';
      script.type = 'text/javascript';

      document.body.appendChild(script);
      refreshIntervalId = setInterval(verifyWidget, 500);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [show]);
};

export default useChatHubSpot;
