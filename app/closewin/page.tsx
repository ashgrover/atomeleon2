"use client"

import { useRouter, useSearchParams } from "next/navigation";

export default function CloseWin() {
    console.log("closewin")
    const searchParams = useSearchParams()
    const router = useRouter();

    const installationId = searchParams.get("installation_id")
    const userCode = searchParams.get("code");

    try {
        if (installationId) {

            window.opener?.postMessage({ installationId }, "*");
            const clientId = "Iv23linNrsFe7b8xf4lJ"
            const redirectUrl = "http://localhost:3000/closewin";
            router.push(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`);
        }
        else if (userCode) {
            window.opener?.postMessage({ userCode }, "*");
             // window.close();
        }

    }
    catch { }

    return (
        <div>
            Close Window
        </div>
    )
}