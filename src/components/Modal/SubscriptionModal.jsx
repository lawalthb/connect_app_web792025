import Modal from '.';
import { TiTick } from 'react-icons/ti';
import { BsStripe } from 'react-icons/bs';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';
import { nombaPay, stripePay } from '../Utils/api';
import { useState } from 'react';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';
import Nomba from '@/Images/Nomba.png';

const SubscriptionModal = ({ show, onClose, data }) => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [isLoadingCreatePaymentMethod, setIsLoadingCreatePaymentMethod] =
    useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const {
    mutate: stripePaymentMutation,
    isPending: isLoaidngStripePayment,
    isSuccess: isStripeSuccess,
    error: stripeError,
    reset: resetStripe,
  } = useMutation({
    mutationFn: stripePay,
    onSuccess: () => {
      setIsLoadingCreatePaymentMethod(false);
      setTimeout(() => {
        resetStripe();
        onClose();
      }, 2000);
    },
    onError: (err) => {
      console.error('Payment failed:', err.message);
      setIsLoadingCreatePaymentMethod(false);
    },
  });

  const {
    mutate: nombaPaymentMutation,
    isPending: isLoaidngNombaPayment,
    error: nombaError,
    reset: resetNomba,
  } = useMutation({
    mutationFn: nombaPay,
    onSuccess: (data) => {
      window.location.href = data.data.checkout_url;
      // resetNomba();
    },
    onError: (err) => {
      console.error('Payment failed:', err.message);
    },
  });

  const paymentOption = [
    {
      id: 1,
      name: 'Stripe',
    },
    {
      id: 2,
      name: 'Nomba',
    },
  ];

  const handlePay = async () => {
    if (selectedPaymentOption === 'Stripe') {
      if (!stripe || !elements) return;
      setIsLoadingCreatePaymentMethod(true);
      const card = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.error(error);
        setIsLoadingCreatePaymentMethod(false);
      } else {
        stripePaymentMutation({
          subscription_id: data.id,
          payment_method_id: paymentMethod.id,
        });
      }
    } else {
      nombaPaymentMutation({
        subscription_id: data.id,
        amount_ngn: '100',
      });
    }
  };

  const handleOption = async (paymentOption) => {
    setSelectedPaymentOption(paymentOption);
  };
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Summary"
      size="max-w-xl"
      showFilterIcon={true}
    >
      <div className="text-base leading-6 font-semibold text-gray-600 bg-[#A2003017] py-5 px-3 my-10 rounded-lg shadow-lg">
        <div className="flex items-center justify-between w-full">
          <h3 className="w-1/2">Subscription Package :</h3>
          <p>{data?.name}</p>
        </div>
        <div className="flex items-center justify-between mt-5">
          <h3>Fee :</h3>
          <p className="font-bold text-[#A20030]">${data?.price}</p>
        </div>
      </div>
      <div className="space-y-5  mb-10">
        {paymentOption.map((option, index) => {
          const icon =
            option.name === 'Stripe' ? (
              <BsStripe className="text-blue-600 size-7" />
            ) : (
              <img src={Nomba.src} alt="Nomba" />
            );
          return (
            <div
              key={option.id}
              onClick={() => handleOption(option.name)}
              className={`group cursor-pointer border ${
                selectedPaymentOption === option.name
                  ? 'border-[#A20030] text-[#A20030] shadow-md shadow-[#A2003055]'
                  : 'border-gray-200 text-gray-600'
              }  text-sm   
          hover:border-[#A20030] hover:text-[#A20030] 
          hover:shadow-md hover:shadow-[#A2003055]
          transition-all duration-300 
          p-5 rounded-lg w-[80%] mx-auto flex gap-4 items-center`}
            >
              <div
                className={`flex items-center justify-center rounded-full size-7 transition-colors duration-300
      ${selectedPaymentOption === option.name ? 'bg-[#A20030]' : 'bg-gray-200 group-hover:bg-[#A20030]'}`}
              >
                <TiTick className="text-white size-5" />
              </div>
              <p className="font-normal mt-1">Pay With</p>
              {icon}
              <h3 className="font-bold mt-1">{option.name}</h3>
            </div>
          );
        })}
      </div>
      {selectedPaymentOption === 'Stripe' && (
        <div className="flex flex-col gap-y-1.5 w-full">
          <label className="text-sm font-medium text-gray-700">
            Card Details
          </label>
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1a1a1a',
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
                  fontSmoothing: 'antialiased',
                  backgroundColor: '#ffffff',
                  '::placeholder': {
                    color: '#cbd5e1',
                  },
                  padding: '12px',
                },
                invalid: {
                  color: '#e53e3e',
                  iconColor: '#e53e3e',
                },
                complete: {
                  color: '#4B5563',
                },
              },
            }}
            className="border border-blue-500 rounded-lg p-3 shadow-sm w-full transition duration-200 focus-within:ring-2 focus-within:ring-[#A20030]"
          />
        </div>
      )}
      <Button
        label={'Proceed'}
        btnclass="w-full h-14 mt-7"
        onClick={handlePay}
        isLoading={
          isLoaidngStripePayment ||
          isLoadingCreatePaymentMethod ||
          isLoaidngNombaPayment
        }
      />
      <ErrorMsg errorMessage={stripeError?.message || nombaError?.message} />
      {isStripeSuccess && (
        <SuccessMsg successMessage={`${data.name} subscribed successfully`} />
      )}
    </Modal>
  );
};

export default SubscriptionModal;
