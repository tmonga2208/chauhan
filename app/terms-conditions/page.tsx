import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Terms & conditions" };

export default function TermsConditions() {
  return (
    <LegalPage title="Terms & conditions">
      <section>
        <h2>1. Agreement to terms</h2>
        <p>
          These terms and conditions constitute a legally binding agreement made
          between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;),
          and Chauhan Sports (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;),
          concerning your access to and use of the Chauhan Sports website as
          well as any other media form, media channel, mobile website or mobile
          application related, linked, or otherwise connected thereto
          (collectively, the &ldquo;Site&rdquo;).
        </p>
      </section>

      <section>
        <h2>2. Intellectual property rights</h2>
        <p>
          Unless otherwise indicated, the Site is our proprietary property. All
          source code, databases, functionality, software, website designs,
          audio, video, text, photographs and graphics on the Site
          (collectively, the &ldquo;Content&rdquo;), and the trademarks, service
          marks and logos contained therein (the &ldquo;Marks&rdquo;), are owned
          or controlled by us or licensed to us, and are protected by copyright
          and trademark laws.
        </p>
      </section>

      <section>
        <h2>3. User representations</h2>
        <p>By using the Site, you represent and warrant that:</p>
        <ul>
          <li>
            All registration information you submit will be true, accurate,
            current and complete.
          </li>
          <li>
            You will maintain the accuracy of such information and update it
            promptly as necessary.
          </li>
          <li>
            You have the legal capacity, and you agree to comply with these
            terms and conditions.
          </li>
          <li>You are not a minor in the jurisdiction in which you reside.</li>
        </ul>
      </section>

      <section>
        <h2>4. Products</h2>
        <p>
          We make every effort to display the colours, features, specifications
          and details of the products on the Site as accurately as possible. We
          do not, however, guarantee that they will be accurate, complete,
          reliable, current or free of error, and your display may not
          accurately reflect the actual colours and details of the products.
        </p>
      </section>

      <section>
        <h2>5. Limitation of liability</h2>
        <p>
          In no event will we, or our directors, employees or agents, be liable
          to you or any third party for any direct, indirect, consequential,
          exemplary, incidental, special or punitive damages — including lost
          profit, lost revenue or loss of data — arising from your use of the
          Site, even if we have been advised of the possibility of such damages.
        </p>
      </section>
    </LegalPage>
  );
}
