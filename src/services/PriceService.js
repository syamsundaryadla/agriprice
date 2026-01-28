// PriceService.js

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';
const BASE_URL = 'https://api.data.gov.in/resource/' + RESOURCE_ID;
const DEFAULT_API_KEY = '579b464db66ec23bdd000001847c6f0d426a40034ba8a88e38fb06eb'; // Test key from user

// Mock base data for simulation (Fallback)
const BASE_PRICES = [
    { id: 1, commodity: 'Wheat', basePrice: 2150, unit: 'Quintal', location: 'Mandi A, Punjab' },
    { id: 2, commodity: 'Rice (Basmati)', basePrice: 3800, unit: 'Quintal', location: 'Mandi B, Haryana' },
    { id: 3, commodity: 'Maize', basePrice: 1950, unit: 'Quintal', location: 'Mandi C, Uttar Pradesh' },
    { id: 4, commodity: 'Soybean', basePrice: 4200, unit: 'Quintal', location: 'Mandi D, Madhya Pradesh' },
    { id: 5, commodity: 'Cotton', basePrice: 6100, unit: 'Quintal', location: 'Mandi E, Gujarat' },
    { id: 6, commodity: 'Mustard', basePrice: 5400, unit: 'Quintal', location: 'Mandi F, Rajasthan' },
    { id: 7, commodity: 'Potato', basePrice: 1200, unit: 'Quintal', location: 'Mandi G, West Bengal' },
    { id: 8, commodity: 'Onion', basePrice: 2500, unit: 'Quintal', location: 'Mandi H, Maharashtra' },
];

const fluctuate = (price) => {
    const percentChange = (Math.random() * 4) - 2;
    const newPrice = Math.round(price + (price * (percentChange / 100)));
    const trend = percentChange >= 0 ? 'up' : 'down';
    const change = Math.abs(percentChange).toFixed(1);
    return { newPrice, trend, change };
};

export const fetchLivePrices = async () => {
    // 1. Try fetching from Python Backend (eNAM Scraper)
    try {
        console.log("Fetching from Python Backend (eNAM)...");
        const response = await fetch('http://localhost:8000/enam-prices');
        // Add timeout handling if needed, but fetch usually waits
        const result = await response.json();

        if (result.status === 'success' && result.data && result.data.length > 0) {
            console.log("eNAM Data Received:", result.data);
            return result.data.map((item, index) => ({
                id: index,
                commodity: item.commodity,
                price: Number(item.modal_price),
                unit: 'Quintal',
                location: `${item.apmc}, ${item.state}`,
                trend: 'up', // eNAM scraper doesn't provide trend yet
                change: '0.0',
                lastUpdated: item.date,
                isReal: true
            }));
        }
    } catch (backendError) {
        console.warn("Backend Scraper Failed/Not Running:", backendError);
    }

    // 2. Fallback: Check for data.gov.in key
    const apiKey = localStorage.getItem('agri_api_key') || DEFAULT_API_KEY;

    if (apiKey) {
        try {
            // Construct target URL
            const targetUrl = `${BASE_URL}?api-key=${apiKey}&format=json&limit=20`;

            // Use corsproxy.io
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;

            console.log("Fetching live data from:", proxyUrl);

            const response = await fetch(proxyUrl);

            console.log("Response Status:", response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API Data:", data);

            if (data.records && data.records.length > 0) {
                return data.records.map((record, index) => ({
                    id: index,
                    commodity: record.commodity,
                    price: Number(record.modal_price),
                    unit: 'Quintal',
                    location: `${record.market}, ${record.state}`,
                    trend: 'up', // Real API doesn't allow trend calc without history
                    change: '0.0', // 0.0 indicates real data (no fluctuation mocked)
                    lastUpdated: record.arrival_date || 'Today',
                    isReal: true
                }));
            } else {
                console.warn("API returned no records:", data);
            }

        } catch (error) {
            console.error("API Fetch Failed, falling back to simulation:", error);
        }
    }

    // Fallback Simulation
    console.log("Using Simulation Mode");
    return new Promise((resolve) => {
        setTimeout(() => {
            const liveData = BASE_PRICES.map(item => {
                const { newPrice, trend, change } = fluctuate(item.basePrice);
                return {
                    ...item,
                    price: newPrice,
                    trend,
                    change,
                    lastUpdated: 'Just now',
                    isReal: false
                };
            });
            resolve(liveData);
        }, 800);
    });
};

export const fetchCommodityList = async () => {
    return BASE_PRICES.map(p => p.commodity);
};
