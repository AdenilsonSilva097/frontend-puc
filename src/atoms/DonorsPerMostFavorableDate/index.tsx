import React from "react";

import {
  Chart as ChartJS,
  registerables
} from "chart.js";
import { Bar } from "react-chartjs-2";

import api from "../../services/api";

ChartJS.register(...registerables);

const DonorsPerMostFavorableDate: React.FC = () => {
  const [receipts, setReceipts] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/donors");

      const registeredMostFavorableDates: string = data.map((donor: any) => donor.melhorData);

      const mostFavorableDates = Array.from(new Set(registeredMostFavorableDates))
        .sort((a: string, b: string) => Number(a) - Number(b));

      // grouping by status and summing the quantity
      const groupedByMostFavorableDate = mostFavorableDates.map((value: string) => {
        const quantity = data.filter((donor: any) => donor.melhorData === value).length;

        return {
          status: value,
          quantity
        };
      });

      setReceipts(groupedByMostFavorableDate);
    })();

    return () => {
      setReceipts([]);
    };

  }, []);

  if (receipts.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <Bar
      data={{
        labels: receipts.map((receipt: any) => receipt.status),
        datasets: [{
          label: "Doadores",
          data: receipts.map((receipt: any) => receipt.quantity),
          borderColor: "#5190E0",
          backgroundColor: "#5190E0",
          pointStyle: "circle"
        }
        ]
      }}
      options={
        {
          maintainAspectRatio: false,
          responsive: true,
          elements: {
            line: {
              cubicInterpolationMode: "monotone"
            }
          },
          scales: {
            y: {
              suggestedMin: 0,
              suggestedMax: 10,
              title: {
                display: true,
                text: "Quantidade de Doadores",
                font: {
                  weight: "bold",
                  style: "italic"
                }
              },
              ticks: {
                stepSize: 1
              }
            },
            x: {
              title: {
                display: true,
                text: "Melhor Data (dia)",
                font: {
                  weight: "bold",
                  style: "italic"
                }
              }
            }
          },
          plugins: {
            legend: {
              position: "top" as const
            },
            title: {
              display: true,
              text: "Número de doadores por melhor data"
            }
          }
        }
      }
    />
  );
};

export default DonorsPerMostFavorableDate;
