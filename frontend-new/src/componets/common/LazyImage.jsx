import React, { useState } from 'react';

/**
 * Optimized Image Component with lazy loading
 * Provides better performance by:
 * 1. Lazy loading images
 * 2. Async decoding
 * 3. Blur placeholder while loading
 */
const LazyImage = ({ src, alt, className = '', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
        </div>
    );
};

export default LazyImage;
