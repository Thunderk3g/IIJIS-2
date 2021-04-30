const multer = require('multer');
const express = require('express');
const submissionController = require('../../controllers/submission.controller');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/init', submissionController.init);
router.get('/incomplete/:id', submissionController.incomplete);
router.post('/document', upload.single('file'), submissionController.document);
router.post('/profile', upload.single('file'), submissionController.profile);
router.post('/uploadimage', upload.single('file'), submissionController.uploadimage);
router.put('/update', submissionController.update);
router.post('/confirm', submissionController.confirm);
router.get('/list/:id/:offset', submissionController.getsubmissionsbyid);
router.get('/listall/:id', submissionController.getlist);
router.get('/file/:id', submissionController.file);
router.get('/allreleases', submissionController.releases);
router.post('/release', upload.single('file'), submissionController.release);
router.get('/current', submissionController.current);
router.get('/getimage/:id', submissionController.getImage);
router.get('/interviewee/:id', submissionController.getIntervieweeImage);
module.exports = router;
