import { instance } from "../index.js";

export const checkout = async (req, res) => {
  const options = {
    amount: 5000,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
};
