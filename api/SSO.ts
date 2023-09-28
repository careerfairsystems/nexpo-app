import { get } from "./_HttpHelpers";
import { API } from "api/API";

export const InitiateSSO = async (setSignedIn: (value: boolean) => void): Promise<void> => {
  const response = await get("/saml/initiatesinglesignon");

  // Initialize WebSocket connection
  return new Promise((resolve, reject) => {
    const ws = new WebSocket('wss://nexpo.arkadtlth.se:8080'); // Replace with your WebSocket URL

    ws.onopen = () => {
      // Connection opened
      ws.send('Hello from Frontend'); // Send a message to initiate the process if needed
    };

    ws.onmessage = async (e) => {
      // Receive message from backend
      const message = JSON.parse(e.data);

      if (message.payload) {
        const jwtToken = message.payload;

        // Use the received JWT token for SSO login
        const success = await API.auth.SSOLogin(jwtToken);

        if (success) {
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }

        // Close the WebSocket connection
        ws.close();

        // Resolve the promise
        resolve();
      }
    };

    ws.onerror = (e) => {
      // An error occurred
      console.log(e);
      reject(e);
      setSignedIn(false);
    };

    ws.onclose = (e) => {
      // Connection closed
      console.log(e.code, e.reason);
    };
  });
};
