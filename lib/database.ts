

export function getInstallationId(): null | string {
    return localStorage.getItem("installationId");
}

export function saveInstallationId(installationId: string) {
    localStorage.setItem("installationId", installationId)
}

export function getRepo() {
    return localStorage.getItem("repo");
}
export function saveRepo(repo) {
    localStorage.setItem("repo", JSON.stringify(repo))
}