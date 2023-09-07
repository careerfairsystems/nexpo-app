import { get } from "./_HttpHelpers"

export const InitiateSSO = async () => {
    get("/saml/initiatesinglesignon");
}