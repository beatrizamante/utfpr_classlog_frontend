export const handLogin = async (username: string, password: string): Promise<boolean> => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();

    localStorage.setItem('token', data.token); 
    return true;  
  } catch (err) {
    console.error('Login error', err);
    return false;  
  }
};
