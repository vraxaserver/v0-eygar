"use client"

import { useGetPropertiesQuery } from "@/store/features/propertyApi";
import PropertyCard from "@/components/properties/PropertyCard";

const Page = ({}) => {
    const {data, isLoading, error} = useGetPropertiesQuery()
    console.log(data);
    if(isLoading) {
        return <div>Loading....!</div>
    }
    const properties = data
    
    return <div>
        <h1>This is demo property page!</h1>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-6">
            
                {data && data.map((property) => (
                    <PropertyCard
                        className="py-0"
                        key={property.id}
                        property={property}
                    />
            ))}
           
        </div>
    </div>;
};

export default Page;
