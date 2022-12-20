import express from 'express'
import multer from 'multer'

import StudentController from '../controller/studentController.js'
import GradeController from "../controller/gradeController.js";
import UnitLeaderController from "../controller/unitLeaderController.js";
import RegistrarController from "../controller/registrarController.js";

const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'media/')
    },
    filename: (req, file, next) => {
        next(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, next) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') next(null, true)
    else next(null, false)
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
})

// routes to admin


// routes to registrar
router.post('/registrar', RegistrarController.newReg)
router.get('/registrar', RegistrarController.allReg)
router.put('/registrar/:id', RegistrarController.updateReg)
router.delete('/registrar/:id', RegistrarController.deleteReg)


// routes to teacher


// routes to unitleader
router.post('/unitleader', UnitLeaderController.newUL)
router.get('/unitleader', UnitLeaderController.allUL)
router.put('/unitleader/:id', UnitLeaderController.updateUL)
router.delete('/unitleader/:id', UnitLeaderController.deleteUL)


// routes to grade
router.post('/grade', GradeController.newGrade)
router.get('/grade', GradeController.allGrade)
router.put('/grade/:id', GradeController.updateGrade)
router.delete('/grade/:id', GradeController.deleteGrade)


// routes to student
router.post('/student', StudentController.newStudent)
router.get('/student', StudentController.allStudent)
router.put('/student/:id', StudentController.updateStudent)
router.delete('/student/:id', StudentController.deleteStudent)


// routes to attendance


export default router