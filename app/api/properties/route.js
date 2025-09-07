import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_API_BASE_URL

export async function GET(request) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
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

export async function POST(request) {
    try {
        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/properties`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error creating property:", error);

        return NextResponse.json(
            { error: "Internal server error", message: error.message },
            { status: 500 }
        );
    }
}
