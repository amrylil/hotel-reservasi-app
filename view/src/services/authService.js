const handleLogin = async () => {
  setIsLoading(true);
  setError('');

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Simpan token ke localStorage
    localStorage.setItem('token', data.data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.data.user));

    // Opsional: Redirect ke halaman home / dashboard
    window.location.href = '/';
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
