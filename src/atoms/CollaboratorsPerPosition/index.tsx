import React from "react";

import {
  Chart as ChartJS,
  registerables
} from "chart.js";
import { Pie } from "react-chartjs-2";

import api from "../../services/api";

ChartJS.register(...registerables);

const CollaboratorsPerPosition: React.FC = () => {
  const [collaborators, setCollaborators] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/collaborators");
      const { data: permissionsData } = await api.get("/permission-groups");

      const collaboratorsWithPermissions = data.map((collaborator: any) => {
        const currentPermission = permissionsData.find(
          (permission: any) => permission.id === collaborator.cargo
        );

        return {
          ...collaborator,
          cargo: currentPermission.name
        };
      });

      const positionsRegistered: string = collaboratorsWithPermissions.map(
        (collaborator: any) => collaborator.cargo
      );

      const positions = Array.from(new Set(positionsRegistered))
        .sort((a: string, b: string) => a.localeCompare(b));

      // grouping by status and summing the quantity
      const groupedByPosition = positions.map((value: string) => {
        const quantity = collaboratorsWithPermissions.filter(
          (collaborator: any) => collaborator.cargo === value
        ).length;

        return {
          position: value,
          quantity
        };
      });

      setCollaborators(groupedByPosition);
    })();

    return () => {
      setCollaborators([]);
    };

  }, []);

  if (collaborators.length === 0) {
    return <div style={{ padding: "10px" }}>Carregando...</div>;
  }

  return (
    <Pie
      style={{ padding: "10px" }}
      data={{
        labels: collaborators.map((receipt: any) => receipt.position),
        datasets: [{
          label: "Doadores",
          data: collaborators.map((receipt: any) => receipt.quantity),
          borderColor: ["#5190E0", "rgb(146,240,164)", "#FFCE56", "#FF6384"],
          backgroundColor: ["#5190E0", "rgb(146,240,164)", "#FFCE56", "#FF6384"]
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
          plugins: {
            legend: {
              position: "top" as const
            },
            title: {
              display: true,
              text: "Número de colaboradores por cargo"
            }
          }
        }
      }
    />
  );
};

export default CollaboratorsPerPosition;
