import { Section, Img, Text, Row, Column, Link } from "@react-email/components";

const Footer = () => {
    return (
        <Section className="mt-8">
            <table className="w-full">
                <tr className="w-full">
                    <td align="center">
                        <Text className="my-[8px] font-semibold text-[14px] text-gray-900 leading-[24px]">
                            Chauhan Sports © {new Date().getFullYear()}
                        </Text>
                        <Text className="mt-[4px] mb-0 text-[12px] text-gray-500 leading-[24px]">
                            Please contact us if you have any questions. (If you reply to this email, we won't be able to see it.)
                        </Text>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <Row className="table-cell h-[44px] w-[56px] align-bottom">
                            <Column className="pr-[8px]">
                                <Link href="https://www.facebook.com/chauhansports">
                                    <Img
                                        alt="Facebook"
                                        height="36"
                                        src="https://react.email/static/facebook-logo.png"
                                        width="36"
                                    />
                                </Link>
                            </Column>
                            <Column className="pr-[8px]">
                                <Link href="#">
                                    <Img alt="X" height="36" src="https://react.email/static/x-logo.png" width="36" />
                                </Link>
                            </Column>
                            <Column>
                                <Link href="https://www.instagram.com/chauhansports/">
                                    <Img
                                        alt="Instagram"
                                        height="36"
                                        src="https://react.email/static/instagram-logo.png"
                                        width="36"
                                    />
                                </Link>
                            </Column>
                        </Row>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <Text className="my-[8px] font-semibold text-[10px] text-gray-500 leading-[24px]">
                            C/O-MADHUSUDAN SINGH, CHAKBAIRIYA, P.O. BAIRIA, P.S. GOPALPUR SAMPATCHAK, PATNA SADAR, PATNA- 800007, BIHAR
                        </Text>
                        <Text className="mt-[4px] mb-0 font-semibold text-[10px] text-gray-500 leading-[24px]">
                            contact@chauhansports.com +91 96614-70953
                        </Text>
                    </td>
                </tr>
            </table>
        </Section>
    );
};

export default Footer
