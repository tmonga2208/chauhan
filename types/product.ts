export interface ProductProps{
    title: string;
    categories: Array<string>;
    img: Array<string>;
    price: number;
    id: string;
    year?: number;
    model?: string;
    included?: Array<string>;
    slug?: string;
    className?: string;
}

