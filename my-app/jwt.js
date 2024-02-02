const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authroutes');
const app = express();
app.use(bodyParser.json());
app.use('/emp', authRoutes);
const PORT = 4013;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


