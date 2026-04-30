import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_EMAIL } from "@/components/lander/constants";

const updatedAt = "February 17, 2026";

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "This Privacy Policy explains how Outplace (\"Outplace,\" \"we,\" \"our,\" or \"us\") collects, uses, and safeguards information when you use our staffing and recruiting workflow platform and related services (the \"Service\").",
      "Outplace acts as a service provider to the staffing agencies, recruiting firms, and companies we serve. If you are using Outplace as an employee, contractor, or authorized user of one of our customers (the \"Customer\"), your use of the Service is also subject to your organization's internal data governance policies.",
      "Account Information: We may collect identity data such as name, work email address, job title, company name, phone number, and login credentials managed through secure authentication providers. We may also collect organization data such as billing address, subscription details, and tax information.",
      "Usage Data: We may collect audit logs, IP address, time of access, browser and device information, pages viewed, and specific actions taken within the Service. We may also collect performance metrics such as search latency, system uptime, and feature usage.",
      "Customer Data: We process information provided by users and uploaded to or generated through the Service, including candidate profiles, resumes, client records, job requirements, interview notes, communications, assessments, timesheets, invoices, reporting data, and related staffing or recruiting records. We process this data to provide the Service, including search, matching, outreach assistance, interview support, workflow automation, reporting, and integrations.",
      "Communications: We may collect messages, demo requests, support tickets, and other communications you send to us.",
      "Uploaded records may contain personal information about third parties, such as candidates, client contacts, hiring managers, references, contractors, or employees. Outplace processes this information on the Customer's behalf solely to provide and support the Service.",
    ],
  },
  {
    title: "2. How We Use Information",
    body: [
      "To Provide the Service: We use information to index records, support search and matching, assist with outreach and response drafting, support interview and resume workflows, generate reports, operate integrations, and provide staffing and recruiting workflow tools.",
      "Security and Auditing: We use information to monitor for unauthorized access, maintain audit trails, protect the Service, investigate misuse, and support Customer compliance needs.",
      "Support: We use information to respond to questions, demo requests, support requests, and administrative communications from authorized users.",
      "Product Improvement: We may use aggregated, de-identified usage patterns to improve the Service. We do not use Customer Data to train publicly available AI models.",
    ],
  },
  {
    title: "3. Cookies and Tracking",
    body: [
      "We use essential cookies for security and session management, including authentication and protection against cross-site request forgery. We may also use limited analytics or similar technologies to understand website and product performance. We do not sell personal information.",
    ],
  },
  {
    title: "4. Data Sharing and Disclosure",
    body: [
      "Outplace does not sell personal information. We disclose information only in limited circumstances.",
      "Service Providers and Subprocessors: We use trusted vendors to support hosting, infrastructure, authentication, analytics, AI functionality, communications, and email delivery. These providers are bound by contractual obligations to handle information consistent with this Policy and applicable law.",
      "The Customer: The Customer's designated administrators and authorized users may have access to data and audit logs associated with their instance of the Service.",
      "Customer-Directed Integrations: We may disclose information through integrations, exports, communications, or workflows that the Customer configures or directs.",
      "Legal Requirements: We may disclose information if required by a valid court order, subpoena, or other legal process. Where permitted, we will notify the Customer of such requests.",
    ],
  },
  {
    title: "5. Data Security and Retention",
    body: [
      "Outplace maintains reasonable technical and organizational safeguards designed to protect information against unauthorized access, alteration, or disclosure. No system is perfectly secure, and we cannot guarantee absolute security.",
      "We retain Customer Data for the duration of the subscription. Upon termination, Customer Data is either returned to the Customer or securely deleted in accordance with the agreement and applicable law.",
    ],
  },
  {
    title: "6. Your Choices",
    body: [
      "Because Outplace processes Customer Data on behalf of the Customer, individuals seeking to exercise rights regarding their information, such as access, correction, or deletion, should generally direct those requests to the Customer. We will support the Customer in responding to such requests as required by applicable law.",
      `If you have a direct relationship with Outplace or want to make a privacy request, contact us at ${CONTACT_EMAIL}. We may need to verify your identity or authority before completing a request.`,
    ],
  },
  {
    title: "7. Updates to This Policy",
    body: [
      "We may update this Policy from time to time to reflect changes in law or our Service. Material changes will be communicated to the Customer.",
      `If you have questions about this Privacy Policy, please email us at ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Outplace",
  description: "Outplace privacy policy for website visitors, customers, and platform users.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Outplace handles information for customers, authorized users, candidates, and platform records."
      updatedAt={updatedAt}
      sections={sections}
    />
  );
}
