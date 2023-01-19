const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database online");
  } catch (err) {
    console.log(err);
    throw new Error("Connection to database failed: ", err);
  }
};

module.exports = {
  dbConnection,
};
