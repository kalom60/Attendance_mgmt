import pool from '../db.js'
import hashPassword from "../utils/utils.js";

class UnitLeaderController {
    static async newUL(req, res) {
        try {
            const {unitleader_name, unitleader_address, unitleader_email, unitleader_password} = req.body
            const hashed_password = await hashPassword(unitleader_password)
            const new_UL = await pool.query('INSERT INTO unitleader (unitleader_name, unitleader_address, unitleader_email, unitleader_password) VALUES ($1, $2, $3, $4) RETURNING *',
                                            [unitleader_name, unitleader_address, unitleader_email, hashed_password]
            )
            res.json(new_UL.rows[0])
        } catch (err) {
            console.log(err)
        }
    }
}

export default UnitLeaderController