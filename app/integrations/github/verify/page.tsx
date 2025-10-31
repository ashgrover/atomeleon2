"use client"

import { saveInstallationId } from "@/lib/database";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyGithubIntegrationPage() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const installationId = searchParams.get("installation_id");
    const userCode = searchParams.get("code");

    useEffect(() => {
        async function verify() {
            if (!installationId) return null;

            if (installationId && !userCode) {
                authorizeUserWithOAuth(router, installationId);
            }

            if (!userCode) return null;
            const accessToken = await getUserAcessToken(userCode);

            console.log("InstallationId=", installationId, "AccessToken=", accessToken);

            const hasInstallation = await checkUserInstallation(installationId, accessToken);
            if (hasInstallation) {
                saveInstallationId(installationId);
                // window.close();
            }
        }

        verify();

    }, [installationId, router, userCode]);

    return (
        <div>
            Loading...
        </div>
    )
}

async function authorizeUserWithOAuth(router: AppRouterInstance, installationId: string,) {
    const clientId = "Iv23linNrsFe7b8xf4lJ";
    const redirectUrl = `http://localhost:3000/verify?installation_id=${installationId}`;
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`;
    router.push(url);
    return null;
}

async function getUserAcessToken(userCode: string) {
    const response = await fetch("/verify/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userCode
        })
    });

    const result = await response.json();
    return result?.access_token;
}

async function checkUserInstallation(installationId: string, userAccessToken: string) {
    if (!installationId || !userAccessToken) return false;

    const url = "https://api.github.com/user/installations"
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userAccessToken}`,
            "X-GitHub-Api-Version": "2022-11-28"
        }
    });

    const result = await response.json();
    if (result?.total_count <= 0) return false;

    const hasInstallation = result.installations.some((installation: { id: number; }) => String(installation.id) === installationId);
    console.log("hasInstallation", installationId, result.installations, hasInstallation)
    return hasInstallation;
}   