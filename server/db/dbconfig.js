import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.DB_URL}`);
    console.log(
      `Database connected with connection ID: ${instance.connection.host}`
    );
  } catch (error) {
    console.log(`Connection to database failed!`);
    process.exit();
  }
};
