import bcrypt from 'bcrypt'
import fs from 'fs'

class Utils {
    static async hashPassword(pass) {
        try {
            return await bcrypt.hash(pass, 10)
        } catch (err) {
            console.log(err)
        }
    }

    static removeImage(images) {
        const img1 = images.teacher_image.split('/')[3]
        const img2 = img1.slice(0, 5) + '/uploads/' + img1.slice(6)
        fs.unlinkSync(img1, (err) => {
            if (err) console.log(err)
        })
        fs.unlinkSync(img2, (err) => {
            if (err) console.log(err)
        })
    }
}

export default Utils