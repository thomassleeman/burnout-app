"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

ChartJS.register(ChartDataLabels);

const Assessment1Results = () => {
  const user = useAtomValue(userAtom);
  const [assessment1, setAssessment1] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecryptedData = async () => {
      if (!user?.assessments?.burnoutAssessment) {
        setIsLoading(false);
        return;
      }

      try {
        const decryptRes = await fetch("/api/encryption/decryptNumber", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            encryptedNumberInputs: user.assessments.burnoutAssessment,
          }),
        });

        if (!decryptRes.ok) {
          throw new Error("Failed to decrypt data");
        }

        const decryptedObject = await decryptRes.json();
        setAssessment1(decryptedObject.assessment1);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDecryptedData();
  }, [user?.assessments?.burnoutAssessment]);

  if (!user || isLoading) {
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

  if (error) {
    return (
      <div className="my-6 flex items-center space-x-4 rounded-md bg-amber-50 p-4">
        <ExclamationCircleIcon className="h-6 w-6 text-amber-500" />
        <p className="">Unable to display Burnout Assessment data. </p>
      </div>
    );
  }

  if (user && !isLoading && !assessment1) {
    return (
      <div className="my-6 flex items-center space-x-4 rounded-md bg-yellow-50 p-4">
        <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
        <p className="">
          No Burnout Assessment data available yet.{" "}
          <Link
            className="text-emerald-600 underline underline-offset-1"
            href="/chatbot/burnout-assessment"
          >
            Try out the chatbot now.
          </Link>
        </p>
      </div>
    );
  }

  const metrics = assessment1 ? Object.entries(assessment1) : [];

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
