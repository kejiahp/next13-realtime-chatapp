import Container from "@/components/ui/custom/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kilogram Privacy Policy: Your Data Security Matters | Kilogram App",
  description:
    "Discover how Kilogram prioritizes your data security and privacy. Our Privacy Policy outlines the measures we take to protect your personal information while delivering a seamless chat experience. Trust Kilogram for secure and private messaging. Learn more about our commitment to your privacy now!",
  alternates: {
    canonical: "/privacy",
  },
};

function Page() {
  return (
    <Container className={"px-4"}>
      <div className="flex flex-col gap-5 h-[500px] w-full justify-center items-start">
        <div className="text-purple-500">Privacy Policy</div>
        <div className="text-purple-500">1. Information Collection</div>
        <p>
          We collect limited personal information necessary for the operation of
          the Kilogram Chat App. This may include your username, email address,
          and profile picture. We do not collect sensitive personal information,
          such as financial or medical data.
        </p>

        <div className="text-purple-500">2. Use of Information</div>
        <p>
          {
            "The information we collect is used solely for the purpose of providing and improving the App's functionality. We do not sell or share your personal information with third parties without your explicit consent."
          }
        </p>

        <div className="text-purple-500">3. User Content</div>
        <p>
          {
            "Any content you post or share on the App may be visible to other users. Please be mindful of the information you choose to share."
          }
        </p>

        <div className="text-purple-500">4. Data Security</div>
        <p>
          {
            "We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. "
          }
        </p>
        <p>
          {
            "However, no method of online transmission or storage is 100% secure, and we cannot guarantee the absolute security of your data."
          }
        </p>

        <div className="text-purple-500">5. Cookies</div>
        <p>
          {
            "The App may use cookies to enhance your user experience. You can manage cookie preferences through your browser settings."
          }
        </p>

        <div className="text-purple-500">6. Third-Party Links</div>
        <p>
          {
            "The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. Please review their respective privacy policies."
          }
        </p>

        <div className="text-purple-500">7. Changes to Privacy Policy</div>
        <p>
          {
            "We reserve the right to update our privacy policy as needed. Any changes will be posted on this page."
          }
        </p>

        <div className="text-purple-500">8. Contact Us</div>
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
