import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Privacy policy" };

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy policy">
      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to Chauhan Sports. We respect your privacy and are committed
          to protecting your personal data. This privacy policy will inform you
          as to how we look after your personal data when you visit our website
          (regardless of where you visit it from) and tell you about your
          privacy rights and how the law protects you.
        </p>
      </section>

      <section>
        <h2>2. Data we collect</h2>
        <p>
          We may collect, use, store and transfer different kinds of personal
          data about you, which we have grouped together as follows:
        </p>
        <ul>
          <li>
            <strong>Identity data</strong> includes first name, last name,
            username or similar identifier.
          </li>
          <li>
            <strong>Contact data</strong> includes billing address, delivery
            address, email address and telephone numbers.
          </li>
          <li>
            <strong>Technical data</strong> includes internet protocol (IP)
            address, your login data, browser type and version, time zone
            setting and location, browser plug-in types and versions, operating
            system and platform, and other technology on the devices you use to
            access this website.
          </li>
          <li>
            <strong>Usage data</strong> includes information about how you use
            our website, products and services.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most
          commonly, we will use your personal data in the following
          circumstances:
        </p>
        <ul>
          <li>
            Where we need to perform the contract we are about to enter into or
            have entered into with you.
          </li>
          <li>
            Where it is necessary for our legitimate interests (or those of a
            third party) and your interests and fundamental rights do not
            override those interests.
          </li>
          <li>Where we need to comply with a legal or regulatory obligation.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data security</h2>
        <p>
          We have put in place appropriate security measures to prevent your
          personal data from being accidentally lost, used or accessed in an
          unauthorised way, altered or disclosed. In addition, we limit access
          to your personal data to those employees, agents, contractors and
          other third parties who have a business need to know.
        </p>
      </section>

      <section>
        <h2>5. Contact us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy
          practices, contact us at{" "}
          <a href="mailto:contact@chauhansports.com">
            contact@chauhansports.com
          </a>{" "}
          or <a href="tel:+919661470953">+91 96614 70953</a>.
        </p>
      </section>
    </LegalPage>
  );
}
