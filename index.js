const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

const bodyParser = require('body-parser');
const loginRouter = require('./login');
const userRouter = require('./userModel')
const editUserRouter = require('./editUser');
const deleteUserRouter = require('./deleteUser');
const changepasswordUserRouter = require('./changepassword');
const departmentRouter = require('./getdepartment');
const positionRouter = require('./getposition');

app.use(cors());
app.use(bodyParser.json());
app.use(loginRouter);
app.use(userRouter);
app.use(editUserRouter);
app.use(deleteUserRouter);
app.use(changepasswordUserRouter);
app.use(departmentRouter);
app.use(positionRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
