import axios from 'axios';
import { useState } from 'react';
import useRazorpay from 'react-razorpay';


export default function Home() {
  const Razorpay = useRazorpay();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [payAmount, setPayAmount] = useState();

  const initiateRazorPayment = async () => {
    if (payAmount !== undefined) {
      try {
        const data = {
          amount: payAmount * 100,
          user: "nikhil123",
          cart: [],
          totalPrice: "50000",
          paymentMethod: 'online',
          name: "Nikhil",
          mobileNo: "9638524512",
          address: "River view colony, bilasppur",
          postalCode: '495001',
        }
        const endpoint = `${process.env.NEXT_PUBLIC_HOST}/api/razorpretransaction`;
        const res = await axios.post(endpoint, { data })
        // console.log("res.data =>", res.data);
        const resdata = res.data.data;
        makePayment(resdata);

      } catch (error) {
        console.log("error ")
      }
    }
  }

  const makePayment = (data) => {
    try {
      // console.log("my", data)

      const options = {
        "key": process.env.RAZOR_KEY_Id, // Enter the Key ID generated from the Dashboard
        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "GRIP PAYMENT", //your business name
        "description": "Test Transaction",
        "image": "/logo-shop-round.png",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": 'Nikhil', //your customer's name
          "email": 'nkdasar@gmail.com',
          "contact": '9694556321' //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "River view colony"
        },

        handler: async (response) => {
          // console.log("response from handler=>", response)
          try {
            const verifyUrl = `${process.env.NEXT_PUBLIC_HOST}/api/razorverify`;
            const res = await axios.post(verifyUrl, { response, orderID: data.id })
            // console.log(res)
            const resdata = res.data;
            if (resdata.success) {
              setPaymentStatus(true);
            }
          } catch (error) {
            console.log("error")
          }
        },
        options: {
          checkout: {
            method: {
              netbanking: 1,
              card: 1,
              upi: 1,
              wallet: 1
            }
          }
        },

        "theme": {
          "color": "#f9853f"
        }
      };
      // console.log(options)

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      // e.preventDefault()

    } catch (error) {
      console.log("Error OCuured!", error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col justify-start pt-28 items-center px-8">
        <h1 className="text-white text-3xl">Welcome to GRIP Payment Interface</h1>
        <h1 className="text-white text-2xl font-bold py-3">Donate Money </h1>



        <div className='flex w-1/4 flex-col justify-center items-center'>
          <div className='py-2 w-fit'>
            <input type="number" className='py-2 px-3 outline-none rounded-md' placeholder='Enter Amount' value={payAmount} onChange={(e) => { setPayAmount(e.target.value) }} />
          </div>
          <button onClick={() => { initiateRazorPayment() }} className="px-7 w-fit py-2 bg-white font-semibold rounded-md hover:bg-zinc-950 hover:text-white hover:outline-zinc-100">Donate</button>
        </div>
        {paymentStatus &&
          <p className='text-white text-md font-sans py-3'>Payment has been Completed!</p>
        }

        <p className="text-lg text-white gap-4 py-12 font-mono text-wrap">

          {/* Welcome, fellow Jedi, Sith, and enthusiasts to the ultimate destination for all things Star Wars! Whether you are a seasoned veteran of the Force or just beginning your journey, our website is here to be your guide through the vast expanse of the Star Wars galaxy.

          Discover Characters, Planets, and More */}

          {/* Dive into our extensive database of characters, planets, species, starships, and beyond. <br /> From the heroic Jedi Masters to the menacing Sith Lords, from the desert sands of Tatooine to the bustling streets of Coruscant, our comprehensive collection of information will satisfy your thirst for knowledge about the Star Wars universe. */}
          {/* 
          Stay Updated with the Latest News and Insights 

          Keep up-to-date with the latest news, rumors, and insights from a galaxy far, far away. Whether its announcements about upcoming movies, TV series, or exciting developments in Star Wars lore, we have got you covered. <br /> */}

          {/* Engage with the Community <br /> */}

          {/* Join our passionate community of Star Wars fans from around the world. Share your favorite moments, theories, fan art, and more. May the Force be with you as we embark on this journey together. <br />

          Start Your Adventure

          Begin your adventure now by exploring our featured content below or use the search bar to find exactly what you are looking for. The Force is strong with you, young Padawan. <br /> Lets explore the Star Wars galaxy together! */}

          {/* [Featured Content/Image Slideshow]

          [Search Bar]

          [Popular Articles/Recent Updates]

          [Community Engagement Section] */}
        </p>



      </div>
    </>
  );
}
