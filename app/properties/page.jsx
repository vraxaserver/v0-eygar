"use client"

import { useGetPropertiesQuery } from "@/store/features/propertiesApi";

const Page = ({}) => {
    const {data, isLoading, isError} = useGetPropertiesQuery()
    return (
        <div>
            <h1>Properties Listing...!</h1>
            {data && data.map((property) => <li>{property.title}</li>)}
        </div>
    );
};

export default Page;
