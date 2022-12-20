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

    static async allReg(req, res) {
        try {
            const all_reg = await pool.query('SELECT * FROM registrar')
            res.json(all_reg.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async updateReg(req, res) {
        try {
            const {id} = req.params
            if ('registrar_password' in req.body) {
                req.body.registrar_password = await Utils.hashPassword(req.body.registrar_password)
            }
            for (let key in req.body) {
                if (req.body[key].length === 0) continue
                await pool.query(`UPDATE registrar SET ${key} = $1 WHERE registrar_id = $2`, [req.body[key], id])
            }
            res.json('updated successfully')
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteReg(req, res) {
        try {
            const {id} = req.params
            await pool.query('DELETE FROM registrar WHERE registrar_id = $1', [id])
            res.json('deleted successfully')
        } catch (err) {
            console.log(err)
        }
    }
}

export default RegistrarController