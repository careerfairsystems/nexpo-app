import { get } from "./_HttpHelpers"
import { API } from "api/API";


export const InitiateSSO = async (setSignedIn: (value: boolean) => void): Promise<void> => {
    const response = await get("/saml/initiatesinglesignon");
    const split = response.headers.get('Location')?.split('https://www.nexpo.arkadtlth.se/api/Saml/');
    const jwt = split ? split[1] : null;

    const success = await API.auth.SSOLogin(jwt);

    if (success) {
        setSignedIn(true);
    }
}