import pool from '../db.js'

class GradeController {
    static async newGrade(req, res) {
        try {
            const {grade_name} = req.body
            const new_grade = await pool.query('INSERT INTO grade (grade_name) VALUES ($1) RETURNING *', [grade_name])
            res.json(new_grade.rows[0])
        } catch (err) {
            console.log(err)
        }
    }
}

export default GradeController