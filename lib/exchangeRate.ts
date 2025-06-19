export const fetchExchangeRate = async () => {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();

    const rate = data.rates?.INR;
    const time = data.time_last_update_utc;

    return { rate, time };
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};
