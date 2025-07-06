import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  const productsData = [
    { link: '#', text: 'Features' },
    { link: '#', text: 'About Us' },
    { link: '#', text: 'Contact Us' },
    { link: '#', text: 'Taken' },
    { link: '#', text: 'Security' },
    { link: '#', text: 'Comparison' },
  ];
  const resourceData = [
    { link: '#', text: 'Whitepaper' },
    { link: '#', text: 'Brand kits' },
    { link: '#', text: 'Compliance' },
    { link: '#', text: 'Privacy Policy' },
    { link: '#', text: 'Terms of service' },
  ];
  const communityData = [
    { link: '#', text: 'Guide' },
    { link: '#', text: 'Blog' },
    { link: '#', text: 'FAQs' },
    { link: '#', text: 'Forum' },
    { link: '#', text: 'Help center' },
    { link: '#', text: 'Support desk' },
  ];

  return (
    <div className="w-full flex flex-col gap-20 pt-16 pb-8 px-4 sm:px-8 lg:px-28 text-[#E2E4E9] bg-[#0B0D0E]">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
        <div className="w-full lg:w-1/3">
          <h3 className="font-black text-xl sm:text-2xl mb-6">ConnectApp</h3>
          <p className="text-sm sm:text-base max-w-md leading-6 text-[#E2E4E9]/90">
            Connect App is a social media app that allows users to connect and
            chat with people around the world daily; based on social preferences
            and at a social distance.
          </p>
        </div>
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <FooterColumn title="Products" data={productsData} />
          <FooterColumn title="Resource" data={resourceData} />
          <FooterColumn title="Community" data={communityData} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-8">
        <p className="text-sm text-center sm:text-left">
          © 2025 ConnectApp. Powered by ConnectApp
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <FaFacebookF className="cursor-pointer hover:text-[#A20030]" />
          <FaTwitter className="cursor-pointer hover:text-[#A20030]" />
          <FaYoutube className="cursor-pointer hover:text-[#A20030]" />
          <FaInstagram className="cursor-pointer hover:text-[#A20030]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
const FooterColumn = ({ title, data }) => (
  <div className="flex flex-col gap-3">
    <h3 className="font-semibold mb-2 text-base">{title}</h3>
    {data.map((item, idx) => (
      <FooterLink key={idx} data={item} />
    ))}
  </div>
);

const FooterLink = ({ data }) => (
  <a
    href={data.link}
    className="text-sm text-[#E2E4E9] hover:text-[#A20030] w-max whitespace-nowrap"
  >
    {data.text}
  </a>
);
