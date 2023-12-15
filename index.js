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

app.use(cors());
app.use(bodyParser.json());
app.use(loginRouter);
app.use(userRouter);
app.use(editUserRouter);
app.use(deleteUserRouter);
app.use(changepasswordUserRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
