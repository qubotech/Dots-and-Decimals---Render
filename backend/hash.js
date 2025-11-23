import bcrypt from "bcrypt";

// Your new password
const password = "*Dots&decim@ls*info2#0#2#4";

const hashPassword = async () => {
    try {
        const hash = await bcrypt.hash(password, 10); // 10 salt rounds
        console.log("Hashed password:", hash);
    } catch (err) {
        console.error(err);
    }
};

hashPassword();
