const mongoose = require("mongoose")

const initializeDBConnection = async () => {  
  try{
    await mongoose.connect("mongodb+srv://gaurav:Gaurav1999@@cluster0.wbcja.mongodb.net/rapify?retryWrites=true&w=majority", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    console.log("Connected Successfully To Database")
  } catch(error){
    console.error("Database Connection Failed...", error)
  } finally{

  }
}

module.exports = { initializeDBConnection }