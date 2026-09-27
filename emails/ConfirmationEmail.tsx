import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
    Img,
    Link,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ConfirmationEmailProps {
    clientName: string;
    weaponPrice: string;
    itemName: string;
}

export default function ConfirmationEmail({
    clientName,
    weaponPrice,
    itemName,
}: ConfirmationEmailProps) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="mx-auto my-auto bg-white px-2 font-sans">
                    <Preview>Confirmation For Sports Weapon Request</Preview>
                    <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={"https://chauhansports.com/logo.png"}
                                width="40"
                                height="37"
                                alt="Chauhan Sports Logo"
                                className="mx-auto my-0 "
                            />
                        </Section>
                        <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
                            Confirmation For Sports Weapon Request
                        </Heading>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Hello {clientName},
                        </Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Thank you for your request to book a sports weapon. We are pleased to
                            confirm that we have received your booking request.
                            <br />
                            <Text className="text-[14px] text-black leading-[24px]">{itemName}</Text>
                            <br />
                            {weaponPrice}
                        </Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            We will get back to you as soon as possible.
                        </Text>
                        <Text className="text-[14px] text-black leading-[24px]">
                            Thank you for using Chauhan Sports.
                        </Text>
                        <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
                        <Text className="text-[hsl(0,0%,40%)] text-[12px] leading-[24px]">
                            This mail was intended for{' '}
                            <span className="text-black">{clientName}</span>. This mail was
                            sent from <span className="text-black">Chauhan Sports</span>{' '}
                            located in{' '}
                            <span className="text-black">C/O-MADHUSUDAN SINGH, CHAKBAIRIYA, P.O. BAIRIA, P.S. GOPALPUR SAMPATCHAK, PATNA SADAR, PATNA- 800007, BIHAR</span>. If you
                            were not expecting this email, you can ignore this email. If
                            you are concerned about your account's safety, please reply to
                            this email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};

const h1 = {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};

const text = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
    padding: "0 40px",
};

const box = {
    padding: "0 40px",
};

const paragraph = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
};
