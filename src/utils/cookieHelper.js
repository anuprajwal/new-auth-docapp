const onLogin = async (payload) => {
  setLoading(true); 
  resetMessages();
  
  console.log("=== [LOGIN START] ===");
  console.log("Selected Role:", role);
  console.log("Payload being sent:", payload);

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, role }),
    });

    console.log("HTTP Response Status:", response.status);
    const data = await response.json();
    console.log("Full Backend JSON Response Data:", data);

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials.');
    }
    
    // DEBUGGING THE BACKEND TOKEN ISSUE
    if (!data.token) {
      console.warn("⚠️ WARNING: 'data.token' is missing or undefined from the backend response!");
      console.log("Check if clientType is 'web': Current clientType is ->", data.clientType);
      
      // If your backend sets the cookie via Set-Cookie headers directly for 'web', 
      // it won't be visible in javascript data.token. Let's check if document.cookie updated:
      console.log("Current document.cookie state:", document.cookie);
    } else {
      console.log("✅ Token received successfully:", data.token.substring(0, 15) + "...");
      
      // Attempting to set cookie
      console.log("Calling setAuthCookie...");
      setAuthCookie('auth_token', data.token, 7);
      
      console.log("Cookies available immediately after setting:", document.cookie);
    }
    
    setSuccess('Login successful! Transporting to secure panel...');

    // Subdomain Redirection Debugging
    console.log("Preparing redirection based on role...");
    setTimeout(() => {
      let targetUrl = '';
      if (role === 'general_user') {
        targetUrl = 'https://users.docapp.co.in';
      } else if (role === 'doctor') {
        targetUrl = 'https://doctors.docapp.co.in';
      } else if (role === 'hospital_admin') {
        targetUrl = 'https://hospitals.docapp.co.in';
      }

      console.log(`🚀 Redirecting now to: ${targetUrl} for role: ${role}`);
      
      // Uncomment this line when you want to execute the redirect. 
      // Keeping it commented out or visible helps you read the logs first!
      window.location.href = targetUrl;
    }, 2000); // Bumped to 2 seconds so you have time to read the console logs

  } catch (err) { 
    console.error("❌ Login Error Caught:", err.message);
    setError(err.message); 
  } finally { 
    console.log("=== [LOGIN END] ===");
    setLoading(false); 
  }
};