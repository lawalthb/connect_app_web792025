import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/HomePage/Footer';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

const TermsOfService = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0D0E]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <NavBar />
      </header>

      {/* Main Content */}
      <div className="text-[#E2E4E9] px-4 py-12 sm:px-8 lg:px-48">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-[#A20030] hover:text-[#A20030]/80 transition-colors duration-200"
          >
            <IoIosArrowBack className="text-lg" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-[#A20030]">
          CONNECT TERMS OF SERVICE
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-sm text-[#E2E4E9]/80 mb-6">
              Last Updated: September 09, 2025
            </p>
            
            <div className="space-y-6 leading-relaxed">
              <p>
                These terms of service set forth the general terms of service of your use of the Website, the App and our Services and are in addition to (not in lieu of) any other terms of use posted on https://www.connectinc.app, in connection with the App, and linked from our Terms of service page at https://connectinc.app/terms, which together constitute the entire Agreement (the &quot;Agreement&quot;) between us and you (&quot;you&quot;). By accessing or using the Service, you (together with all persons accessing or using the Service, collectively, the &quot;Users&quot;) signify that you have read, understand and agree to be bound by this Agreement in all respects with respect to the Website, the App, our provision of the Service, and your use of them.
              </p>
              
              <p>
                Our website (www.connectinc.app) and related websites owned by us (collectively, the &quot;Website&quot;) and our mobile Application (the &quot;App&quot;) (collectively the &quot;Platform&quot;) and the services offered therefrom (collectively, the &quot;Service&quot;) are operated by Connect Incorporated and its corporate affiliates (collectively, &quot;us&quot;, &quot;we&quot; or the &quot;Connect Corporations&quot;).
              </p>
              
              <p className="font-semibold text-[#A20030]">
                YOU MAY NOT USE THE SERVICES IF YOU ARE UNDER THE AGE OF MAJORITY IN THE JURISDICTION IN WHICH YOU ARE RESIDENT (I.E., IF YOU ARE A MINOR).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Registration</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                In consideration of your use of the Service, you agree to: (a) provide us with accurate, current and complete information about you as may be prompted by any registration forms on the Service (&quot;Registration Data&quot;); and (b) maintain and promptly update the Registration Data, and any other information you provide to us, to keep it accurate, current and complete.
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Users must provide accurate, current, and complete information when creating a User Account</li>
                <li>You must be at least 13 years old (or the age of majority in your jurisdiction) to register</li>
                <li>Users are responsible for maintaining the confidentiality of their login credentials and all activity under their account</li>
                <li>Connect reserves the right to reject, suspend, or terminate registrations at its discretion</li>
              </ul>
              
              <p className="leading-relaxed">
                You may register on behalf of a corporate entity; however you acknowledge and agree that by providing Registration Data in such a capacity, you signify that you are authorized to enter into this Agreement on behalf of, bind the entity to, these terms and register for the Service and the App.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Services</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                Connect is a social media app that connects people (&quot;Users&quot;) to other Users, businesses (&quot;Businesses&quot;), activities, jobs, etc. based on similar interests.
              </p>
              
              <p className="leading-relaxed">
                When interacting with other Users and Businesses, you should exercise due diligence, caution and common sense to protect your personal safety and property.
              </p>
              
              <p className="leading-relaxed">
                We are not responsible for products and services offered by other Users or Businesses, nor do we have control over the quality, timing, provision or failure to provide, or any aspect whatsoever relating to such products and services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Advertising</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Connect App provides an internal Advertising Platform which allows Users and Businesses to create and run ads</li>
              <li>Advertisers may target audiences based on age, location, interests, and social circles</li>
              <li>Advertisers can set campaign budgets, duration, and scheduling</li>
              <li>All ads are subject to review and approval by Connect before they appear</li>
              <li>Prohibited content (illegal, discriminatory, misleading, harmful, obscene, or infringing material) will be removed without refund</li>
              <li>Connect reserves the right to suspend ad accounts that breach these terms</li>
              <li>Ad performance data, including impressions and engagement, will be made available to advertisers, but Connect does not guarantee any specific results</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Live Streaming</h2>
            <p className="mb-4 leading-relaxed">Connect App provides a Live Streaming service with the following terms:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Only administrators or authorized accounts may host livestreams of major or popular events</li>
              <li>Users may be charged a fee to access livestreams, with fees and payment obligations clearly displayed before entry. Connect reserves the right to set and adjust such fees</li>
              <li>Livestream access fees are non-refundable unless otherwise determined by Connect</li>
              <li>Unauthorized rebroadcasting, recording, or distribution of livestream content is strictly prohibited</li>
              <li>Connect reserves the right to suspend or terminate access to livestreams that violate intellectual property rights, community standards, or applicable laws</li>
              <li>Technical issues, interruptions, or downtime may occur, and Connect shall not be held liable for such disruptions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Prices and Payments</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                The Service may charge for additional features, and prices will be set by us from time to time and are subject to change at our discretion. Businesses may list services or goods for purchase, and Users may transact with businesses through the Service, but we do not warranty the fitness, quality, safety, or usability of any product or service sold or otherwise provided by a User or Business on the Service or otherwise.
              </p>
              
              <p className="font-semibold">Payments are non-refundable, unless otherwise determined in our sole discretion.</p>
              
              <p className="leading-relaxed">
                Users are required to provide their credit card or bank account details to us when making a purchase. By doing so, you authorize us to provide this information to the third party payment processor (the &quot;Payment Processor&quot;) we retain.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Prohibited Activities</h2>
            <p className="mb-4 leading-relaxed">While using the Service, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Recruit or otherwise solicit any User or Business to join third-party services or websites that are competitive to Connect</li>
              <li>Use the Service to &quot;stalk&quot;, harass, threaten, intimidate, harm, cause a nuisance to, annoy, or inconvenience any other User</li>
              <li>Submit a Request that you do not intend to have completed or that you do not intend to pay for</li>
              <li>Request, offer, negotiate, or complete any portion of a Service that would violate any applicable law</li>
              <li>Engage in pornographic or obscene services including sexual and escort services</li>
              <li>Participate in any form of spam or unauthorized solicitation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Content and Intellectual Property</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                &quot;Content&quot; means all materials and content of any type, including, but not limited to, ratings, photos, graphics, images, designs, profiles, messages, information, notes, text, music, sound, video, articles, and software.
              </p>
              
              <h3 className="text-lg font-medium text-[#E2E4E9]">User Content and Your License to Us</h3>
              <p className="leading-relaxed">
                The Service permits you to submit, transmit, copy, make available and distribute Content (collectively, your &quot;User Content&quot;), and we do not claim ownership over any User Content. By providing any Content, you grant the Connect Corporations the worldwide, royalty-free, non-exclusive right and license to use, distribute, reproduce, modify, adapt, perform and display such User Content as permitted by the functionality of the Service.
              </p>
              
              <p className="leading-relaxed">
                You represent and warrant to us that you have all right, title and interest to grant the User License, and that the User Content does not infringe on any other person&apos;s copyright, trademark, proprietary interests, trade secrets, privacy or other intellectual property rights.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Dispute Resolution</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                You can use the Service to get connected to Users and Businesses. We are not involved in the actual contact between Users or in the provision of goods and services and you are solely responsible for your interactions with other Users including Business.
              </p>
              
              <p className="leading-relaxed">
                If you have a dispute with one or more Users, you release the Connect Corporations (and our officers, directors, agents, investors, subsidiaries, and employees) from any and all claims, demands, or damages of every kind and nature arising out of or in any way connected with such disputes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Litigation</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                You hereby agree and acknowledge that you may only resolve disputes with us on an individual basis, and may not bring a claim as a plaintiff or a class member in a class, purported class, consolidated, or representative action.
              </p>
              
              <p className="leading-relaxed">
                You hereby agree that any claim under this Agreement must be brought within one year of the act giving rise to the claim.
              </p>
              
              <p className="leading-relaxed">
                You agree to indemnify and hold the Connect Corporations and each of their directors, officers, agents, contractors, partners and employees, harmless from and against any loss, liability, claim, demand, damages, costs and expenses, including reasonable attorney's fees, arising out of or in connection with your use of the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">General Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">No Agency</h3>
                <p className="leading-relaxed">
                  You hereby acknowledge and agree that no employment, joint venture, partnership, or agency relationship exists between you and any of the Connect Corporations as a result of this Agreement or your use of our Services.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">Privacy</h3>
                <p className="leading-relaxed">
                  You can view our privacy policy at <a href="https://connectinc.ca/privacy" className="text-[#A20030] hover:underline">https://connectinc.ca/privacy</a>, the terms of which are incorporated herein.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">Governing Law</h3>
                <p className="leading-relaxed">
                  You agree that the laws of the Province of British Columbia, Canada, without regard to principles of conflict of laws, will govern this Agreement and any dispute of any sort that might arise between you and us.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">Entire Agreement</h3>
                <p className="leading-relaxed">
                  This Agreement constitutes the entire agreement between you and us regarding the use of the Service, superseding any prior agreements between you and us relating to your use of the Site or the Service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Disclaimer</h2>
            <div className="bg-[#A20030]/10 p-4 rounded-lg">
              <p className="font-semibold text-[#A20030] mb-2">
                NEITHER THE CONNECT CORPORATIONS NOR OUR AFFILIATES OR LICENSORS ARE RESPONSIBLE FOR THE CONDUCT, WHETHER ONLINE OR OFFLINE, OF ANY USER OF THE SERVICE AND YOU HEREBY RELEASE THE CONNECT CORPORATIONS AND OUR AFFILIATES OR LICENSORS FROM ANY LIABILITY RELATED THERETO, WHETHER DIRECT OR INDIRECT.
              </p>
              <p className="font-semibold text-[#A20030]">
                THE CONNECT CORPORATIONS AND OUR AFFILIATES AND LICENSORS WILL NOT BE LIABLE FOR ANY CLAIM, INJURY, OR DAMAGE ARISING IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to change, modify, add, or delete portions of this Agreement in our sole discretion from time to time without further notice. If we do this, we will post the latest version of this Agreement on this page at <a href="https://connectinc.ca/terms_and_conditions" className="text-[#A20030] hover:underline">https://connectinc.ca/terms_and_conditions</a>, and we will indicate at the bottom of such page the date of the last revision or modification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">Language</h2>
            <p className="leading-relaxed">
              The parties have requested and agree that this Agreement and all documents relating thereto be drawn up in English. Les parties ont demandé que cette convention ainsi que tous les documents qui s'y rattachent soient rédigés en anglais.
            </p>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-black mt-12">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default TermsOfService;