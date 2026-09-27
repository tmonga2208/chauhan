import { Hr, Html, Head, Body, Tailwind } from "@react-email/components";
import Footer from "./components/footer";
import Product from "./components/product";
import TextComp from "./components/textComp";

interface ConfirmEmailFimalProps {
    clientName: string;
    img: string;
    productName: string;
    price: string;
}

const ConfirmEmailFimal = ({ clientName, img, productName, price }: ConfirmEmailFimalProps) => {
    return (
        <Html>
            <Tailwind>
                <Head />
                <Body>
                    <TextComp clientName={clientName} />
                    <Hr className="border-[#E5E5E5] m-0" />
                    <Product img={img} productName={productName} price={price} />
                    <Hr className="border-[#E5E5E5] m-0" />
                    <Footer />
                </Body>
            </Tailwind>
        </Html>
    )
}

export default ConfirmEmailFimal
