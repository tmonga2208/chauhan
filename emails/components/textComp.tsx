import { Section, Img, Text, Heading } from "@react-email/components";

interface TextCompProps {
    clientName: string;
}


const TextComp = ({ clientName }: TextCompProps) => {
    return (
        <Section className="py-10 px-[74px]">
            <Img
                src="https://chauhansports.com/logo.png"
                width="120"
                height="66"
                alt="Chauhan Sports"
                className="mx-auto rounded-md object-cover"
            />
            <Heading className="text-[32px] leading-[1.3] font-bold text-center -tracking-[1px]">
                It's Confirmed.
            </Heading>
            <Text className="m-0 text-[14px] leading-[2] text-[#747474] font-medium">
                Dear {clientName},
            </Text>
            <Text className="m-0 text-[14px] leading-[2] text-[#747474] font-medium">
                Thank you for your request to book a sports . We are pleased to confirm that we have received your booking request.
            </Text>
            <Text className="m-0 text-[14px] leading-[2] text-[#747474] font-medium mt-6">
                We will get back to you as soon as possible.
                Thank you for using Chauhan Sports.
            </Text>
        </Section>
    )
}

export default TextComp