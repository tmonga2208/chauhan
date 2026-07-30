import { Column, Img, Row, Section, Text } from "@react-email/components"

interface ProductProps {
    img: string;
    productName: string;
    price: string;
}

const Product = ({ img, productName, price }: ProductProps) => {
    return (
        <Section className="py-10 px-10">
            <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                <div className="w-full md:w-[260px] mb-4 md:mb-0">
                    <Img
                        src={img}
                        alt={productName}
                        className="w-full h-auto object-cover rounded-lg"
                        width="260"
                        height="260"
                    />
                </div>
                <div className="w-full md:pl-6 text-center md:text-left">
                    <Text className="m-0 text-[18px] leading-[1.4] font-semibold text-gray-900 mb-2">
                        {productName}
                    </Text>
                    <Text className="m-0 text-[16px] leading-[1.4] text-gray-500 font-medium">
                        {price}
                    </Text>
                </div>
            </div>
        </Section>
    )
}

export default Product
