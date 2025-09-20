"use client"

import { useEffect, useRef } from "react";

export default function InstallGithubApp() {

    const installationIdRef = useRef("");
    const userCodeRef = useRef("");

    useEffect(() => {
        window.addEventListener("message", async (event: MessageEvent) => {
            const { installationId, userCode } = event.data;
            if (installationId) {
                console.log("installationId", installationId);
                installationIdRef.current = installationId;
            }
            console.log("Client-UserCode", userCode)
            if (userCode) {
            // if (userCode && !userCodeRef.current) {
                userCodeRef.current = userCode;
                console.log("userCode", userCode);

                // Do fetch on server component side
                const res = await fetch("/api", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${authTokenId}`
                    },
                    body: JSON.stringify({
                        userCode
                    })
                });

                const result = await res.json();
                if (result.success && result.access_token) {
                    console.log("User Access Token", result.access_token)
                    getUserInstallations(result.access_token);
                }
            }
        });
    }, [])

    const getUserInstallations = async (access_token: string) => {
        const url = "https://api.github.com/user/installations"
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${access_token}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });

        const result = await res.json();
        console.log("result", result)

    }

    const onClick = () => {
        const url = "https://github.com/apps/someorgapp/installations/new?state=123"
        // const url2 = "https://github.com/apps/someorgapp/installations/86571169/"
        openWindow(url);
    }

    return (
        <button title="Click Me" onClick={onClick}>
            <p className="bg-blue-200 p-2 rounded-lg m-5 cursor-pointer hover:bg-blue-300">Github Install</p>
        </button>
    );
}

function openWindow(url: string) {
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(
        url,
        "targetWindow",
        `toolbar=no, 
        width=${width},
        height=${height}, 
        left=${left}, 
        top=${top}, 
        location=no, 
        status=no,
        menubar=no,
        scrollbars=yes,
        resizable=yes)`
    );
}
