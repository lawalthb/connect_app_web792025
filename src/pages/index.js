import ConnectingPeople from '@/components/HomePage/ConnectingPeople';
import DownLoadApp from '@/components/HomePage/DownLoadApp';
import Features from '@/components/HomePage/Features';
import Footer from '@/components/HomePage/Footer';
import GetConnected from '@/components/HomePage/GetConnected';
import HowConnectAppWorks from '@/components/HomePage/HowConnectAppWorks';
import SocialVibeMatch from '@/components/HomePage/SocialVibeMatch';
import NavBar from '@/components/Layout/NavBar';
import Image from 'next/image';
// import { Geist, Geist_Mono } from 'next/font/google';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export default function Home() {
  return (
    <div>
      <header className="shadow-sm my-5">
        <NavBar />
      </header>
      <main>
        <SocialVibeMatch />
        <section className="h-full py-16 md:py-32 px-5 md:px-24">
          <ConnectingPeople />
          <GetConnected />
          <HowConnectAppWorks />
          <Features />
        </section>
        <DownLoadApp />
      </main>
      <footer className="bg-black h-[600px]">
        <Footer />
      </footer>
    </div>
  );
}
