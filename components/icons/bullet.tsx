import React from 'react';

interface BulletIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const BulletIcon: React.FC<BulletIconProps> = ({
    size = 128,
    color = 'currentColor',
    className = ''
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 250 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Wind/motion lines (left to right) */}
            <line
                x1="50"
                y1="85"
                x2="75"
                y2="85"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <line
                x1="50"
                y1="100"
                x2="80"
                y2="100"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <line
                x1="50"
                y1="115"
                x2="75"
                y2="115"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Bullet casing (rectangular body) */}
            <rect
                x="110"
                y="80"
                width="80"
                height="40"
                stroke={color}
                strokeWidth="10"
                rx="2"
            />

            {/* Bullet tip (rounded end) */}
            <path
                d="M 190 80 L 190 120 Q 220 100, 190 80 Z"
                stroke={color}
                strokeWidth="10"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default BulletIcon;