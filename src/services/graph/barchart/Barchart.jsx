import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import baseUrl from "../../../common/baseUrl";

function Barchart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(`${baseUrl}/get_all`, {})
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.log("myArray is not an array");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let hrCount = 0;
  let associateCount = 0;
  let managerCount = 0;

  const CountFun = data.map((item) => {
    if (item["ROLE"] === "HR") {
      hrCount++;
    } else if (item["ROLE"] === "Associate") {
      associateCount++;
    } else if (item["ROLE"] === "Manager") {
      managerCount++;
    }
    return item;
  });
  const createdDates = data.map((item) => item.createdDate);

  const config = {
    series: [
      {
        name: "HR",
        data: [hrCount],
      },
      {
        name: "Associate",
        data: [associateCount],
      },
      {
        name: "Manager",
        data: [managerCount],
      },
    ],

    options: {
      title: {
        text: "Bar Chart",
      },
      dataLabels: {
        enabled: true,
      },

      chart: {
        type: "column",
        height: 300,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
            dataLabels: {
              enabled: false,
              show: false,
            },
          },
        },
      ],
      plotOptions: {
        column: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              show: false,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      xaxis: {
        type: "category",
        categories: ["Aug", "sep", "Nov"],
      },

      legend: {
        show: true,
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      yaxis: [
        {
          min: 0,
          max: 15,
        },
      ],
    },
  };
  return (
    <div>
      <ReactApexChart
        height={320}
        series={config.series}
        options={config.options}
        type="bar"
      />
    </div>
  );
}

export default Barchart;
