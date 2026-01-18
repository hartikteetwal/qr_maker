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
export const SignUpService = async (name,email, password) => {
    // console.log('/user/login', email, password);
    const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password }),
    });
    return response.json()
}