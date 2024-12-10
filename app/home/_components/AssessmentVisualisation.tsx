"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ChartDataLabels);

const Assessment1Results = () => {
  const user = useAtomValue(userAtom);

  if (!user) {
    // Show custom skeleton resembling a chart
    return (
      <div className="mb-12">
        {/* Skeleton Title */}
        <div className="mb-6 mt-12 h-6 w-1/3 rounded bg-gray-200"></div>
        <div className="ml-2 mt-4 border-b-4 border-l-4 border-gray-200 p-4">
          <div className="animate-pulse">
            {/* Skeleton Chart Bars */}
            <div className="flex h-64 items-end space-x-4">
              {Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="w-1/5 rounded bg-gray-200"
                    style={{ height: `${(idx + 1) * 15}%` }}
                  ></div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const assessment1 = user.assessments?.burnoutAssessment?.assessment1;

  if (!assessment1) {
    return <p className="mt-2">No assessment data available yet.</p>;
  }

  const metrics = Object.entries(assessment1);

  const data = {
    labels: metrics.map(([metric]) =>
      metric
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
    ),
    datasets: [
      {
        label: "Score",
        data: metrics.map(([, value]) => value),
        backgroundColor: ["#4F46E5", "#EF4444", "#10B981", "#F59E0B"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: Math.round,
        font: {
          weight: "bold",
        },
      },
      title: {
        display: true,
        text: "Burnout Assessment Results",
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Assessment1Results;
