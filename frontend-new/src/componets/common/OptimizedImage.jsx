import React from 'react';

/**
 * Optimized Image Component with lazy loading and better performance
 * @param {string} src - Image source
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - Additional CSS classes
 * @param {boolean} priority - If true, disables lazy loading for above-the-fold images
 * @param {object} props - Additional props
 */
const OptimizedImage = ({
    src,
    alt = '',
    className = '',
    priority = false,
    ...props
}) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...props}
        />
    );
};

export default OptimizedImage;
