import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_API_BASE_URL
import { mockProperties, mockExperiences } from "@/data/properties";

export async function GET(request) {
    try {
        
        return NextResponse.json(mockProperties);
    } catch (error) {
        console.error("Error fetching properties:", error);

        if (error.code === "ECONNREFUSED") {
            return NextResponse.json(
                {
                    error: "Service unavailable",
                    message: "Unable to connect to properties service",
                },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: "Internal server error", message: error.message },
            { status: 500 }
        );
    }
}