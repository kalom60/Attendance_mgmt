import pool from '../db.js'
import sharp from 'sharp'
import Utils from "../utils/utils.js";

const createThumbnail = async (pic) => {
    try {
        await sharp(pic.path)
                .resize(100, 100)
                .toFile('media/uploads/' + pic.filename);
    } catch (err) {
        return err;
    }

    return `http://127.0.0.1:5000/media/uploads/${pic.filename}`;
}

class TeacherController {
    static async newTecher(req, res) {
        try {
            const teacher = req.body;
            teacher.teacher_image = `http://127.0.0.1:5000/${req.file.path}`;
            teacher.thumbnail = await createThumbnail(req.file);

            teacher.teacher_password = Utils.hashPassword(teacher.teacher_password)

            const new_teacher = await pool.query('INSERT INTO teacher (teacher_name, teacher_address, teacher_email, teacher_password, teacher_image, thumbnail, teacher_qualification) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                                                 [teacher.teacher_name, teacher.teacher_address, teacher.teacher_email, teacher.teacher_password, teacher.teacher_image, teacher.thumbnail, teacher.teacher_qualification]
            )
            res.json(new_teacher.rows[0])
        } catch (err) {
            console.log(err)
        }
    }

    static async allTeacher(req, res) {
        try {
            const all_teachers = await pool.query('SELECT * FROM teacher')
            res.json(all_teachers.rows)
        } catch (err) {
            console.log(err)
        }
    }

    static async singleTeacher(req, res) {
        try {
            const {id} = req.params
            const single_teacher = await pool.query('SELECT * FROM teacher WHERE teacher_id = $1', [id])
            res.json(single_teacher.rows)
        }  catch (err) {
            console.log(err)
        }
    }

    static async updateTeacher(req, res) {
        try {
            console.log(req.body)
            console.log(req.file)
            const {id} = req.params
            if ('teacher_pasword' in req.body) {
                req.body.teacher_password = await Utils.hashPassword(req.body.teacher_password)
            }
            if (req.file) {
                req.body.teacher_image = `http://127.0.0.1:5000/${req.file.path}`;
                req.body.thumbnail = await createThumbnail(req.file);
            }

            for (let key in req.body) {
                await pool.query(`UPDATE teacher SET ${key} = $1 WHERE teacher_id = $2`, [req.body[key], id])
            }
            res.json('updated successfully')
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteTeacher(req, res) {
        try {
            const {id} = req.params
            await pool.query('DELETE FROM teacher WHERE teacher_id = $1', [id])
            res.json('deleted successfully')
        } catch (err) {
            console.log(err)
        }
    }
}

export default TeacherController