import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

const updatedAt = "May 19, 2026";
const PRIVACY_EMAIL = "privacy@useoutplace.com";

const sections = [
  {
    title: "1. Scope and Role",
    body: [
      "This Privacy Policy explains how Outplace (\"Outplace,\" \"we,\" \"our,\" or \"us\") collects, uses, and safeguards information when you use our staffing and recruiting workflow platform and related services (the \"Service\").",
      "Outplace provides software and related services to staffing agencies, recruiting firms, and other business customers. In most cases, our Customer decides what candidate, client, job, outreach, interview, timesheet, invoice, and recruiting records are submitted to the Service and how the Service is used.",
      "Outplace processes Customer Data on behalf of and at the direction of the Customer to provide, secure, support, and improve the Service, subject to our agreement with the Customer.",
      "If you are using Outplace as an employee, contractor, or authorized user of one of our customers (the \"Customer\"), your use of the Service is also subject to your organization's internal data governance policies.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "Account Information: We may collect identity data such as name, work email address, job title, company name, phone number, and login credentials managed through secure authentication providers. We may also collect organization data such as billing address, subscription details, and tax information.",
      "Usage Data: We may collect audit logs, IP address, time of access, browser and device information, pages viewed, and specific actions taken within the Service. We may also collect performance metrics such as search latency, system uptime, and feature usage.",
      "Customer Data: We process information provided by users and uploaded to or generated through the Service, including candidate profiles, resumes, client records, job requirements, interview notes, communications, assessments, timesheets, invoices, reporting data, and related staffing or recruiting records. We process this data to provide the Service, including search, matching, outreach assistance, interview support, workflow automation, reporting, and integrations.",
      "Communications: We may collect messages, demo requests, support tickets, and other communications you send to us.",
      "Uploaded records may contain personal information about third parties, such as candidates, client contacts, hiring managers, references, contractors, or employees. Outplace processes this information on the Customer's behalf solely to provide and support the Service.",
    ],
  },
  {
    title: "3. Candidate Information",
    body: [
      "If you are a candidate, contractor, consultant, applicant, or other individual whose information is processed through the Service, your information may have been provided to Outplace by one of our Customers or generated through that Customer's use of the Service.",
      "Candidate information may include name, contact information, resume information, work history, skills, location preferences, compensation expectations, availability, job preferences, interview notes, outreach history, communications, AI-assisted summaries, AI-assisted interview notes, and other staffing or recruiting records.",
      "Our Customers are responsible for determining what candidate information they submit to the Service and for having the rights, notices, permissions, consents, and lawful basis needed to collect, use, upload, communicate with, and otherwise process candidate information through the Service.",
    ],
  },
  {
    title: "4. How We Use Information",
    body: [
      "To Provide the Service: We use information to index records, support search and matching, assist with outreach and response drafting, support interview and resume workflows, generate reports, operate integrations, and provide staffing and recruiting workflow tools.",
      "Security and Auditing: We use information to monitor for unauthorized access, maintain audit trails, protect the Service, investigate misuse, and support Customer compliance needs.",
      "Support: We use information to respond to questions, demo requests, support requests, and administrative communications from authorized users.",
      "Product Improvement: We may use aggregated, de-identified usage patterns to understand and improve Service performance, provided the information does not identify a Customer, candidate, or other individual.",
    ],
  },
  {
    title: "5. Outreach and Communications",
    body: [
      "Customers may use the Service to assist with candidate outreach, including email, SMS, text messages, phone calls, AI-assisted voice outreach, and related communications.",
      "Customers are responsible for selecting recipients, determining the purpose of outreach, confirming the lawful basis for outreach, and ensuring that required consents, notices, opt-ins, opt-outs, and do-not-contact requests are obtained and honored.",
      "Outplace may process outreach metadata, call records, SMS records, opt-out status, provider message or call identifiers, timestamps, user actions, consent-basis certifications, outreach purpose, and audit logs to provide the Service, enforce suppression and opt-out rules, investigate complaints, and support compliance.",
      `If you receive an SMS or text message through the Service, you may reply STOP to opt out. If you opt out, we will use reasonable efforts to block further SMS and AI voice outreach to that phone number through the Service. You may also contact us at ${PRIVACY_EMAIL} to request help with an outreach-related concern.`,
      "Because our Customers often control the underlying candidate relationship and records, we may forward or refer your request to the relevant Customer or ask you to contact that Customer directly.",
    ],
  },
  {
    title: "6. AI-Assisted Features",
    body: [
      "The Service may include AI-assisted features that help Customers search records, summarize candidate information, draft outreach, support interview workflows, generate interview notes or summaries, suggest matching signals, tailor resumes, or organize staffing and recruiting workflows.",
      "AI-assisted outputs may be incomplete, inaccurate, or inappropriate for a particular use case. Outplace does not make hiring, staffing, placement, compensation, payroll, employment, or candidate-submission decisions. Customers are responsible for reviewing, validating, and approving AI-assisted outputs before using them and for making their own independent decisions.",
      "We do not use Customer Data to train general-purpose artificial intelligence or machine learning models.",
      "We may process Customer Data using AI or machine learning features solely to provide, secure, support, and improve the Service for our Customers, including through third-party AI service providers, subject to our agreements with Customers and service providers.",
    ],
  },
  {
    title: "7. Sensitive Data and Regulated Screening",
    body: [
      "The Service is not designed to process highly sensitive personal information unless separately agreed in writing.",
      "Customers and users should not submit, upload, transmit, or otherwise provide Social Security numbers, government identification numbers, passport numbers, driver's license numbers, payment card information, bank account information, protected health information, background check reports, biometric information, children's data, immigration documents, tax forms, or other highly sensitive personal information through the Service unless Outplace has expressly agreed in writing.",
      "Outplace is not a consumer reporting agency and does not provide consumer reports, background checks, credit reports, criminal history reports, employment eligibility determinations, or similar regulated screening reports.",
      "Customers are responsible for complying with any laws that apply to their hiring, staffing, recruiting, background check, candidate screening, or employment-related decisions.",
    ],
  },
  {
    title: "8. Cookies and Tracking",
    body: [
      "We use essential cookies for security and session management, including authentication and protection against cross-site request forgery. We may also use limited analytics or similar technologies to understand website and product performance. We do not sell personal information.",
    ],
  },
  {
    title: "9. Data Sharing and Disclosure",
    body: [
      "Outplace does not sell personal information. We disclose information only in limited circumstances.",
      "Service Providers and Subprocessors: We use trusted vendors to support hosting, infrastructure, authentication, analytics, AI functionality, communications, and email delivery. These providers are bound by contractual obligations to handle information consistent with this Policy and applicable law.",
      "The Customer: The Customer's designated administrators and authorized users may have access to data and audit logs associated with their instance of the Service.",
      "Customer-Directed Integrations: We may disclose information through integrations, exports, communications, or workflows that the Customer configures or directs.",
      "Legal Requirements: We may disclose information if required by a valid court order, subpoena, or other legal process. Where permitted, we will notify the Customer of such requests.",
      "Business Transactions: We may disclose or transfer information in connection with a merger, acquisition, financing, reorganization, sale of assets, formation of a successor entity, assignment of contracts, or similar business transaction, including a transfer from Outplace's current operating structure to a future limited liability company, corporation, or other legal entity that continues operating the Service.",
    ],
  },
  {
    title: "10. Customer Compliance Responsibilities",
    body: [
      "Customers are responsible for complying with laws that apply to their collection, use, disclosure, retention, and submission of Customer Data and candidate information, including laws relating to recruiting, staffing, employment, anti-discrimination, privacy, data protection, telemarketing, SMS, calling, recording, consent, and do-not-contact obligations.",
    ],
  },
  {
    title: "11. Data Security and Incidents",
    body: [
      "Outplace maintains reasonable technical and organizational safeguards designed to protect information against unauthorized access, alteration, or disclosure. No system is perfectly secure, and we cannot guarantee absolute security.",
      "If we become aware of a security incident affecting Customer Data, we will notify the affected Customer as required by our agreement with that Customer and applicable law. Because Customers control many candidate relationships, Customers may be responsible for notifying affected individuals where required.",
    ],
  },
  {
    title: "12. Retention",
    body: [
      "We retain Customer Data for the duration of the Customer's subscription or as otherwise described in our agreement with the Customer.",
      "After termination, Customer Data may be returned, deleted, or retained as required or permitted by the applicable agreement, law, backup practices, audit requirements, dispute resolution, fraud prevention, security, or compliance purposes.",
      "Outreach audit logs, opt-out records, suppression records, billing records, and security logs may be retained for a longer period where reasonably necessary to document compliance, honor opt-outs, resolve disputes, prevent misuse, or comply with legal obligations.",
    ],
  },
  {
    title: "13. Your Choices",
    body: [
      "Because Outplace often processes candidate and Customer Data on behalf of a Customer, we may not be able to directly fulfill certain access, correction, deletion, or objection requests without the Customer's involvement.",
      "If your request relates to information controlled by one of our Customers, we may refer your request to that Customer, notify the Customer, or ask you to contact the Customer directly.",
      "We will support Customers in responding to such requests as required by applicable law and our agreement with the Customer.",
      `If you have a direct relationship with Outplace or want to make a privacy request, contact us at ${PRIVACY_EMAIL}. We may need to verify your identity or authority before completing a request.`,
    ],
  },
  {
    title: "14. Updates to This Policy",
    body: [
      "We may update this Policy from time to time to reflect changes in law or our Service. Material changes will be communicated to the Customer.",
      `If you have questions about this Privacy Policy, please email us at ${PRIVACY_EMAIL}.`,
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
