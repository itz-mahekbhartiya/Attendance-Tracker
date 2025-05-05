const jwt = require('jsonwebtoken');

const {Employee} = require('../Model/Employee');
const {Admin} = require('../Model/Admin');

async function loginEmployee(req, res) {
    const { EmpId, Password } = req.body;
    console.log(EmpId, Password);
    try {
        const user = await Employee.findOne({ EmpId });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.Password !== Password) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const cookies = res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        });
        console.log("Cookies :",cookies);
        return res.status(200).json({ success: true, user_id: user._id, message: 'Logged in successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error: error.message });
    }
}

async function loginAdmin(req, res) {
    const { EmpId, Password } = req.body;
    console.log(req.body);
    try {
        const user = await Admin.findOne({ EmpId });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (user.Password !== Password) return res.status(400).json({ message: 'Invalid password' });

        // Create JWT token with user ID
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookies
        const cokkies = res.cookie('token', token, {
            httpOnly: false,
            secure: false, // Set to true only in production
            sameSite: 'lax', // Allow cookies on cross-origin
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.status(200).json({ success: true, user_id: user._id, message: 'Logged in successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error: error.message });
    }
}

module.exports = {
    loginEmployee,
    loginAdmin,
};
