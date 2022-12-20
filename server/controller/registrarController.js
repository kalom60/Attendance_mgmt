import pool from '../db.js'
import Utils from "../utils/utils.js";

class RegistrarController {
    static async newReg(req, res) {
        try {
            const {registrar_name, registrar_address, registrar_email, registrar_password} = req.body
            const hashedPassword = await Utils.hashPassword(registrar_password)
            const new_reg = await pool.query('INSERT INTO registrar (registrar_name, registrar_address, registrar_email, registrar_password) VALUES ($1, $2, $3, $4) RETURNING *',
                                             [registrar_name, registrar_address, registrar_email, hashedPassword])
            res.json(new_reg.rows[0])
        } catch (err) {
            console.log(err)
        }
    }
}

export default RegistrarController