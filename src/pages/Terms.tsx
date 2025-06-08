export default function Terms() {
  return (
    <div className="terms">

      <div className="max-w-[1200px] mx-auto px-5 sm:px-20 flex-col">
        <ul className="breadcrumbs py-2 flex gap-2">
          <li className="text-yellow-400">Home</li> - 
          <li className="text-yellow-400">Rules & Policies</li>
        </ul>
        <div className="py-5 flex justify-between text-white">
          <h1 className="text-2xl">Terms of Service</h1>
        </div>
      </div>

      {/* Top Decoration */}
      <div
        className="h-12 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-top-bg.png)" }}
      ></div>

      {/* Main Content */}
      <div
        className="bg-repeat-y bg-top"
        style={{
          backgroundImage: "url(/assets/content-middle-bg.png)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row px-16 gap-4">

          {/* Sidebar */}
          <div className="w-full md:w-[300px]">
            <div className="bg-white border border-gray-300 mb-4">
                <div className="bg-gray-200 p-2 text-gray-600">
                    <h2>Terms of Service</h2>
                </div>
                <div className="text-[#4e2d15] p-2 flex flex-col gap-2">
                    <a href="#1">1) Definition</a>
                    <a href="#2">2) Ownership and Limited License</a>
                    <a href="#3">3) Payment and In-App Purchases</a>
                    <a href="#4">4) User Content</a>
                    <a href="#5">5) Term</a>
                    <a href="#6">6) Account Access and Permissible Assignment</a>
                    <a href="#7">7) Service Availability and Termination</a>
                    <a href="#8">8) Warranty and Liability</a>
                    <a href="#9">9) Indemnity</a>
                    <a href="#1">10) Dispute Resolution</a>
                    <a href="#11">11) Miscellaneous</a>
                </div>
            </div>
          </div>

          {/* Main Section */}
          <div className="w-full">
            <h2 className="text-[30px] text-black font-bold mb-4">TERMS OF SERVICE</h2>
            <h3 className="text-black font-bold">
                Please read these Terms of Service carefully before using LegitPixel Inc.’s Services.
            </h3>
            <p className="mt-4">
                By using our Services, whether as a guest, a registered user, or otherwise, you agree to be bound by these Terms of Service. These apply to all users of the LegitPixel Network, including:
            </p>
            <ul className="list-disc ml-6 mt-2">
                <li>The LegitPixel Minecraft Server</li>
                <li>The LegitPixel.net website and store</li>
                <li>Each LegitPixel game and mini-game available on the server</li>
                <li>All related features and components across all platforms</li>
            </ul>
            <p className="mt-2">
                If you do not agree with these terms, you must not use our Services.
            </p>

            <div className="content">
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="1">1) Definitions</h3>
                <ul className="list-disc ml-6">
                <li><strong>Account:</strong> Any account you create to access certain Services.</li>
                <li><strong>Dispute:</strong> Any controversy related to this agreement, including those arising before or after it.</li>
                <li><strong>In-App Purchases:</strong> Purchases made through the Services.</li>
                <li><strong>Intellectual Property Rights:</strong> All rights relating to patents, copyrights, trademarks, etc.</li>
                <li><strong>Notice:</strong> A written communication via email, courier, or Federal Express delivery.</li>
                <li><strong>Privacy Policy:</strong> LegitPixel’s privacy practices as stated on the website.</li>
                <li><strong>Services:</strong> Everything offered by LegitPixel including software, content, and platforms.</li>
                <li><strong>Terms of Service:</strong> This agreement.</li>
                <li><strong>User Content:</strong> Any content uploaded or created by users on the platform.</li>
                <li><strong>LegitPixel:</strong> LegitPixel Inc. and its authorized entities and staff.</li>
                <li><strong>LegitPixel Affiliate:</strong> Third-party content providers or distributors related to LegitPixel.</li>
                </ul>

                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="2">2) Ownership and Limited License</h3>
                <ol className="list-decimal ml-6">
                <li><strong>Ownership:</strong> All rights to Services are owned by LegitPixel. Nothing is granted beyond what is stated here.</li>
                <li><strong>License:</strong> A limited, revocable, non-commercial use license is granted.</li>
                <li><strong>Accounts:</strong> 
                    <ul className="list-disc ml-6">
                    <li>Access the server using your Microsoft Account.</li>
                    <li>Inactive accounts (180+ days) may be deleted.</li>
                    <li>Deleted accounts may result in loss of data.</li>
                    </ul>
                </li>
                <li><strong>License Limitations:</strong> Do NOT:
                    <ul className="list-disc ml-6">
                    <li>Exploit or cheat in games.</li>
                    <li>Use bots, reverse engineering, or unauthorized tools.</li>
                    <li>Distribute or advertise without permission.</li>
                    <li>Disrespect others or promote hate speech.</li>
                    <li>Attempt unauthorized access or attacks.</li>
                    <li>Sell, lease, or rent the Services for commercial purposes.</li>
                    <li>Violate intellectual property or impersonate others.</li>
                    </ul>
                </li>
                </ol>

                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="3">3) Payment and In-App Purchases</h3>
                <ul className="list-disc ml-6">
                <li>In-App Purchases are non-refundable and managed by LegitPixel.</li>
                <li>All charges are final unless required by law.</li>
                <li>No compensation for unused purchases upon account closure.</li>
                <li>Refunds possible within 60 days if justified.</li>
                <li>All purchases go through Tebex Limited.</li>
                <li>Billing issues should be addressed to Tebex; gameplay issues to LegitPixel Support.</li>
                </ul>

                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="4">4) User Content</h3>
                <p>You are responsible for the content you post. Ensure it:</p>
                <ul className="list-disc ml-6">
                <li>Is accurate and complete.</li>
                <li>Does not violate IP rights or laws.</li>
                <li>Is not offensive or illegal.</li>
                <li>Is free of malicious code and spam.</li>
                </ul>
                <p className="mt-2">
                By uploading content, you grant LegitPixel a worldwide, royalty-free license to use and adapt your content. You also allow LegitPixel to use your name and likeness related to your content. To revoke this license, send formal Notice.
                </p>
                <p className="mt-2">
                Copyright concerns? File a DMCA takedown notice with:
                </p>
                <ul className="list-disc ml-6">
                <li>Description of the IP claimed.</li>
                <li>Description of the infringing material.</li>
                <li>Your full contact information.</li>
                <li>Statement of good faith and authorization.</li>
                <li>Your physical or electronic signature.</li>
                </ul>
                {/* Section 5 */}
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="5">5) Term</h3>
                <p>
                Unless modified or amended by LegitPixel, this agreement and its provisions shall remain in effect.
                Termination of any license granted by LegitPixel does not affect any other provisions of this agreement.
                </p>

                {/* Section 6 */}
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="6">6) Account Access and Permissible Assignment</h3>
                <p>
                If you have been previously banned from using any LegitPixel Services, you are not permitted to access or use our Services.
                </p>

                {/* Section 7 */}
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="7">7) Service Availability and Termination</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>LegitPixel may provide future updates, enhancements, modifications, or patches to any part of the Services at its sole discretion.</li>
                <li>LegitPixel has the right to restrict or terminate access to the Services or your Account at any time, for any reason, without prior notice or liability.</li>
                <li>You may terminate these Terms at any time by contacting our Help Desk at <a href="mailto:support@legitpixel.net" className="underline text-blue-600">support@legitpixel.net</a>.</li>
                <li>Service availability may be interrupted due to factors within or outside LegitPixel’s control. We cannot guarantee constant access.</li>
                <li>
                    Upon account or service termination:
                    <ul className="list-disc pl-6">
                    <li>Any pre-purchased content (e.g., currency, items, skills, progress) is forfeited</li>
                    <li>No refunds will be issued for unused content</li>
                    <li>Access to your data or Services is no longer guaranteed</li>
                    </ul>
                </li>
                <li>LegitPixel may not offer Services in all regions or countries.</li>
                <li>You are responsible for all Internet or mobile data fees associated with accessing our Services.</li>
                </ul>

                {/* Section 8 */}
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="8">8) Warranty and Liability</h3>
                <p className="mt-2">
                YOU ACKNOWLEDGE THAT LEGITPIXEL AND ITS AFFILIATES SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Any indirect, incidental, special, exemplary, or consequential damages (e.g., loss of profits, goodwill, data)</li>
                <li>Any conduct by third parties, including users or external site operators</li>
                </ul>
                <p className="mt-2">
                The Services are provided on an "AS IS" and "AS AVAILABLE" basis. LegitPixel makes no guarantees regarding availability, safety, or fitness for a specific purpose. You use the Services at your own risk.
                </p>
                <p className="mt-2">
                LegitPixel does not guarantee the Services will be virus-free or error-free. The maximum liability of LegitPixel for any claims under this agreement is limited to the amount you have paid (if any) to LegitPixel in the past 180 days.
                </p>
                <p className="mt-2">
                If you have not made any payments to LegitPixel within the last 180 days, your only remedy is to stop using the Services and delete your account.
                </p>
                <p className="mt-2">
                You confirm that:
                <ul className="list-disc pl-6">
                    <li>You are not located in a country under U.S. government embargo</li>
                    <li>You are not listed on any U.S. government sanctions or restricted parties list</li>
                </ul>
                </p>
                <p className="mt-2">
                Some jurisdictions do not allow certain warranty disclaimers or limitations of liability. In those jurisdictions, LegitPixel’s liability will be limited to the extent allowed by law.
                </p>

                {/* Section 9 */}
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="9">9) Indemnity</h3>
                <p className="mt-2">
                You agree to indemnify and hold harmless LegitPixel, its affiliates, employees, contractors, agents, suppliers, and partners against any claims or liabilities resulting from:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Your breach of these Terms</li>
                <li>Your use or misuse of the Services, including economic, emotional, or privacy-related issues</li>
                <li>Your intentional or unintentional transmission of viruses, malware, spyware, or harmful code</li>
                </ul>
                <p className="mt-2">
                LegitPixel reserves the right, but not the obligation, to assume exclusive legal defense in any case where you are required to indemnify us.
                </p>
                <p className="mt-2">
                You acknowledge that LegitPixel is not required to indemnify you under any circumstances.
                </p>
                <p className="mt-2">
                This indemnity clause will survive termination of this agreement.
                </p>
                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="10">10) Dispute Resolution</h3>
                <div className="space-y-2 ">
                <p><strong>a) Informal Resolution for Your Disputes</strong></p>
                <ul className="list-disc list-inside">
                    <li>You must try to resolve any dispute informally for at least <strong>30 days</strong> before initiating arbitration or other legal action.</li>
                    <li>Informal resolution begins once LegitPixel receives your notice.</li>
                    <li>This requirement applies <strong>only to disputes you initiate</strong>, not those initiated by LegitPixel.</li>
                </ul>

                <p><strong>b) Contact Information</strong></p>
                <ul className="list-disc list-inside">
                    <li>Contact LegitPixel through <a href="https://support.LegitPixel.net" className="underline text-blue-600">support.LegitPixel.net</a>.</li>
                    <li>Use the Help Desk to reach the Support Team directly.</li>
                </ul>

                <p><strong>c) Mandatory Binding Arbitration for Your Disputes</strong></p>
                <ul className="list-disc list-inside">
                    <li>If informal resolution fails, either party may request binding arbitration through the <strong>American Arbitration Association (AAA)</strong>.</li>
                    <li>AAA’s rules apply, including the Supplementary Procedures for Consumer-Related Disputes, if applicable.</li>
                    <li>If these Terms conflict with AAA rules, the Terms apply instead.</li>
                    <li>More info: <a href="https://www.adr.org" className="underline text-blue-600">www.adr.org</a> or call <strong>1-800-778-7879</strong>.</li>
                    <li><strong>By agreeing to arbitration, you waive the right to:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Sue in court</li>
                        <li>Have a jury trial</li>
                        <li>Participate in a class action</li>
                    </ul>
                    </li>
                    <li>Disputes must be resolved individually—class/representative arbitrations are not allowed.</li>
                    <li>You are encouraged to consult independent legal counsel.</li>
                </ul>

                <p><strong>d) LegitPixel’s Disputes Against You</strong></p>
                <ul className="list-disc list-inside">
                    <li>LegitPixel may choose arbitration or go straight to court.</li>
                    <li>If court is chosen, you agree to jurisdiction in the <strong>Southern District of New York</strong>.</li>
                    <li>You also agree to accept service of legal process via email associated with your account.</li>
                </ul>
                </div>

                <h3 className="text-black bg-yellow-400 p-2 font-bold mt-4" id="11">11) Miscellaneous</h3>
                <div className="space-y-2">
                <p><strong>a) Changes</strong></p>
                <ul className="list-disc list-inside">
                    <li>You are responsible for reading and accepting these terms.</li>
                    <li>LegitPixel may change the Terms at any time, effective upon posting.</li>
                    <li>Continued use means you accept the new terms.</li>
                </ul>

                <p><strong>b) Complete Agreement</strong></p>
                <ul className="list-disc list-inside">
                    <li>This is the full agreement between you and LegitPixel.</li>
                    <li>Modifications require a written agreement signed by both parties.</li>
                    <li>The agreement can’t be assigned, except in specific business successions.</li>
                    <li>Binding on both parties and their legal successors.</li>
                </ul>

                <p><strong>c) Force Majeure</strong></p>
                <ul className="list-disc list-inside">
                    <li>Neither party is liable for delays or failures due to uncontrollable events (e.g., war, disaster, strike, etc.).</li>
                </ul>

                <p><strong>d) Waiver</strong></p>
                <ul className="list-disc list-inside">
                    <li>LegitPixel’s failure to enforce a right is not a waiver.</li>
                    <li>Waivers must be in writing and signed by an officer.</li>
                    <li>One-time waivers do not apply forever or to other provisions.</li>
                </ul>

                <p><strong>e) Severability</strong></p>
                <ul className="list-disc list-inside">
                    <li>If a provision is invalid, the rest of the agreement still applies.</li>
                    <li>Invalid provisions may be modified to reflect original intent.</li>
                </ul>

                <p><strong>f) Remedies</strong></p>
                <ul className="list-disc list-inside">
                    <li>Violation of the agreement may cause irreparable harm to LegitPixel.</li>
                    <li>LegitPixel can seek injunctions without proving damages.</li>
                    <li>Money damages alone may not be sufficient.</li>
                </ul>

                <p><strong>g) Governing Law and Venue</strong></p>
                <ul className="list-disc list-inside">
                    <li>New York State law governs this agreement.</li>
                    <li>If not arbitrated, disputes are handled in New York courts.</li>
                    <li>You consent to New York’s jurisdiction and waive venue objections.</li>
                </ul>

                <p><strong>h) Language</strong></p>
                <ul className="list-disc list-inside">
                    <li>English is the official language of this agreement.</li>
                </ul>
</div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div
        className="h-12 mb-10 bg-no-repeat bg-top"
        style={{ backgroundImage: "url(/assets/content-bottom-bg.png)" }}
      ></div>
    </div>
  );
}
