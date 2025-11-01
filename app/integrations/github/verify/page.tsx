"use client"

import { saveInstallationId } from "@/lib/database";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyGithubIntegrationPage() {
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams()
    const router = useRouter();
    const installationId = searchParams.get("installation_id");
    const userCode = searchParams.get("code");

    useEffect(() => {
        async function verify() {
            if (!installationId) return;

            try {
                if (!userCode) {
                    authorizeUserWithOAuth(router, installationId);
                    return;
                }

                window.opener?.postMessage(
                    { installation_id: installationId, user_code: userCode },
                    "http://localhost:3000" // target origin for security
                );

                setIsLoading(false);
            } catch (err) {
                console.log(err instanceof Error ? err.message : err);
            }
        }

        verify();

    }, [installationId, router, userCode]);

    return (
        <div className="flex justify-center mt-10">
            {isLoading ?
                <div className="flex gap-1">
                    <Loader2 className="animate-spin" />
                    <p className="font-medium">Verifying installation....</p>
                </div> :
                <div>
                    <p className="font-medium">Verified! You can close this window.</p>
                </div>
            }
        </div>
    )
}

async function authorizeUserWithOAuth(router: AppRouterInstance, installationId: string,) {
    const clientId = "Iv23linNrsFe7b8xf4lJ";
    const redirectUrl = `http://localhost:3000/integrations/github/verify?installation_id=${installationId}`;
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`;
    router.push(githubOAuthUrl);
}

