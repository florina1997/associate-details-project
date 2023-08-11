import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import baseUrl from "../../../common/baseUrl";
function Piechart() {
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
  console.log(data, "data//////");
  const dataFun = data?.map((item) => {
    if (item["ROLE"] === "HR") {
      hrCount++;
    } else if (item["ROLE"] === "Associate") {
      associateCount++;
    } else if (item["ROLE"] === "Manager") {
      managerCount++;
    }
    return item;
  });

  const dataChart = {
    series: [hrCount, associateCount, managerCount],

    options: {
      title: {
        text: " Pie Chart",
      },

      labels: ["HR", "Associate", "Manager"],
      chart: { type: "donut" },
      legend: { show: true },
      dataLabels: { enabled: false },
      tooltip: { enabled: true },

      states: {
        hover: { filter: { type: "lighten", value: 0.5 } },
        active: { filter: { type: "none", value: 0 } },
      },
      stroke: { width: 4 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: { show: true },
              total: {
                show: true,
                showAlways: true,
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    },
  };
  return (
    <div>
      <ReactApexChart
        height={338}
        options={dataChart.options}
        series={dataChart.series}
        type="donut"
      />
    </div>
  );
}

export default Piechart;
