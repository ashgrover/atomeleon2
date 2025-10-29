
export async function POST(request: Request) {
    const { userCode } = await request.json();

    const clientId = "Iv23linNrsFe7b8xf4lJ";
    const clientSecret = process.env.GITHUB_APP_CLIENT_SECRET;
    const postUrl = `https://github.com/login/oauth/access_token`;

    console.log("UserCode", userCode);
    const res = await fetch(postUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: userCode
        })
    });

    let access_token = "";
    try {
        if (!res.ok) return Response.json({ success: true, access_token }, { status: 400 });

        const data = await res.json();
        access_token = data.access_token;
        console.log("DATA", data, "status", res.status, res.ok)
    } catch (err) {
        console.log(err)
        return Response.json({ success: false, access_token: null }, { status: 200 })
    }
    // const { access_token } = await res.json();
    // console.log("User Access Token", access_token)

    return Response.json({ success: true, access_token }, { status: 200 })

}