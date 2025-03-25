import React, { useState, useEffect } from 'react';

const OtherCountries = () => {
    
    const [cityDetails, setCityDetails] = useState([]);

    useEffect(() => {
        const famousCities = [
            "Paris", 
            "New York", 
            "Tokyo", 
            "London", 
            "Dubai", 
            "Sydney", 
            "Rome", 
            "Istanbul", 
            "Mumbai", 
            "Cape Town", 
            "Beijing",       // Known for the Great Wall and Forbidden City.
            "Bangkok",       // Famous for its vibrant street life and temples.
            "Los Angeles",   // Known for Hollywood and beaches.
            "Rio de Janeiro",// Renowned for its Carnival and Christ the Redeemer.
            "Berlin",        // Iconic for its history and culture.
            "Seoul",         // A tech hub and cultural hotspot.
            "Cairo",         // Known for the Pyramids and ancient history.
            "Singapore",     // Famous for its skyline and Marina Bay Sands.
            "Moscow",        // Known for the Kremlin and Red Square.
            "Barcelona"      // Renowned for its architecture and beaches.
          ];
        const fetchWeatherDetails = async () => {
            const fetchedDetails = await Promise.all(
                famousCities.map(async (city) => {
                    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=2556d42900bc4fb19f418109e2ca2088`;
                    try {
                        const response = await fetch(url);
                        const result = await response.json();
                       
                        return result;
                    } catch (error) {
                        console.error(`Error fetching weather for ${city}:`, error);
                        return null;
                    }
                })
            );
            setCityDetails(fetchedDetails);
        };

        fetchWeatherDetails();
    },[]);
     
    const InfoCard = ({ title1, value, title2, temp1, temp2 }) => (
        <div className="h-auto min-h-[8rem] w-full sm:w-[600px] flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded-3xl bg-black relative">
            <div className="flex flex-col justify-around items-center h-28 w-full sm:w-24">
                <div className="text-white text-sm ml-0 sm:ml-3 font-serif font-medium">{title1}</div>
                <div className="text-white text-xl font-semibold ml-0 sm:ml-3">{value}</div>
                <div className="text-white text-sm ml-0 sm:ml-3 font-serif font-medium">{title2}</div>
            </div>
            <div className="text-white text-2xl font-semibold mt-2 sm:mt-0 sm:absolute sm:top-[52px] sm:right-20">
                {temp1}°C /
            </div>
            <div className="text-white text-xl mt-2 sm:mt-0 sm:absolute sm:top-[60px] sm:right-4">{temp2}°C</div>
        </div>
    );

    return (
        <div className="h-[318px] w-full lg:w-[650px] bg-[#0F0F0F] p-4 rounded-3xl overflow-y-auto hide-scrollbar relative">
            <div className="sticky top-0 z-10 bg-[#0F0F0F] pb-2">
                <div className="text-2xl sm:text-3xl text-yellow-50 font-medium">Other Countries</div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-full pb-4">
                {cityDetails.map((object, index) =>
                    object ? (
                        <InfoCard
                            key={index}
                            title1={object?.data[0]?.city_name}
                            value={object?.data[0]?.country_code}
                            title2={object?.data[0]?.weather?.description}
                            temp1={object?.data[0]?.temp}
                            temp2={object?.data[0]?.app_temp}
                        />
                    ) : (
                        <div key={index} className="text-white">Error loading weather data.</div>
                    )
                )}
            </div>
        </div>
    );
};

export default OtherCountries;