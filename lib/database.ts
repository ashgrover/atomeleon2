

export function getInstallationId(): null | string {
    return localStorage.getItem("installationId");
}

export function saveInstallationId(installationId: string) {
    localStorage.setItem("installationId", installationId)
}