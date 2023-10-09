import Container from "@/components/ui/custom/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Kilogram Terms and Conditions: Your Guide to Responsible App Usage | Kilogram App",
  description:
    "Explore the Kilogram Terms and Conditions to understand the guidelines for responsible and secure usage of our chat app. By using Kilogram, you agree to our terms, ensuring a safe and enjoyable chatting experience for all users. Stay informed and chat confidently with Kilogram!",
  alternates: {
    canonical: "/terms",
  },
};

function Page() {
  return (
    <Container className={"px-4"}>
      <div className="flex flex-col gap-5 h-[500px] w-full justify-center items-start">
        <div className="text-purple-500">
          Terms and Conditions for Kilogram Chat App
        </div>
        <div className="text-purple-500">1. Acceptance of Terms</div>
        <p>
          {
            "By using the Kilogram Chat App (hereinafter referred to as 'the App'), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these Terms and Conditions, please do not use the App."
          }
        </p>

        <div className="text-purple-500">2. User Eligibility</div>
        <p>
          {
            "You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are of legal age and have the capacity to enter into a binding agreement with Kilogram."
          }
        </p>

        <div className="text-purple-500">3. Privacy Policy</div>
        <p>
          {
            "Your use of the App is also governed by our Privacy Policy, which is incorporated by reference into these Terms and Conditions. Please review our Privacy Policy to understand how we collect, use, and disclose your personal information."
          }
        </p>

        <div className="text-purple-500">4. User Accounts</div>
        <p>
          {
            "a. You may be required to create a user account to use certain features of the App. You are responsible for maintaining the confidentiality of your account credentials."
          }
        </p>
        <p>
          {
            "b. You agree to provide accurate and up-to-date information when creating your account and to update it promptly if there are any changes."
          }
        </p>
        <p>
          {
            "c. You are solely responsible for all activities that occur under your account."
          }
        </p>

        <div className="text-purple-500">5. User Content</div>
        <p>
          {
            "a. The App may allow you to post, upload, or share content (text, images, videos, etc.). You retain ownership of your content, but by posting it on the App, you grant Kilogram a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content."
          }
        </p>
        <p>
          {
            "b. You agree not to post or share content that violates the law, infringes on the rights of others, is harmful, offensive, or violates these Terms and Conditions."
          }
        </p>

        <div className="text-purple-500">6. Prohibited Activities</div>
        <p>
          {
            "You are prohibited from engaging in any of the following activities when using the App:"
          }
        </p>
        <p>{"a. Violating any applicable laws or regulations."}</p>
        <p>{"b. Impersonating another person or entity."}</p>
        <p>
          {
            "c. Attempting to gain unauthorized access to the App or other users' accounts."
          }
        </p>
        <p>
          {
            "d. Transmitting viruses, malware, or any other code of a destructive or disruptive nature."
          }
        </p>

        <div className="text-purple-500">7. Termination</div>
        <p>
          {
            "Kilogram reserves the right to terminate or suspend your account and access to the App at our sole discretion, with or without cause and without notice."
          }
        </p>

        <div className="text-purple-500">
          8. Disclaimers and Limitations of Liability
        </div>
        <p>
          {
            "a. The App is provided 'as is' and 'as available.' Kilogram does not make any warranties or representations regarding the App's availability, reliability, or accuracy."
          }
        </p>
        <p>
          {
            "b. Kilogram shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the App."
          }
        </p>

        <div className="text-purple-500">
          9. Changes to Terms and Conditions
        </div>
        <p>
          {
            "Kilogram reserves the right to modify or update these Terms and Conditions at any time. You are responsible for reviewing these Terms and Conditions periodically for changes."
          }
        </p>

        <div className="text-purple-500">
          10. Governing Law and Jurisdiction
        </div>
        <p>
          {
            "These Terms and Conditions shall be governed by and construed in accordance with the laws of Nigeria. Any disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts of Nigeria."
          }
        </p>

        <div className="text-purple-500">Contact Information</div>
        <p>
          {
            "If you have any questions or concerns about these Terms and Conditions, please contact us at,"
          }
          <a href="https://popoola-morenikeji-elijah.vercel.app">here</a>
        </p>
      </div>
    </Container>
  );
}

export default Page;
