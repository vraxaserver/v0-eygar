"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Map } from "lucide-react";

import PropertyCard from "@/components/properties/PropertyCard";
import { useGetPropertiesQuery } from "@/store/features/propertiesApi";
import SearchBar from "@/components/search/SearchBar";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/slices/authSlice";

export default function PropertyListings() {
    const user = useSelector(selectCurrentUser);
    const [viewMode, setViewMode] = useState("grid");
    const { filters } = useState();
    const [category, setCategory] = useState("");

    const currentUserId = user?.eygar_host?.id 

    const { data: properties, isLoading, error } = useGetPropertiesQuery();

    const handleSearch = () => {
        console.log("Searching with filters:", filters);
    };

    const formatDate = (date) => {
        if (!date) return "Add dates";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        return count;
    };

    const categories = [
        "Beachfront",
        "Cabins",
        "Trending",
        "Tropical",
        "Unique stays",
        "Castles",
        "Countryside",
        "Design",
        "Islands",
        "Lakefront",
    ];

    return (
        <div>
            <SearchBar />
            {/* Categories */}
            <div className="border-b border-gray-200 pt-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-8 overflow-x-auto">
                        <button
                            key={"All"}
                            className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                                category === "All"
                                    ? "border-purple-600 text-purple-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                            }`}
                            onClick={() => setCategory("All")}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                                    category === cat
                                        ? "border-purple-600 text-purple-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                                onClick={() => setCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-8">
                {isLoading && <div className="center">Loading..</div>}
                {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {properties &&
                            properties.items.map((property) => (
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
                        {properties &&
                            properties.items.map((property) => (
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
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes
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
            </div>
        </div>
    );
}
