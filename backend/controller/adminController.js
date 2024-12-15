exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (email == 'test@gmail.com' && password == 'test123') {
      return res.status(200).json({ message: 'Login Success' });
    }
    return res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
