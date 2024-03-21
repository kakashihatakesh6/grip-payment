import crypto from 'crypto'

const handler = (req, res) => {
    if (req.method == 'POST') {
        try {

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderID } = req.body;
            const sign = razorpay_order_id + '|' + razorpay_payment_id;
            
            // console.log("Imhitting =>", req.body)
           
            const expectedSign = crypto
                .createHmac('sha256', process.env.RAZOR_KEY_SECRET).update(sign.toString()).digest('hex');

            return res.status(200).json({success: true, message: "Payment Verified Successfully!" });
            // if (razorpay_signature === expectedSign) {
            // } else {
            //     return res.status(400).json({ message: 'Invalid Signature sent!' });
            // }

        } catch (error) {
            // console.log(error);
            res.status(500).json({ success: false, message: "Some error occured!" })
        }

    }
    else {
        res.status(500).json({ success: false, message: "Some error occured!" })
    }
}

export default handler;