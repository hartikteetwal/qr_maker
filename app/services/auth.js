export const LoginService = async (email, password) => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json()
}
export const SignUpService = async (email, password) => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json()
}