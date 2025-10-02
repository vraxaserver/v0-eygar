'use client';

import React from 'react';
import { Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';
import FeaturedPropertyCard from "@/components/properties/FeaturedPropertyCard";
import {useLanguage, useTranslation} from "@/lib/i18n";
import { useGetPropertiesQuery } from "@/store/features/propertiesApi"

const FeaturedSection = () => {
    const { language, changeLanguage } = useLanguage()
    const { t } = useTranslation()
    const { data: featuredProperties, isLoading, isError } = useGetPropertiesQuery()
    console.log("featuredProperties: ", featuredProperties)

    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!featuredProperties || featuredProperties.total === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {t("home.featured_section_title")}
                    </h2>
                    <p className="text-gray-600">No featured properties are available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <div className="mb-16">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("home.featured_section_title")}</h2>
                <Button variant="ghost" className="text-[#814193] hover:text-[#6d3580] font-medium w-full sm:w-auto">
                    View All →
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-4 sm:gap-6">
                {featuredProperties && featuredProperties.items.map((property) => (
                    <FeaturedPropertyCard key={property.id} property={property} />
                ))}
            </div>

        </div>
    );
};

export default FeaturedSection;
