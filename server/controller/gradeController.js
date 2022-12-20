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

    static async allGrade(req, res) {
        try {
            const all_grade = await pool.query('SELECT * FROM grade')
            res.json(all_grade.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async singleGrade(req, res) {
        try {
            const {id} = req.params
            const reg = await pool.query('SELECT * FROM grade WHERE grade_id = $1', [id])
            res.json(reg.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async updateGrade(req, res) {
        try {
            const {id} = req.params
            const {grade_name} = req.body
            await pool.query('UPDATE grade SET grade_name = $1 WHERE grade_id = $2', [grade_name, id])
            res.json('updated successfully')
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteGrade(req, res) {
        try {
            const {id} = req.params
            await pool.query('DELETE FROM grade WHERE grade_id = $1', [id])
            res.json('deleted succesfully')
        } catch (err) {
            console.log(err)
        }
    }
}

export default GradeController