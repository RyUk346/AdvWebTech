import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
});

const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
});

const PaymentMethodForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(''); // Initialize with an empty string
  const [mobileNumber, setMobileNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPaymentAmount(''); // Reset payment amount when changing payment method
    setMobileNumber('');
    setBankName('');
    setCardNumber('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedOption) {
      console.log('Please select a payment method.');
      return;
    }
    if (!paymentAmount || isNaN(parseFloat(paymentAmount))) {
      console.log('Please enter a valid payment amount.');
      return;
    }
    const paymentDetails =
      selectedOption === 'mobileBanking'
        ? `Mobile Number: ${mobileNumber}`
        : `Bank Name: ${bankName}, Card Number: ${cardNumber}`;
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + '/makePayment',
        {
          paymentAmount: parseFloat(paymentAmount), // Send paymentAmount to the backend
          paymentMethod: selectedOption,
          mobileNumber: mobileNumber,
          bankName: bankName,
          cardNumber: cardNumber,
        }
      );

      if (response.data && response.data.message) {
        console.log('Payment response:', response.data.message);
        alert(response.data.message);
        // Perform any necessary actions after successful payment
      } else {
        console.error('Failed to process payment.');
      }
    } catch (error) {
      console.error('Error from API:', error);
    }
  };

  return (
    <><Title page="Payment"/>
    
    <Layout className="flex items-center justify-center h-screen">
      
    <div class="flex flex-wrap justify-center">
      <div class="w-80">
      
      
      
        <h1 className="font-mono text-2xl">Choose a Payment Method</h1><br/>
        <form onSubmit={handleSubmit}>
          <center>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="mobileBanking"
                checked={selectedOption === 'mobileBanking'}
                onChange={handleOptionChange}
                
              />
              Mobile Banking
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bankingCard"
                checked={selectedOption === 'bankingCard'}
                onChange={handleOptionChange}
              />
              Banking Card
            </label>
          </div><br/>
          {selectedOption === 'mobileBanking' && (
            <div>
              <select name="method" id="payment" >
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nogod">Nogod</option>
              </select>
              <br />
              <br />
              <label>
                Mobile Number:
                <input
                  type="text"
                  class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </label>
              </div>
            
             )}
             {selectedOption === 'bankingCard' && (
  <div>
    <label>Bank name:</label>
    <input
      type="text"
      name="bankName"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
    />
    <br />
    
    <label>Card Number:</label>
    <input
      type="text"
      name="cardNumber"
      class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={cardNumber}
      onChange={(e) => setCardNumber(e.target.value)}
    /><br />
  </div>
)}
          <div>
            <label>
              Payment Amount:
              <input
                type="number"
                name="paymentAmount"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button
            type="submit"
            className="border border-red-500 p-2 text-red-500 btn-outline w-30 rounded-full hover:bg-green-300 hover:text-white w-20"
          >
            Pay
          </button>
          </center>
        </form>
      
    </div>
    
    </div>
    </Layout>
    
</>
  );
};

export default PaymentMethodForm;
