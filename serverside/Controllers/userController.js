const User = require('../Models/userSchema');
const _g = require('../Utils/GlobalFunctions');

exports.userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        User.findOne({ $or:[{email},{username}] }).then(async (existUser) => {
            const hashPassword = await _g.passwordEncrypt(password);
            if (!existUser) {
                User.create({ username: username, email: email, password: hashPassword }).then((user) => {
                    res.status(201).json({ Message: "User registered successfully.", user });
                }).catch(() => {
                    res.status(500).json({ Message: "Internal server issues." })
                });
            } else {
                res.status(403).json({ Message: "Email or Username already exist." })
            }
        });

    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const username = email;
        User.findOne({ $or:[{email},{username}] }).then(async (existUser) => {
            if (existUser) {
                const vaildPassword = await _g.passwordDecrypt(existUser.password, password);
                if (vaildPassword) {
                    const token = _g.generateToken(JSON.stringify(existUser));
                    res.status(200).json({ Message: "Login successfully.", user: existUser, token })
                } else {
                    res.status(400).json({ Message: "Entered password is incorrect." });
                }
            } else {
                res.status(404).json({ Message: "User not found." })
            }
        });
    } catch (err) {
        res.status(500).json({ Message: "Internal server issues." })
    }
}
