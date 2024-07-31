import express from 'express'
import {saveSentEmails, getEmails ,moveEmailsToBin,toggleStarredEmails,deleteEmails} from '../controller/email-controller.js'
import { registerMail } from '../controller/mailer.js';
import {register} from '../controller/user.controller.js'
import {sigin} from '../controller/user.controller.js'

const routes = express.Router();

routes.post('/save' , saveSentEmails)
routes.post('/register' , register)
routes.post('/sigin' , sigin )
routes.get('/emails/:type',getEmails)
routes.post('/save-draft',saveSentEmails)
routes.post('/bin',moveEmailsToBin)
routes.post('/starred', toggleStarredEmails)
routes.delete('/delete', deleteEmails)

routes.post('/sendmail' , registerMail)



export default routes ;