export interface ProductProps {
    title: string;
    categories: Array<string>;
    img: Array<string>;
    price: number;
    id: string;
    slug?: string;
    className?: string;
    included?: TrustedHTML;
    productPage?: "airrifle" | "airpistol" | "pellets" | "accessories";
    featured?: boolean;
}

export interface AirRifleProps extends ProductProps {
    cartridgeCapacity?: string;
    caliber?: string;
    shot?: string;
    maxEnergy?: string;
    grip?: string;
    trigger?: string;
    triggerWeight?: string;
    sights?: string;
    weight?: string;
    barrelLength?: string;
    dimensions?: string;
    cylinder?: string;
    stock?: string;
    barrel?: string;
    type?: "mechanical" | "electronic";
}

export interface AirPistolProps extends ProductProps {
    cartridgeCapacity?: string;
    caliber?: string;
    maxEnergy?: string;
    triggerWeight?: string;
    sights?: string;
    shots?: string;
    grip?: string;
    weight?: string;
    type?: "mechanical" | "electronic";
}



