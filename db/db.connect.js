const mongoose = require("mongoose")

const initializeDBConnection = async () => {
  console.log(process.env.DATABASE_URL);
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log("Connected Successfully To Database")
  } catch (error) {
    console.error("Database Connection Failed...", error)
  } finally {

  }
}

module.exports = { initializeDBConnection }