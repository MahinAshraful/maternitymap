import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
    try {
        // Get the file path
        const filePath = path.join(process.cwd(), 'app', 'hospitals', 'hospitals.json');

        // Read and parse the file
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Get the zipcode from the request body
        const { zipcode } = await req.json();

        // Filter the data to find hospitals matching the given zipcode
        const filteredData = jsonData.filter(hospital => hospital["ZIP Code"] === parseInt(zipcode));

        // Return the filtered data as a response
        return NextResponse.json(filteredData);
    } catch (error) {
        console.error("Error reading or processing the file", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}