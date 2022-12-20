import bcrypt from 'bcrypt'

class Utils {
    static async hashPassword(pass) {
        try {
            return await bcrypt.hash(pass, 10)
        } catch (err) {
            console.log(err)
        }
    }
}

export default Utils