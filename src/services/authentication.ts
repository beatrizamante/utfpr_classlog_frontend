const API_URL = process.env.REACT_APP_API_URL;

export const handLogin = async (username: string, password: string) : Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/login'`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if(!response.ok) throw new Error('Login Failed');
    const data = await response.json();

    localStorage.setItem('token', data.token)
  } catch (err) {
    console.error('Login error', err)
  }
}

export const fetchUserRole = async (): Promise<string | null> => {
  const token = localStorage.getItem('token');
  if(!token) return null;

  try {
    const response = await fetch(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}`}
    });

    if(!response.ok) throw new Error('Login Failed');
    const data = await response.json();

    return data.role;
  } catch (err) {
    console.error('Error fetchng user role: ' ,err)
    return null
  }

}

