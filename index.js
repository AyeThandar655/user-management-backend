const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3002;

const bodyParser = require('body-parser');
const loginRouter = require('./login');
const userRouter = require('./getuser')
const roleRouter = require('./getrole');
const roleAccessPointRouter = require('./getaccesspointbyrole');
const departmentAccessPointRouter = require('./getaccesspointbydepartment');
const editUserRouter = require('./edituser');
const deleteUserRouter = require('./deleteuser');
const changepasswordUserRouter = require('./changepassword');
const departmentRouter = require('./getdepartment');
const checkEmailRouter = require('./checkemail');
const resetPasswordRouter = require('./resetpassword');
const createRoleRouter = require('./createrole');
const editRoleRouter = require('./editrole');
const deleteRoleRouter = require('./deleterole');
const createUserRouter = require('./createuser');
const updateUserProfileRouter = require('./updateuserprofile');

app.use(cors());
app.use(bodyParser.json());
app.use(loginRouter);
app.use(userRouter);
app.use(roleRouter);
app.use(roleAccessPointRouter);
app.use(departmentAccessPointRouter);
app.use(editUserRouter);
app.use(deleteUserRouter);
app.use(changepasswordUserRouter);
app.use(departmentRouter);
app.use(checkEmailRouter);
app.use(resetPasswordRouter);
app.use(createRoleRouter);
app.use(editRoleRouter);
app.use(deleteRoleRouter);
app.use(createUserRouter);
app.use(updateUserProfileRouter);

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
