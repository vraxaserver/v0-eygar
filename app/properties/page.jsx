"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Map } from "lucide-react";

import PropertyCard from "@/components/properties/PropertyCard";
import { useGetPropertiesQuery } from "@/store/features/propertiesApi";
import SearchBar from "@/components/search/SearchBar";
import Image from "next/image";
import { selectCurrentUser } from "@/store/slices/authSlice";
import { selectLocation } from "@/store/slices/locationSlice";


export default function PropertyListings() {
    const user = useSelector(selectCurrentUser);
    const loc = useSelector(selectLocation);
    console.log("============Location=============")
    console.log(loc)
    const reduxFilters = useSelector((state) => state.search.filters);
    const reduxSearchQuery = useSelector((state) => state.search.searchQuery);
    
    const [viewMode, setViewMode] = useState("grid");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [allProperties, setAllProperties] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const isFetchingRef = useRef(false);

    const currentUserId = user?.eygar_host?.id;

    // Build query params from Redux state
    const buildQueryParams = () => {
        const params = {
            page,
        };

        // Add search query
        if (reduxSearchQuery) {
            params.search = reduxSearchQuery;
        }

        // Add category
        if (category && category !== "All") {
            params.category = category;
        } else if (reduxFilters.category) {
            params.category = reduxFilters.category;
        }

        // Add check-in and check-out dates
        if (reduxFilters.checkIn) {
            params.check_in = reduxFilters.checkIn;
        }
        if (reduxFilters.checkOut) {
            params.check_out = reduxFilters.checkOut;
        }

        // Add guests
        if (reduxFilters.guests) {
            const totalGuests = (reduxFilters.guests.adults || 0) + (reduxFilters.guests.children || 0);
            if (totalGuests > 0) {
                params.guests = totalGuests;
            }
            if (reduxFilters.guests.adults > 0) {
                params.adults = reduxFilters.guests.adults;
            }
            if (reduxFilters.guests.children > 0) {
                params.children = reduxFilters.guests.children;
            }
        }

        // Add price range
        if (reduxFilters.min_price !== undefined && reduxFilters.min_price > 0) {
            params.min_price = reduxFilters.min_price;
        }
        if (reduxFilters.max_price !== undefined && reduxFilters.max_price < 1000) {
            params.max_price = reduxFilters.max_price;
        }

        // Add property type
        if (reduxFilters.propertyType) {
            params.property_types = reduxFilters.propertyType;
        }

        // Add amenities
        if (reduxFilters.amenities && reduxFilters.amenities.length > 0) {
            params.amenities = reduxFilters.amenities.join(',');
        }

        // Add experiences
        if (reduxFilters.has_experiences) {
            params.has_experiences = reduxFilters.has_experiences;
        }

        return params;
    };

    const queryParams = buildQueryParams();
    console.log("==============queryParams==============")
    console.log(queryParams)

    const { data: properties, isLoading, error, isFetching } = useGetPropertiesQuery(queryParams);

    // Reset pagination when filters or category change
    useEffect(() => {
        setPage(1);
        setAllProperties([]);
        setHasMore(true);
        isFetchingRef.current = false;
    }, [reduxFilters, reduxSearchQuery, category]);

    // Update allProperties when new data is fetched
    useEffect(() => {
        if (properties && properties.items) {
            if (page === 1) {
                // Reset properties on first page
                setAllProperties(properties.items);
            } else {
                // Append new properties, avoiding duplicates
                setAllProperties(prev => {
                    const existingIds = new Set(prev.map(p => p.id));
                    const newProperties = properties.items.filter(
                        p => !existingIds.has(p.id)
                    );
                    return [...prev, ...newProperties];
                });
            }
            
            // Check if there are more pages
            setHasMore(page < properties.total_pages);
            isFetchingRef.current = false;
        }
    }, [properties, page]);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            // Check if already loading or no more data
            if (isFetchingRef.current || !hasMore || isLoading || isFetching) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;

            // Calculate scroll percentage
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

            // Load more when user reaches 80% of the page
            if (scrollPercentage >= 0.8) {
                isFetchingRef.current = true;
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isLoading, isFetching]);

    return (
        <div>
            <SearchBar />
            {/* Categories */}
            <div className="border-b border-gray-200 pt-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-8">
                {page === 1 && isLoading && <div className="center">Loading..</div>}
                {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {allProperties.map((property) => (
                            <PropertyCard
                                className="py-0"
                                key={property.id}
                                property={property}
                                currentUserId={currentUserId}
                            />
                        ))}
                    </div>
                )}

                {viewMode === "list" && (
                    <div className="space-y-4 sm:space-y-6">
                        {allProperties.map((property) => (
                            <Card
                                key={property.id}
                                className="group cursor-pointer border border-gray-200 hover:shadow-lg transition-all duration-300"
                            >
                                <CardContent className="p-0">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Image */}
                                        <div className="relative w-full sm:w-80 h-56 sm:h-64 flex-shrink-0">
                                            <Image
                                                src={property.images[0]}
                                                alt={property.title}
                                                fill
                                                priority   
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                                            />
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`absolute top-3 right-3 w-8 h-8 rounded-full p-0 ${
                                                    property.isLiked
                                                        ? "text-red-500"
                                                        : "text-white"
                                                } hover:scale-110 transition-transform`}
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${
                                                        property.isLiked
                                                            ? "fill-current"
                                                            : ""
                                                    }`}
                                                />
                                            </Button>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 p-4 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                                <div>
                                                    <Badge
                                                        variant="secondary"
                                                        className="mb-2"
                                                    >
                                                        {property.type} •{" "}
                                                        {property.beds} bed
                                                        {property.beds !== 1
                                                            ? "s"
                                                            : ""}
                                                    </Badge>
                                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                                                        {property.title}
                                                    </h3>
                                                    <p className="text-gray-600 mb-4">
                                                        {property.location}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-1 mt-2 sm:mt-0">
                                                    <Star className="w-4 h-4 fill-current text-black" />
                                                    <span className="text-sm font-medium">
                                                        {property.rating}
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        ({property.reviews})
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline space-x-1">
                                                <span className="text-xl sm:text-2xl font-semibold text-gray-900">
                                                    ${property.price}
                                                </span>
                                                <span className="text-gray-600">
                                                    / Night
                                                </span>
                                                {property.rating >= 4.8 && (
                                                    <span className="text-yellow-600">
                                                        ⚡
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {viewMode === "map" && (
                    <div className="h-72 sm:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <Map className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600">
                                Map view coming soon
                            </p>
                        </div>
                    </div>
                )}

                {/* Loading indicator for subsequent pages */}
                {page > 1 && (isLoading || isFetching) && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">Loading more properties...</p>
                    </div>
                )}

                {/* End of data indicator */}
                {!hasMore && allProperties.length > 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No more properties to load</p>
                    </div>
                )}

                {/* No results message */}
                {!isLoading && allProperties.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No properties found matching your criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}
