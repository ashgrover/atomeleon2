import { App } from "octokit";

const octokitApp = new App({
    appId: process.env.GITHUB_APP_ID,
    privateKey: process.env.GITHUB_PRIVATE_KEY?.replace(/\\n/g, "\n").trim(),
});

export default octokitApp;