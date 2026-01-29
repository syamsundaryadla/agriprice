import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import indiaGeoJson from "../assets/india-states.json";

const stateData = {
    "Punjab": 2200,
    "Haryana": 2150,
    "Uttar Pradesh": 2080,
    "Madhya Pradesh": 2100,
    "Gujarat": 2300,
    "Maharashtra": 2250,
    "Rajasthan": 1950,
    "West Bengal": 2400,
    "Karnataka": 2200,
    "Tamil Nadu": 2350,
    "Bihar": 1900,
    "Andhra Pradesh": 2280,
    "Telangana": 2150,
    "Odisha": 1950,
    "Kerala": 2450,
    "Chhattisgarh": 2050,
    "Assam": 1800,
    "Jharkhand": 1850,
    "Uttarakhand": 2100,
    "Himachal Pradesh": 2200,
    "Jammu and Kashmir": 2300
};

const colorScale = scaleQuantile()
    .domain(Object.values(stateData))
    .range([
        "#D1FAE5",
        "#A7F3D0",
        "#6EE7B7",
        "#34D399",
        "#10B981",
        "#059669",
        "#047857"
    ]);

const IndiaMap = () => {
    return (
        <div className="premium-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>National Price Heatmap</h3>
            <div style={{ height: '500px', width: '100%' }}>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 1000, center: [80, 22] }}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ZoomableGroup zoom={1}>
                        <Geographies geography={indiaGeoJson}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    // Robust property check for state name
                                    const stateName = geo.properties.ST_NM || geo.properties.NAME_1 || geo.properties.name || "Unknown";
                                    const price = stateData[stateName];

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={price ? colorScale(price) : "#F3F4F6"}
                                            stroke="#FFFFFF"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#065F46", outline: "none", cursor: 'pointer' },
                                                pressed: { outline: "none" }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                    <div style={{ width: '12px', height: '12px', background: '#D1FAE5' }}></div> Low Price
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                    <div style={{ width: '12px', height: '12px', background: '#047857' }}></div> High Price
                </div>
            </div>
        </div>
    );
};

export default IndiaMap;
