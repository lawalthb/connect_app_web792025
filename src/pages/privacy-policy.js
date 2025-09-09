import React from 'react';
import NavBar from '@/components/Layout/NavBar';
import Footer from '@/components/HomePage/Footer';
import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-sm text-[#E2E4E9]/80 mb-6">
              Last Updated: September 09, 2025
            </p>

            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              Introduction
            </h2>
            <p className="mb-4 leading-relaxed">
              Welcome to Connect App by Connect Incorporated. (&quot;Connect&quot;, &quot;we&quot;,
              &quot;our&quot;, &quot;us&quot;). We are a global social networking platform
              headquartered in Canada. Your privacy is central to our mission of
              helping people connect and share. This Privacy Policy explains how
              we collect, use, share, and protect your personal information when
              you use our services.
            </p>

            <p className="mb-4 leading-relaxed">This policy applies to:</p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>
                The Connect mobile app, website, APIs, and other online services
                such as live streaming coordinated by Connect admin and
                advertising only approved after review to ensure no violation of
                terms and conditions
              </li>
              <li>All registered users aged 13 and over, worldwide</li>
              <li>
                Any interaction you have with our services, whether as a
                registered member or visitor
              </li>
            </ul>

            <p className="mb-4 leading-relaxed">
              We comply with the Personal Information Protection and Electronic
              Documents Act (PIPEDA) and apply its privacy protections globally.
              By using our services, you consent to the practices described in
              this Privacy Policy. If you do not agree, please stop using our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              1. Who We Are & Scope
            </h2>
            <p className="mb-4 leading-relaxed">
              Connect enables people to share content, discover connections, and
              engage in online communities through social circles, live
              streaming and advertising on the Connect App Platform.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
              <li>
                <strong>Global reach:</strong> We welcome users from around the
                world
              </li>
              <li>
                <strong>Canadian HQ:</strong> Our head office is in Canada,
                which means PIPEDA applies to all our operations
              </li>
              <li>
                <strong>Amazon Web Server (AWS) hosting:</strong> Region: US
                East (Ohio) - We store user data on secure servers in the United
                States chosen for their strong privacy and security protections
              </li>
            </ul>
            <p className="leading-relaxed">
              This policy covers all personal data we collect through
              registration, platform use, communications, and related services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              2. Information We Collect
            </h2>
            <p className="mb-4 leading-relaxed">
              We collect the following categories of information:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  A. Identity & Profile Information
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Full name – for account creation and visibility to other
                    users where permitted
                  </li>
                  <li>
                    Date of birth – to verify age eligibility and enable
                    age-appropriate features
                  </li>
                  <li>Gender – for personalization and demographic insights</li>
                  <li>
                    Profile picture – for identity representation on the
                    platform
                  </li>
                  <li>
                    Government-issued ID bio information – collected only when
                    necessary for verification (e.g., preventing impersonation
                    or fraud)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  B. Contact Information
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Email address – for account setup, notifications, and
                    password recovery
                  </li>
                  <li>
                    Phone number – for account security (two-factor
                    authentication) and optional contact discovery features
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  C. User-Generated Content
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Posts, comments, likes, messages, photos, and videos you
                    share
                  </li>
                  <li>Associated metadata (timestamps, tags, geotags)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  D. Technical & Location Data
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>IP address and device identifiers</li>
                  <li>Device type, browser type, and operating system</li>
                  <li>
                    Precise or approximate location (if you grant permission)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  E. Analytics & Advertising Data
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Pages visited, features used, engagement time</li>
                  <li>
                    Cookies, pixels, and similar technologies for service
                    improvement and targeted ads
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              3. How We Use Your Information
            </h2>
            <p className="mb-4 leading-relaxed">We use your data to:</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Service Delivery
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Register and manage your account</li>
                  <li>Enable sharing and interaction with others</li>
                  <li>Provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Personalization
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Tailor your feed and recommendations</li>
                  <li>Suggest connections and groups</li>
                  <li>Show relevant ads and sponsored content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Security & Compliance
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Verify your identity and prevent unauthorized access</li>
                  <li>Detect and address spam, abuse, or harmful behaviour</li>
                  <li>Meet legal obligations and enforce terms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Research & Development
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Test and improve features</li>
                  <li>Conduct surveys and analyse user behaviour trends</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Marketing Communications
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Send service updates, offers, and news (with opt-out
                    available)
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4 leading-relaxed">
              We will only process your personal information for the purposes
              you have consented to, or as permitted or required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              4. How We Share Information
            </h2>
            <p className="mb-4 leading-relaxed">We share information with:</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  A. Service Providers
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Hosting providers (AWS Region: US East (Ohio))</li>
                  <li>Analytics platforms (e.g., Google Analytics)</li>
                  <li>Advertising networks and content delivery providers</li>
                  <li>Live streaming third parties</li>
                  <li>Payment platforms (Nomba and Stripe)</li>
                </ul>
                <p className="mt-2 text-sm">
                  All are bound by confidentiality agreements and must protect
                  your information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  B. Other Users
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Information you make public is visible to other users (e.g.,
                    public posts, profile photo, videos and stories)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  C. Legal Authorities
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    When required by law, legal process, or to prevent harm
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  D. Advertising Partners
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    May receive limited data for ad targeting, but we do not
                    sell your personal information
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              5. International Transfers
            </h2>
            <p className="mb-4 leading-relaxed">
              Although our HQ is in Canada, your information may be processed in
              multiple jurisdictions:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Stored in AWS Region: US East (Ohio) servers with high security
                standards
              </li>
              <li>
                Accessed by authorized staff and service providers worldwide
                under PIPEDA&apos;s comparable protection requirement
              </li>
              <li>
                Protected with contractual clauses, encryption, and strict
                access controls
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              6. Data Retention
            </h2>
            <p className="mb-4 leading-relaxed">
              We keep your information only as long as necessary:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Active accounts:</strong> until you close your account
                or withdraw consent
              </li>
              <li>
                <strong>Legal or security needs:</strong> for the period
                required by applicable laws or to resolve disputes
              </li>
              <li>
                <strong>Deletion:</strong> we securely delete or anonymize data
                when no longer needed
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              7. Security Measures
            </h2>
            <p className="mb-4 leading-relaxed">We use multiple safeguards:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Encryption:</strong> TLS in transit, AES-256 at rest
              </li>
              <li>
                <strong>Access control:</strong> Limited to authorized personnel
              </li>
              <li>
                <strong>Monitoring:</strong> Regular security audits and
                penetration testing
              </li>
              <li>
                <strong>Incident response:</strong> Immediate action and
                notifications in case of a breach, as required by PIPEDA
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              8. Your Rights (PIPEDA)
            </h2>
            <p className="mb-4 leading-relaxed">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data and get details about its use</li>
              <li>Correct inaccurate information</li>
              <li>Withdraw consent for future processing</li>
              <li>Request deletion of your data where feasible</li>
              <li>
                Complain about inappropriate posts by others directly on the
                Connect App
              </li>
              <li>
                File a complaint with our Privacy Officer or the Office of the
                Privacy Commissioner of Canada
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              To exercise these rights, contact us (see Section 11). We may
              require proof of identity before processing your request.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              9. Children&apos;s Privacy
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Our platform is for users aged 13 and over</li>
              <li>We do not knowingly collect data from children under 13</li>
              <li>If we find such data, we delete it promptly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              10. Changes to This Policy
            </h2>
            <p className="mb-4 leading-relaxed">
              We may update this Privacy Policy periodically. If we make
              significant changes, we will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Notify you via email or in-app notification</li>
              <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-[#A20030]">
              11. Contact Us
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2 text-[#E2E4E9]">
                  Privacy Officer
                </h3>
                <p className="leading-relaxed">Connect Incorporated</p>
                <p className="leading-relaxed">
                  Legal enquiries should be sent to: 
                  <a
                    href="mailto:legal@connectinc.app"
                    className="text-[#A20030] hover:underline"
                  >
                    legal@connectinc.app
                  </a>
                </p>
                <p className="leading-relaxed">
                  Appt 1106 - 1380 Prince of Wales Drive, K2C3N5, Ottawa, Canada
                </p>
              </div>

              <div>
                <p className="leading-relaxed">
                  If you are unsatisfied with our response to a privacy matter,
                  you may contact:
                </p>
                <div className="mt-2">
                  <p className="font-medium">
                    Office of the Privacy Commissioner of Canada
                  </p>
                  <p>
                    <a
                      href="mailto:info@priv.gc.ca"
                      className="text-[#A20030] hover:underline"
                    >
                      info@priv.gc.ca
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.priv.gc.ca"
                      className="text-[#A20030] hover:underline"
                    >
                      www.priv.gc.ca
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-black">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
