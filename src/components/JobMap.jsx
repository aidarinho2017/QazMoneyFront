import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark, GeolocationControl, SearchControl } from "@pbe/react-yandex-maps";

const JobMap = ({ onLocationSelect = () => {}, jobs = [] }) => {
    const [coordinates, setCoordinates] = useState([43.3411, 77.01616426100465]); // Default coordinates (Moscow)

    const handleMapClick = (event) => {
        const coords = event.get("coords");
        setCoordinates(coords);
        if (onLocationSelect) {
            onLocationSelect(coords);
        }
    };

    useEffect(() => {
        // Initialize map center to user's location if possible
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates([latitude, longitude]);
        });
    }, []);

    return (
        <YMaps query={{ apikey: "c1dee381-f9db-4afe-a929-99ab01cef09e" }}>
            <Map
                state={{ center: coordinates, zoom: 10 }}
                onClick={handleMapClick}
                width="100%"
                height="400px"
            >
                <Placemark geometry={coordinates} />
                {jobs.map((job) => (
                    <Placemark
                        key={job.id}
                        geometry={[job.latitude, job.longitude]}
                        properties={{
                            balloonContent: `
                                <div>
                                    <strong>${job.title}</strong>
                                    <p>${job.description}</p>
                                    <p>Location: ${job.location}</p>
                                    <p>Price: ${job.price}</p>
                                </div>
                            `,
                            iconCaption: job.title,
                        }}
                        options={{
                            preset: 'islands#icon',
                            iconColor: '#1E90FF',
                        }}
                    />
                ))}
                <GeolocationControl options={{ float: "left" }} />
                <SearchControl options={{ float: "right" }} />
            </Map>
        </YMaps>
    );
};

export default JobMap;