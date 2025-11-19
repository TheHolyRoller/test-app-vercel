export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16 lg:px-32 text-gray-800" style={{margin: '9rem 0', paddingBottom: '0rem', height: '500vh', position: 'relative', zIndex: '9999999'}} >
      <div className="max-w-4xl mx-auto">
        
        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mb-10">
          Effective Date: 01 January 2025
        </p>
        

        {/* SUMMARY */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Quick Summary</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-2">
            <p><strong>What We Collect:</strong> Personal data, usage data, device data, and screener responses.</p>
            <p><strong>How We Use It:</strong> To deliver the dyslexia screener, authenticate users, communicate results, improve our service, and comply with law.</p>
            <p><strong>Your Rights:</strong> Access, delete, correct, restrict processing, portability, and withdraw consent.</p>
            <p><strong>International Transfers:</strong> Data may be transferred to the US or other regions with safeguards.</p>
            <p><strong>Children’s Privacy:</strong> We only process data for users 13+ and follow enhanced UK GDPR safeguards.</p>
            <p><strong>Updates:</strong> We may update this policy and will notify you of material changes.</p>
          </div>
        </section>

        {/* TABLE OF CONTENTS */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ul className="list-disc ml-6 space-y-2">
            {[
              "Definitions",
              "Information We Collect",
              "Use of Data",
              "Legal Basis for Processing (GDPR)",
              "Retention of Data",
              "Transfer of Data",
              "Security of Data",
              "Do Not Track Signals",
              "Your GDPR Rights",
              "Service Providers",
              "Children's Privacy",
              "Contact Us"
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-blue-600 hover:underline"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* DEFINITIONS */}
        <section id="definitions" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">1. Definitions</h2>
          <div className="space-y-4">
            <p><strong>Service:</strong> The ivvi Dyslexia Screener.</p>
            <p><strong>Personal Data:</strong> Data identifying a living individual.</p>
            <p><strong>Usage Data:</strong> Automatically collected diagnostic, device, and behavioural data.</p>
            <p><strong>Data Controller:</strong> ivvi Assist Ltd.</p>
            <p><strong>Data Processor:</strong> A third party processing data on our behalf.</p>
            <p><strong>Data Subject:</strong> Any user of our service.</p>
            <p><strong>Special Category Data:</strong> Sensitive data such as health information.</p>
          </div>
        </section>

        {/* DATA WE COLLECT */}
        <section id="information-we-collect" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mt-4 mb-2">Personal Data</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Email Address</li>
            <li>First & Last Name</li>
            <li>IP Address</li>
            <li>Age Range</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Usage Data</h3>
          <p className="mb-2">
            Device type, browser information, unique identifiers, IP address, operating system, and diagnostic logs.
          </p>
        </section>

        {/* USE OF DATA */}
        <section id="use-of-data" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">3. Use of Data</h2>
          <p className="mb-4">ivvi Assist Ltd uses collected data to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Provide, maintain, and improve the Service</li>
            <li>Notify you about changes</li>
            <li>Support interactive features</li>
            <li>Deliver customer support</li>
            <li>Detect and prevent technical issues</li>
            <li>Provide relevant news or offers (with opt-out)</li>
          </ul>
        </section>

        {/* LEGAL BASIS */}
        <section id="legal-basis-for-processing-(gdpr)" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">4. Legal Basis for Processing (GDPR)</h2>
          <p className="mb-4">We process Personal Data when:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>You give consent</li>
            <li>It is necessary for our legitimate interests</li>
            <li>We must comply with legal obligations</li>
          </ul>
        </section>

        {/* RETENTION */}
        <section id="retention-of-data" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">5. Retention of Data</h2>
          <p className="mb-4">We retain data only as long as necessary.</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Account data: Duration of account + 30 days</li>
            <li>Support communications: 2 years</li>
            <li>Marketing preferences: Until withdrawn</li>
          </ul>
        </section>

        {/* TRANSFER */}
        <section id="transfer-of-data" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">6. Transfer of Data</h2>
          <p className="mb-4">
            Data may be transferred internationally and safeguarded through mechanisms such as Standard Contractual Clauses.
          </p>
        </section>

        {/* SECURITY */}
        <section id="security-of-data" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">7. Security of Data</h2>
          <p className="mb-4">
            We use encryption, access controls, audits, and incident response procedures to protect your data.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Data Breach Procedures</h3>
          <p>
            We notify users and regulators within 72 hours where legally required.
          </p>
        </section>

        {/* DO NOT TRACK */}
        <section id="do-not-track-signals" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">8. Do Not Track Signals</h2>
          <p>
            We do not respond to Do Not Track signals due to industry-wide inconsistencies.
          </p>
        </section>

        {/* GDPR RIGHTS */}
        <section id="your-gdpr-rights" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">9. Your GDPR Rights</h2>
          <p className="mb-4">
            You may request access, correction, deletion, restriction, portability, or withdraw consent.
          </p>
          <p>Email us at: <a href="mailto:support@ivvi.app" className="text-blue-600">support@ivvi.app</a></p>
        </section>

        {/* SERVICE PROVIDERS */}
        <section id="service-providers" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">10. Service Providers</h2>

          {/* --- VERCEL --- */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">Vercel Analytics</h3>
            <p className="mb-2">Used for monitoring, performance, and crash diagnostics.</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Error Data</li>
              <li>Device Data</li>
              <li>User Identifiers</li>
            </ul>
          </div>

          {/* --- APPWRITE --- */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">Appwrite</h3>
            <ul className="list-disc ml-6 mb-2 space-y-1">
              <li>Authentication data (emails, tokens, IP)</li>
              <li>Screener responses & timestamps</li>
              <li>Device and technical logs</li>
            </ul>
          </div>

          {/* --- RESEND --- */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">Resend</h3>
            <ul className="list-disc ml-6 mb-2 space-y-1">
              <li>Email delivery metadata</li>
              <li>Email content (where necessary)</li>
              <li>Operational logs</li>
            </ul>
          </div>

          {/* --- AIRTABLE --- */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">Airtable</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>User identification data</li>
              <li>Consent records</li>
              <li>Screener results</li>
              <li>Audit logs and version history</li>
            </ul>
          </div>
        </section>

        {/* CHILDREN */}
        <section id="children's-privacy" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">11. Children's Privacy</h2>
          <p className="mb-4">
            The screener is intended for individuals aged 13+. We apply strict safeguards under UK GDPR when processing data for users aged 13–17.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>No data from under-13s without parental consent</li>
            <li>Minimal data collection</li>
            <li>No marketing or profiling</li>
            <li>Extra transparency and care for young users</li>
          </ul>
        </section>

        {/* CONTACT */}
        <section id="contact-us" className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">12. Contact Us</h2>
          <p className="mb-2">If you have any questions, contact us:</p>
          <p>Email: <a href="mailto:danny@ivvi.app" className="text-blue-600">danny@ivvi.app</a></p>
          <p>Address: 5 South Gyle Crescent Lane, Edinburgh, EH12 9EG</p>
        </section>

      </div>
    </div>
  );
}
