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
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

interface AdminNotificationEmailProps {
    clientName: string;
    clientEmail: string;
    phone: string;
    billingName: string;
    billingAddress: string;
    weaponPrice: string;
}

export default function AdminNotificationEmail({
    clientName,
    clientEmail,
    phone,
    billingName,
    billingAddress,
    weaponPrice,
}: AdminNotificationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New Weapon Booking Notification</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Booking Request</Heading>
                    <Hr style={hr} />
                    <Text style={text}>A new weapon has been booked.</Text>

                    <Section style={box}>
                        <Row>
                            <Column style={columnLabel}>Client Name:</Column>
                            <Column style={columnValue}>{clientName}</Column>
                        </Row>
                        <Row>
                            <Column style={columnLabel}>Client Email:</Column>
                            <Column style={columnValue}>{clientEmail}</Column>
                        </Row>
                        <Row>
                            <Column style={columnLabel}>Phone:</Column>
                            <Column style={columnValue}>{phone || 'N/A'}</Column>
                        </Row>
                        <Row>
                            <Column style={columnLabel}>Billing Name:</Column>
                            <Column style={columnValue}>{billingName}</Column>
                        </Row>
                        <Row>
                            <Column style={columnLabel}>Billing Address:</Column>
                            <Column style={columnValue}>{billingAddress}</Column>
                        </Row>
                        <Row>
                            <Column style={columnLabel}>Weapon Price:</Column>
                            <Column style={columnValue}>{weaponPrice}</Column>
                        </Row>
                    </Section>

                </Container>
            </Body>
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
    padding: "20px 40px",
};

const columnLabel = {
    fontWeight: "bold",
    color: "#333",
    width: "150px",
    paddingBottom: "8px",
};

const columnValue = {
    color: "#555",
    paddingBottom: "8px",
};
