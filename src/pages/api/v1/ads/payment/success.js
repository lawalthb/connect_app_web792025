export async function getServerSideProps(context) {
  const { payment_id, ad_id } = context.query;

  return {
    redirect: {
      destination: '/advertising?success=true',
      permanent: false,
    },
  };
}

export default function PaymentSuccessRedirectPage() {
  return null;
}
