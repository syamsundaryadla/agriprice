import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

// India TopoJSON
const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

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
    "Andhra Pradesh": 2280
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
                    projectionConfig={{ scale: 1000, center: [78, 22] }}
                    width={800}
                    height={600}
                    style={{ width: "100%", height: "100%" }}
                >
                    <ZoomableGroup zoom={1}>
                        <Geographies geography={INDIA_TOPO_JSON}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const stateName = geo.properties.ST_NM;
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={stateData[stateName] ? colorScale(stateData[stateName]) : "#F3F4F6"}
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
