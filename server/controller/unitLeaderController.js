import pool from '../db.js'
import Utils from "../utils/utils.js";

class UnitLeaderController {
    static async newUL(req, res) {
        try {
            const {unitleader_name, unitleader_address, unitleader_email, unitleader_password} = req.body
            const hashed_password = await Utils.hashPassword(unitleader_password)
            const new_UL = await pool.query('INSERT INTO unitleader (unitleader_name, unitleader_address, unitleader_email, unitleader_password) VALUES ($1, $2, $3, $4) RETURNING *',
                                            [unitleader_name, unitleader_address, unitleader_email, hashed_password]
            )
            res.json(new_UL.rows[0])
        } catch (err) {
            console.log(err)
        }
    }

    static async allUL(req, res) {
        try {
            const all_UL = await pool.query('SELECT * FROM unitleader')
            res.json(all_UL.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async updateUL(req, res) {
        try {
            const {id} = req.params
            if ('unitleader_password' in req.body) {
                req.body.unitleader_password = await Utils.hashPassword(req.body.unitleader_password)
            }
            for (let key in req.body) {
                if (req.body[key].length === 0) continue
                await pool.query(`UPDATE unitleader SET ${key} = $1 WHERE unitleader_id = $2`, [req.body[key], id])
            }
            res.json('updated successfully')
        } catch (err) {
            console.log(err)
        }
    }
}

export default UnitLeaderController