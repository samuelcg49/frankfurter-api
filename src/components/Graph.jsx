import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  elements,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Graph() {
  const [fechas, setFechas] = useState({});
  const [valor, setValor] = useState([]);
  const [dias, setDias] = useState([]);

  var midata = {
    labels: dias,
    datasets: [
      {
        label: "Evolución desde 1999",
        data: valor,
        tension: 0.5,
        fill: false,
        borderColor: "rgb(59, 158, 239)",
        backgroundColor: "rgba(59, 158, 239, 0.5)",
        pointRadius: 1,
        pointborderColor: "rgb(59, 158, 239)",
        pointbackgroundColor: "rgba(59, 158, 239, 0.5)",
      },
    ],
  };

  var misoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };

  const fetchDataCharts = async (response) => {
    try {
      const response = await axios.get(
        "https://api.frankfurter.app/1999-01-04..?from=EUR&to=USD"
      );
      const data = response.data.rates;
      setFechas(data);
    } catch (error) {
      console.log("Hubo un error al hacer la solicitud:", error);
    }
  };

  const generateChartData = () => {
    const data = {};

    // Rellena el array 'data' con los valores de 'fechas'
    Object.keys(fechas).forEach((key) => {
      //Crea un indice con el valor de la fecha aaaa-mm-dd y le asigna el valor del USD correspondiente a esa fecha
      data[key] = fechas[key].USD;
    });

    // una vez obtenido el array 'data' accede solo a los valores
    setValor(Object.values(data));
    // una vez obtenido el array 'data' accede solo a las clave de los valores
    setDias(Object.keys(data));
  };

  useEffect(() => {
    fetchDataCharts();
    generateChartData();
  }, []);

  return (
    <>
      <Line data={midata} options={misoptions} />
    </>
  );
}

export default Graph;
