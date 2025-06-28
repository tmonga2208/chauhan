/* eslint-disable @typescript-eslint/no-explicit-any */
const createOrderId = async (amount: number) => {
  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount.toString()) * 100,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
};

const handleCheckout = async (
  e: React.FormEvent<HTMLFormElement>,
  amount: number,
  currency: string,
  name: string,
  email: string
) => {
  e.preventDefault();
  try {
    const orderId: string = await createOrderId(amount);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this environment variable is set
      amount: parseFloat(amount.toString()) * 100,
      currency: currency,
      name: 'Your Company Name',
      description: 'Purchase Description',
      order_id: orderId,
      handler: async function (response: any) {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch('/api/verify', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
        const res = await result.json();
        if (res.isOk) alert('Payment succeeded');
        else {
          alert(res.message);
        }
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: '#3399cc',
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on('payment.failed', function (response: any) {
      alert(response.error.description);
    });
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
};

export { handleCheckout };