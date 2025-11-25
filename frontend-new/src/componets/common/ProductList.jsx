import React, { useState, useEffect, useMemo, useCallback } from "react";
import Banner from "../website/Banner";
import Drawer from "react-modern-drawer";
import { IoMdClose } from "react-icons/io";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Kaspersky_plus from "../../assets/images/kaspersky-plus.png";

// Product cache to avoid redundant API calls
let productCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Memoized Product Card Component - Optimized for speed
const ProductCard = React.memo(({ product, index, onViewDetails }) => (
    <div
        className="rounded-lg p-[1px] bg-gradient-to-r from-secondary to-primary cursor-pointer transform transition-all duration-200 ease-out hover:scale-105"
    >
        <div className="rounded-lg bg-[#101010] hover:bg-black/70 transition-colors duration-200 p-5 flex flex-col justify-between items-center text-center h-full gap-4">
            <div className="flex justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-contain transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    fetchpriority={index < 3 ? "high" : "low"}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h5 className="font-semibold text-xl">{product.name}</h5>
                <p className="desc text-white/80 line-clamp-2">
                    {product.description}
                </p>
                {product.price && (
                    <p className="text-lg font-semibold text-primary">
                        ₹{product.price}
                    </p>
                )}
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    onClick={() => onViewDetails(product.id)}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/50"
                >
                    View Details
                </button>
            </div>
        </div>
    </div>
));

ProductCard.displayName = 'ProductCard';

const ProductList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            // Check cache first
            const now = Date.now();
            if (productCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
                console.log('Using cached products');
                setProducts(productCache);
                setLoading(false);
                return;
            }

            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const res = await API.get("/products", {
                signal: controller.signal,
                timeout: 10000
            });

            clearTimeout(timeoutId);

            if (res.data && res.data.length > 0) {
                const formattedProducts = res.data.map((product) => ({
                    id: product._id,
                    name: product.name,
                    image: product.image || Kaspersky_plus,
                    description: product.description,
                    detailContent: product.description,
                    price: product.price,
                }));

                // Cache the products
                productCache = formattedProducts;
                cacheTimestamp = Date.now();

                setProducts(formattedProducts);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            if (error.name === 'AbortError') {
                toast.error('Request timed out. Please check your connection.');
            } else if (error.code === 'ECONNABORTED') {
                toast.error('Connection timeout. Please try again.');
            } else {
                toast.error('Failed to load products. Please refresh.');
            }
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ FIXED: Removed spaces from navigation path
    const handleViewDetails = useCallback((productId) => {
        navigate(`/product/${productId}`);
    }, [navigate]);

    if (loading) {
        return (
            <>
                <Banner page="Products" />
                <div className="py-8 md:py-16 lg:py-20 bg-[#101010] text-white">
                    <div className="wrapper flex flex-col text-center gap-5 items-center">
                        <div className="gradient-rounded-text-box mb-2">Our Products</div>
                        <h2 className="heading-2 max-w-[50rem] px-4">Loading Products...</h2>

                        {/* Skeleton Loading */}
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 w-full">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="rounded-lg p-[1px] bg-gradient-to-r from-secondary to-primary">
                                    <div className="rounded-lg bg-[#101010] p-5 h-80 animate-pulse">
                                        <div className="bg-gray-700 h-32 w-32 mx-auto rounded mb-4"></div>
                                        <div className="bg-gray-700 h-6 w-3/4 mx-auto rounded mb-2"></div>
                                        <div className="bg-gray-700 h-4 w-full rounded mb-2"></div>
                                        <div className="bg-gray-700 h-8 w-24 mx-auto rounded mt-4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Banner page="Products" />

            <div className="py-8 md:py-16 lg:py-20 bg-[#101010] text-white">
                <div className="wrapper flex flex-col text-center gap-5 items-center">
                    <div className="gradient-rounded-text-box mb-2">Our Products</div>
                    <h2 className="heading-2 max-w-[50rem] px-4">
                        Explore Our Wide Range of Products
                    </h2>
                    <p className="desc max-w-[50rem] px-4">
                        Check out our top-quality products, designed to meet your digital needs.
                        Click "View Details" to see detailed features and specifications.
                    </p>

                    {products.length === 0 ? (
                        <div className="mt-8">
                            <p className="desc">No products available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 w-full">
                            {products.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                direction="top"
                className="p-4 z-10 w-screen"
                lockBackgroundScroll
            >
                <div className="mb-3 flex items-center justify-end pr-[.7rem] py-[.4rem]">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white text-[2.2rem]"
                    >
                        <IoMdClose />
                    </button>
                </div>
                {selectedProduct && (
                    <div className="flex flex-col gap-6 text-white pb-[2rem]">
                        <h1 className="heading-2">{selectedProduct.name}</h1>
                        <p className="desc whitespace-pre-line">
                            {selectedProduct.detailContent}
                        </p>
                        {selectedProduct.price && (
                            <p className="text-xl font-semibold text-primary">
                                Price: ₹{selectedProduct.price}
                            </p>
                        )}
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default ProductList;
