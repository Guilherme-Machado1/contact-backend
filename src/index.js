const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const homeRoutes = require('./routes/homeRoutes');
const contactRoutes = require('./routes/contactRoutes');

mongoose.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => {
    console.log('Tamo conectado Doidão');
    app.listen(process.env.PORT, () => {
      console.log();
      console.log(`Escutando na ${process.env.PORT}`);
      console.log(`Acessar http://localhost:${process.env.PORT}`);
    });
  })
  .catch((e) => console.log(e));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', homeRoutes);
app.use('/contact', contactRoutes);
module.exports = app;
