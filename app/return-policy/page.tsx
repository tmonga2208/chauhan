import { LegalPage } from "@/components/legal-page";

export const metadata = { title: "Return & refund policy" };

const NON_RETURNABLE = [
  "Accessories",
  "Pellets and ammunition",
  "Used or tampered products",
  "Customised items",
];

export default function ReturnPolicy() {
  return (
    <LegalPage title="Return & refund policy" updated={false}>
      <section>
        <h2>Open-box delivery</h2>
        <p>
          We strongly recommend choosing open-box delivery. Inspect the package
          thoroughly while the courier is still with you. If you find damage or
          anything missing, refuse the delivery on the spot.
        </p>
        <p className="mt-4 border-l-2 border-signal bg-signal/5 py-4 pl-5 pr-4 text-sm text-ink">
          Once a product has been accepted at delivery, we cannot accept return
          requests for physical damage or missing items.
        </p>
      </section>

      <section>
        <h2>Refunds and replacements</h2>
        <p>
          We offer a <strong>7-day replacement guarantee</strong> for
          manufacturing defects.
        </p>
        <ul>
          <li>
            Report a functional manufacturing defect within 7 days of delivery.
          </li>
          <li>
            We verify the issue and arrange a replacement or a repair authorised
            by the manufacturer.
          </li>
          <li>
            We do not usually issue monetary refunds unless the product is out
            of stock and cannot be replaced.
          </li>
        </ul>
      </section>

      <section>
        <h2>Non-returnable items</h2>
        <p>These are final sale and cannot be returned:</p>
        <ul className="!list-none !pl-0">
          {NON_RETURNABLE.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 border-b border-hair py-3 text-sm"
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 bg-signal"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Need help with a return?</h2>
        <p>
          Email{" "}
          <a href="mailto:support@chauhansports.com">
            support@chauhansports.com
          </a>{" "}
          or call <a href="tel:+919661470953">+91 96614 70953</a> and we&apos;ll
          take it from there.
        </p>
      </section>
    </LegalPage>
  );
}
