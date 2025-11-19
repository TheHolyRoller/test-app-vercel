import React from "react";

export default function TermsOfService() {
  return (
    <div className="w-full flex justify-center bg-gray-50 py-12 px-4" style={{marginTop: '9rem', paddingBottom: '5rem', height: '500vh', position: 'relative', zIndex: '9999999'}} >
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Welcome to ivvidyslexiascreener. By using Dyslexia.ai, you agree to
            these terms. If you do not agree, please do not use our website.
          </p>
        </header>

        {/* Section Component Helper */}
        <Section id="1" title="Acceptance of Terms">
          <p>
            These Terms of Service ("Terms") are a legal agreement between you
            and ivvi Assist Limited ("we," "us," "our," or "ivvi Assist
            Limited").
          </p>
          <p>
            By using our ivvidyslexiascreener, you agree to be bound by these
            Terms. If you do not agree to these Terms, please do not use our
            website.
          </p>
        </Section>

        <Section id="2" title="Definitions">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Website:</strong> The Dyslexia.ai and Lexy websites
            </li>
            <li>
              <strong>Service:</strong> ivvidyslexiascreener and related
              services
            </li>
            <li>
              <strong>User:</strong> Any person who accesses or uses the Service
            </li>
            <li>
              <strong>Content:</strong> All text, images, data, and materials
            </li>
            <li>
              <strong>Account:</strong> A registered user profile
            </li>
          </ul>
        </Section>

        <Section id="3" title="Account Registration">
          <h3 className="text-xl font-semibold mt-4">3.1 Account Creation</h3>
          <p>
            You may need to create an account to access certain features. You
            agree to provide accurate, current, and complete information.
          </p>

          <h3 className="text-xl font-semibold mt-4">3.2 Account Security</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              Maintain confidentiality of your account password or username.
            </li>
            <li>Restrict access to your account.</li>
            <li>You are responsible for all activities under your account.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">3.3 Child Users</h3>
          <p>
            Users under 18 must have parent/guardian permission. Parents are
            responsible for supervising the child's use and may review, edit, or
            delete their child's information.
          </p>
        </Section>

        <Section id="5" title="License and Website Usage">
          <h3 className="text-xl font-semibold mt-4">5.1 Limited License</h3>
          <p>
            We grant you a limited, non-exclusive, non-transferable, revocable
            license to use the Service for personal, non-commercial purposes.
          </p>

          <h3 className="text-xl font-semibold mt-4">5.2 Restrictions</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Do not copy or modify the Service.</li>
            <li>Do not reverse engineer or decompile the Service.</li>
            <li>Do not remove copyright notices.</li>
            <li>Do not sell or distribute the Service.</li>
            <li>Do not use the Service commercially.</li>
            <li>Do not scrape or data-mine the platform.</li>
            <li>Do not interfere or bypass security features.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">
            5.3 Service-Specific Limitations
          </h3>
          <p>
            The AI screener provides educational assistance only and does not
            replace professional diagnosis or treatment.
          </p>
        </Section>

        <Section id="6" title="User Conduct">
          <ul className="list-disc ml-6 space-y-2">
            <li>Use the Service only for lawful purposes.</li>
            <li>Do not upload viruses or malicious code.</li>
            <li>Do not attempt unauthorized access.</li>
            <li>Do not harass, abuse, or impersonate others.</li>
            <li>Do not collect user data without permission.</li>
          </ul>
        </Section>

        <Section id="7" title="Intellectual Property">
          <p>
            The Service and its content are owned by ivvi Assist Limited and are
            protected by copyright, trademark, and other intellectual property
            laws.
          </p>
        </Section>

        <Section id="8" title="Content and Privacy">
          <h3 className="text-xl font-semibold">8.1 User Content</h3>
          <p>You retain ownership of content you submit.</p>

          <h3 className="text-xl font-semibold mt-4">8.2 Privacy</h3>
          <p>
            Personal data is handled per our{" "}
            <a
              href="https://dyslexia.ai/privacy"
              className="text-blue-600 underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section id="9" title="Third-Party Services">
          <h3 className="text-xl font-semibold">9.1 Third-Party Terms</h3>
          <p>External websites may have their own terms.</p>

          <h3 className="text-xl font-semibold mt-4">
            9.2 Third-Party Integrations
          </h3>
          <p>
            Integrations (e.g., Google Drive) may require compliance with their
            respective terms.
          </p>
        </Section>

        <Section id="10" title="Disclaimers">
          <p className="font-semibold">THE SERVICE IS PROVIDED “AS IS.”</p>
          <p>
            We do not provide medical or diagnostic advice. Information is
            educational only.
          </p>
          <p>
            We do not guarantee accuracy, uptime, or specific learning outcomes.
          </p>
        </Section>

        <Section id="11" title="Limitation of Liability">
          <p className="font-semibold">
            To the maximum extent permitted by law, ivvi Assist Limited is not
            liable for indirect, incidental, special, consequential, or punitive
            damages.
          </p>
        </Section>

        <Section id="12" title="Termination">
          <h3 className="text-xl font-semibold">12.1 Termination by You</h3>
          <p>You may stop using the Website at any time.</p>

          <h3 className="text-xl font-semibold mt-4">12.2 Termination by Us</h3>
          <p>
            We may suspend or terminate access for violations of these Terms.
          </p>
        </Section>

        <Section id="13" title="Dispute Resolution">
          <h3 className="text-xl font-semibold">13.1 Governing Law</h3>
          <p>These Terms follow the laws of Scotland.</p>

          <h3 className="text-xl font-semibold mt-4">13.2 Arbitration</h3>
          <p>Disputes will be resolved through binding arbitration in Ireland.</p>
        </Section>

        <Section id="14" title="Changes to Terms">
          <p>
            We may update these Terms at any time. Continued use means you
            accept the updated Terms.
          </p>
        </Section>

        <Section id="20" title="Contact Information">
          <p>For questions:</p>
          <p className="font-medium">Email: danny@ivvi.app</p>
        </Section>

        <div className="bg-gray-100 p-6 rounded-xl" style={{color: '#000'}} >
          <h2 className="text-2xl font-bold mb-3">Simplified Summary</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>You can use the service for personal use only.</li>
            <li>You own your content; we own the platform.</li>
            <li>The service is provided “as is.”</li>
            <li>We may update these terms at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* Helper Component */
function Section({ id, title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">
        {id}. {title}
      </h2>
      <div className="text-gray-700 space-y-3">{children}</div>
    </section>
  );
}
