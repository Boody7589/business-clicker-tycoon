
import React from 'react';
import { formatNumber } from '../utils/format';
import './FloatingNumber.css';

interface FloatingNumberProps {
    value: number;
    x: number;
    y: number;
}

const FloatingNumber: React.FC<FloatingNumberProps> = ({ value, x, y }) => {
    return (
        <span
            className="floating-number"
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            +${formatNumber(value)}
        </span>
    );
};

// We need a tiny bit of CSS for the animation, which we can inject via a style tag.
const styles = `
.floating-number {
    position: absolute;
    font-size: 1.5rem;
    font-weight: bold;
    color: #22d3ee; /* cyan-400 */
    pointer-events: none;
    animation: floatUp 2s ease-out forwards;
    transform: translateX(-50%);
    text-shadow: 0 0 5px rgba(34, 211, 238, 0.7);
}

@keyframes floatUp {
    0% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
    100% {
        opacity: 0;
        transform: translate(-50%, -100px);
    }
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default FloatingNumber;
