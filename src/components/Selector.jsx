import React, { useEffect, useState } from "react";
import axios from "axios";

function Selector({
  primaryCurrency,
  setPrimaryCurrency,
  secondaryCurrency,
  setSecondaryCurrency,
}) {
  const [currencies, setCurrencies] = useState([]);
  /*  const [primaryCurrency, setPrimaryCurrency] = useState("EUR");
  const [secondaryCurrency, setSecondaryCurrency] = useState("USD"); */

  const [staticValue, setStaticValue] = useState();
  const [conversion, setConversion] = useState([]);
  const [amount, setAmount] = useState(1);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/currencies"
      );
      const data = response.data;

      setCurrencies(data);
    } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
    }
  };

  const fetchActualValue = async () => {
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${primaryCurrency}&to=${secondaryCurrency}`
      );
      const data = response.data;
      setConversion(data.rates[secondaryCurrency]);
    } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
    }
  };

  const fetchStaticValue = async () => {
    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?from=${primaryCurrency}&to=${secondaryCurrency}`
      );
      const data = response.data;

      setStaticValue(data.rates[secondaryCurrency]);
    } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    fetchActualValue();
    fetchStaticValue();
  }, [primaryCurrency, secondaryCurrency, amount]);

  return (
    <>
      <div>
        <p className="text-md text-gray-400 font-light">
          1 {currencies[primaryCurrency]} equivale a
        </p>
        <p className="text-3xl font-medium">
          {staticValue} {currencies[secondaryCurrency]}
        </p>
      </div>
      <div className="my-5 grid grid-cols-2 gap-4">
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          min="0"
          id="first_currency"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <select
          onChange={(e) => setPrimaryCurrency(e.target.value)}
          name="from"
          className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        >
          {Object.entries(currencies).map(([key, value]) => (
            <option key={key} value={key} selected={key === "EUR"}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="my-5 grid grid-cols-2 gap-4">
        <input
          type="number"
          value={conversion}
          min="0"
          id="second_currency"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <select
          onChange={(e) => setSecondaryCurrency(e.target.value)}
          name="from"
          className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        >
          {Object.entries(currencies).map(([key, value]) => (
            <option key={key} value={key} selected={key === "USD"}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default Selector;
