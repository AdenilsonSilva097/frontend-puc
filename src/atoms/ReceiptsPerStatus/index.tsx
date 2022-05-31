import React from "react";

import {
  Chart as ChartJS,
  registerables
} from "chart.js";
import { Bar } from "react-chartjs-2";

import api from "../../services/api";

ChartJS.register(...registerables);

const ReceiptsPerStatus: React.FC = () => {

  const [receipts, setReceipts] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/receipts");

      const registeredStatus: string = data.map((receipt: any) => receipt.status);

      const status = Array.from(new Set(registeredStatus));

      // grouping by status and summing the quantity
      const groupedByStatus = status.map((value: string) => {
        const quantity = data.filter((receipt: any) => receipt.status === value).length;

        return {
          status: value,
          quantity
        };
      });

      setReceipts(groupedByStatus);
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
          label: "Guias",
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
              suggestedMax: 16,
              title: {
                display: true,
                text: "Quantidade de guias",
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
                text: "Status",
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
              text: "Número de guias por status"
            }
          }
        }
      }
    />
  );
};

export default ReceiptsPerStatus;
