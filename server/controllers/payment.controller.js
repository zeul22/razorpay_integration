import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(511).json({
      success: "false",
    });
  }
};

export const verification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );

      res.status(200).json({
        success: true,
        order,
      });
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(511).json({
      success: "false",
    });
  }
};
