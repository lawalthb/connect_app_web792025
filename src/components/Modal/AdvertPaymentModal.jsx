import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { adPayment } from '../Utils/api';
import Modal from '.';
import { TiTick } from 'react-icons/ti';
import { BsStripe } from 'react-icons/bs';
import Nomba from '@/Images/Nomba.png';
import Button from '../Button';
import ErrorMsg from '../ErrorMsg';
import SuccessMsg from '../SuccessMsg';

const AdvertPaymentModal = ({ advertId, onClose, budget }) => {
  const route = useRouter();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const {
    mutate: adPayments,
    isPending: isLoaidngPayment,
    error: adError,
  } = useMutation({
    mutationFn: adPayment,
    onSuccess: (data) => {
      route.push(data.data.payment_link);
    },
    onError: (err) => {
      console.error('Payment Initialization failed:', err.message);
    },
  });

  //   const {
  //     mutate: nombaPaymentMutation,
  //     isPending: isLoaidngNombaPayment,
  //     error: nombaError,
  //     reset: resetNomba,
  //   } = useMutation({
  //     mutationFn: nombaPay,
  //     onSuccess: (data) => {
  //       window.location.href = data.data.checkout_url;
  //       // resetNomba();
  //     },
  //     onError: (err) => {
  //       console.error('Payment failed:', err.message);
  //     },
  //   });

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
      adPayments({
        id: advertId,
        payment_gateway: 'stripe',
        currency: 'USD',
      });
    } else {
      adPayments({
        id: advertId,
        payment_gateway: 'nomba',
        currency: 'NGN',
      });
    }
  };

  const handleOption = async (paymentOption) => {
    setSelectedPaymentOption(paymentOption);
  };
  return (
    <Modal
      isOpen={advertId}
      onClose={onClose}
      title="Summary"
      size="max-w-xl"
      showFilterIcon={true}
    >
      <div className="text-base text-center leading-6 font-semibold text-gray-600 bg-[#A2003017] py-5 px-3 my-10 rounded-lg shadow-lg">
        <h3>Amount</h3>
        <div className=" mt-1">
          <p className="font-bold text-[#A20030] text-3xl">${budget}</p>
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
      <Button
        label={'Proceed'}
        btnclass="w-full h-14 mt-7"
        onClick={handlePay}
        isLoading={isLoaidngPayment}
      />
      <ErrorMsg errorMessage={adError?.message} />
      {/* {isStripeSuccess && (
        <SuccessMsg successMessage={`Advert paid successfully`} />
      )} */}
    </Modal>
  );
};

export default AdvertPaymentModal;
