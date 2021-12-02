import "dotenv/config";
import express from "express";
const cors = require('cors')
const registerRouter = require('./routes/registerRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const loginRouter = require('./routes/loginRouter')
const navbarRouter = require('./routes/navbarRouter')
const sectionRouter = require('./routes/sectionRouter')
const dataManagementRouter = require('./routes/dataManagementRouter')

const app = express();

app.use(cors())
app.use(express.json());
app.use('/register', registerRouter);
app.use('/dashboard', dashboardRouter)
app.use('/login', loginRouter)
app.use('/navbar', navbarRouter)
app.use('/section', sectionRouter)
app.use('/dataManagement', dataManagementRouter)

app.listen(process.env.PORT || 4321, ()=>{
  console.log("Server listening on port 4321...")
})
