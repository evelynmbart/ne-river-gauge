const USGS_BASE_URL = "https://waterservices.usgs.gov/nwis/iv";

export async function fetchRiverData(gaugeId) {
    try {
        const response = await fetch(
            `${USGS_BASE_URL}/?format=json&sites=${gaugeId}&parameterCd=00060`
        );
        const data = await response.json();

        const timeSeries = data.value.timeSeries[0];
        if (!timeSeries) {
            throw new Error("No data available");
        }

        const latestReading = timeSeries.values[0].value[0];
        return {
            flow: parseFloat(latestReading.value),
            timestamp: new Date(latestReading.dateTime),
            unit: "cubic feet per second",
        };
    } catch (error) {
        console.error("Error fetching river data:", error);
        return null;
    }
} 