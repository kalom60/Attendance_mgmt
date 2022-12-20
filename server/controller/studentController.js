import pool from '../db.js'

class StudentController {
    static async newStudent(req, res) {
       try {
           const {student_name, student_roll_number} = req.body
           const new_student = await pool.query('INSERT INTO student (student_name, student_roll_number) VALUES ($1, $2) RETURNING *', [student_name, student_roll_number])
           res.json(new_student.rows[0])
       } catch (err) {
           console.log(err)
       }
    }

    static async allStudent(req, res) {
        try {
            const all_student = await pool.query('SELECT * FROM student')
            res.json(all_student.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async singleStudent(req, res) {
        try {
            const {id} = req.params
            const reg = await pool.query('SELECT * FROM student WHERE student_id = $1', [id])
            res.json(reg.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async updateStudent(req, res) {
        try {
            const {id} = req.params
            const {student_name} = req.body
            await pool.query('UPDATE student SET student_name = $1 WHERE student_id = $2', [student_name, id])
            res.json('updated successfully')
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteStudent(req, res) {
        try {
            const {id} = req.params
            await pool.query('DELETE FROM student WHERE student_id = $1', [id])
            res.json('deleted successfully')
        } catch (err) {
            console.log(err)
        }
    }
}

export default StudentController