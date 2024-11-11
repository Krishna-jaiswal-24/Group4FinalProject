import app from "./src/app.js";
import connectDb from "./src/utils/db.js";
import 'dotenv/config'

const PORT = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Server failed to start:", error);
  });
