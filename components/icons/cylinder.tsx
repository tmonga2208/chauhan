import React from 'react';

interface VortexIconProps {
    size?: number;
    color?: string;
    className?: string;
}

const VortexIcon: React.FC<VortexIconProps> = ({
    size = 24,
    color = 'currentColor',
    className = ''
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Outer circle */}
            <circle
                cx="100"
                cy="100"
                r="85"
                stroke={color}
                strokeWidth="3"
            />

            {/* Spiral curves */}
            <path
                d="M 100 15 Q 160 40, 165 100 Q 160 160, 100 165 Q 40 160, 35 100 Q 40 50, 85 35"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                d="M 100 30 Q 145 50, 150 100 Q 145 150, 100 150 Q 55 145, 50 100 Q 55 60, 95 45"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                d="M 100 45 Q 130 60, 135 100 Q 130 135, 100 135 Q 70 130, 65 100 Q 70 70, 100 60"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                d="M 100 60 Q 115 70, 120 100 Q 115 120, 100 120 Q 85 115, 80 100 Q 85 80, 100 75"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                d="M 100 75 Q 107 82, 108 100 Q 107 110, 100 110 Q 93 107, 92 100 Q 93 90, 100 88"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            {/* Center circle */}
            <circle
                cx="100"
                cy="100"
                r="8"
                stroke={color}
                strokeWidth="2"
            />
        </svg>
    );
};

export default VortexIcon;