export const handleData = async (data: Object): Promise<boolean> => {
    const API_URL = `${process.env.REACT_APP_API_URL}:3000`;;
  
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classroom_data: data }), 
      });
  
      const result = await response.text(); 
  
      if (response.ok && result.includes("user logged in successfully")) {
        console.log("Login bem-sucedido!"); 
        return true; 
      } else {
        console.error("Erro no login:", result); 
        return false;
      }
  
    } catch (err) {
      console.error("Erro na conexão com a API:", err);
      return false;  
    }
  };
  