const app = require('./app.js')

require("./config/database").establishDB();

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Backend on port: ${PORT}`))

