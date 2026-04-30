import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { CONTACT_EMAIL } from "@/components/lander/constants";

const updatedAt = "February 17, 2026";

const sections = [
  {
    title: "1. Accounts and Provision of Service",
    body: [
      "These Terms of Service constitute a binding agreement between Outplace (\"Outplace,\" \"we,\" or \"us\") and the customer or user identified in the applicable order form, subscription, or account registration (\"Customer\" or \"you\").",
      "The Service is software that assists staffing and recruiting teams with agency workflows, including candidate search, matching, outreach, interview support, resume workflows, timesheets, invoicing, reporting, and request management. By accessing or using the Service, you agree to be bound by these Terms. If you are entering into these Terms on behalf of a company, staffing agency, recruiting firm, or other entity, you represent that you have the authority to bind that entity.",
      "Subject to these Terms and payment of applicable fees, Outplace grants Customer a non-exclusive, non-transferable right to access and use the Service for its internal business purposes during the subscription term.",
      "Customer is responsible for maintaining the confidentiality of account credentials and for all activity conducted under its account, including actions taken by its employees, contractors, or agents (\"Authorized Users\").",
      "Customer shall not reverse engineer the Service, use the Service to build a competing product, use the Service for any unlawful purpose or in violation of applicable law, or upload information that Customer is not authorized to process through the Service.",
    ],
  },
  {
    title: "2. Customer Data and Intellectual Property",
    body: [
      "Customer retains all ownership rights to the candidate records, client records, job requirements, communications, resumes, interview notes, timesheets, invoices, and other information uploaded to or generated through the Service on its behalf (\"Customer Data\"). Customer grants Outplace a limited license to host, process, and use Customer Data solely to provide, secure, and support the Service.",
      "Outplace retains all rights, title, and interest in the Service, including the underlying software, models, workflows, interfaces, documentation, and related technology. No rights are granted except as expressly set forth in these Terms.",
    ],
  },
  {
    title: "3. Fees and Payment",
    body: [
      "Fees, billing frequency, usage limits, renewal terms, and payment terms are set forth in the applicable order form, subscription plan, invoice, or order documentation. Unless otherwise stated in writing, fees are non-refundable except as required by law.",
      "Customer is responsible for taxes, duties, and similar governmental assessments other than taxes based on Outplace's income.",
    ],
  },
  {
    title: "4. AI-Assisted Outputs and Customer Responsibility",
    body: [
      "The Service uses artificial intelligence to assist with tasks such as search, matching, candidate summaries, outreach drafting, interview support, resume workflows, reporting, and operational automation. AI-assisted outputs are provided to support Customer's workflow and are not a substitute for human review, business judgment, or legal compliance review.",
      "Customer is responsible for reviewing all outputs, recommendations, rankings, messages, assessments, and final decisions before relying on them. Customer is also responsible for ensuring that its use of the Service complies with all applicable employment, labor, privacy, anti-discrimination, telemarketing, recording consent, procurement, and industry-specific laws, as well as Customer's internal policies. Outplace does not provide legal advice and does not make hiring, placement, compensation, or employment decisions on Customer's behalf.",
    ],
  },
  {
    title: "5. Confidentiality and Security",
    body: [
      "Each party agrees to protect the other party's Confidential Information using at least the same degree of care it uses to protect its own confidential information of similar sensitivity, and in any event no less than reasonable care.",
      "Outplace maintains reasonable technical and organizational safeguards designed to protect Customer Data. Further detail is provided in our Privacy Policy.",
    ],
  },
  {
    title: "6. Warranties and Disclaimers",
    body: [
      "THE SERVICE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE.\" EXCEPT AS EXPRESSLY SET FORTH IN THESE TERMS, OUTPLACE DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. OUTPLACE DOES NOT WARRANT THAT THE SERVICE OR ITS OUTPUTS WILL BE UNINTERRUPTED, ERROR-FREE, COMPLETE, OR SUITABLE FOR ANY PARTICULAR HIRING, STAFFING, OR COMPLIANCE OUTCOME.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, GOODWILL, OR DATA.",
      "EACH PARTY'S TOTAL LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS WILL NOT EXCEED THE FEES PAID OR PAYABLE BY CUSTOMER TO OUTPLACE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
    ],
  },
  {
    title: "8. Term and Termination",
    body: [
      "These Terms remain in effect for the duration of the subscription. Either party may terminate for material breach if the breach is not cured within thirty (30) days of written notice.",
      "Upon termination, Customer may request a reasonable export of its Customer Data in accordance with the Service's standard export functionality. Provisions that by their nature should survive termination will survive, including payment obligations, confidentiality, intellectual property, disclaimers, limitations of liability, and dispute-related provisions.",
    ],
  },
  {
    title: "9. Third-Party Services and Integrations",
    body: [
      "The Service may interoperate with third-party applications, data sources, communication tools, AI providers, payment providers, calendars, email systems, job boards, and customer-selected integrations. Third-party services are governed by their own terms and policies. Outplace is not responsible for third-party services that are not controlled by Outplace.",
    ],
  },
  {
    title: "10. Changes to These Terms",
    body: [
      "Outplace may update these Terms from time to time. If changes are material, we will provide reasonable notice, for example via email or in-product notice. Continued use of the Service after the effective date of the updated Terms constitutes acceptance of the changes.",
      `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms of Service | Outplace",
  description: "Outplace terms of service for website visitors, customers, and platform users.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="The terms that govern access to and use of the Outplace staffing and recruiting platform."
      updatedAt={updatedAt}
      sections={sections}
    />
  );
}
