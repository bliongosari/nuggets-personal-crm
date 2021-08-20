const mongoose = require("mongoose");

exports.establishDB = () => {
  mongoose
    .connect(process.env.DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
