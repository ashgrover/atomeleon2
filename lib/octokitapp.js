import { App } from "octokit";



const octokitApp = new App({
    appId: APP_ID,
    privateKey: PRIVATE_KEY,
});

export default octokitApp;