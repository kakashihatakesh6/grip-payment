import Razorpay from "razorpay";

const handler = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const { amount } = req.body.data;
      // console.log("req body =>", req.body)
      const instance = new Razorpay({
        key_id: process.env.RAZOR_KEY_Id,
        key_secret: process.env.RAZOR_KEY_SECRET,
      });

      const randomOrderId = parseInt(Math.random() * Date.now());
      // console.log("randomOrderId =>", randomOrderId)
      const options = {
        amount: amount,
        currency: "INR",
        receipt: 'order_123',
      };

      instance.orders.create(options, async (error, order) => {
        if (error) {
          // console.log(error);
          return res.status(500).json({ success: false, message: "Something went wrong!" })
        }
        // console.log("PreOrder Details =>", order);
       

        return res.status(200).json({ success: true, data: order })
      })


    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Some error occured!" })
    }

  }
  else {
    return res.status(500).json({ success: false, message: "Iternal Server Error!" })
  }
}

export default handler;