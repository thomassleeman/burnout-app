"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Import date adapter for time scale

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Updated type for Rating
type Rating = {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  rating: number;
};

const StressRatingChart = () => {
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

  // Ensure that `stressRatings` is always an array
  const stressRatings: Rating[] = user.stressRating ?? [];

  if (stressRatings.length === 0) {
    return <p className="mt-2">No stress rating data available yet.</p>;
  }

  // Process data: sort by date and prepare labels and data arrays
  const sortedRatings = stressRatings
    .filter((rating: Rating) => rating.createdAt)
    .sort(
      (a: Rating, b: Rating) =>
        a.createdAt.seconds * 1000 +
        a.createdAt.nanoseconds / 1e6 -
        (b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1e6)
    );

  // Convert createdAt to Date objects
  const labels = sortedRatings.map(
    (rating: Rating) =>
      new Date(
        rating.createdAt.seconds * 1000 + rating.createdAt.nanoseconds / 1e6
      )
  );
  const dataPoints = sortedRatings.map((rating: Rating) => rating.rating);

  const data = {
    labels,
    datasets: [
      {
        label: "Stress Level",
        data: dataPoints,
        fill: false,
        borderColor: "#4F46E5",
        backgroundColor: "#4F46E5",
        tension: 0.1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    plugins: {
      title: {
        display: true,
        text: "Stress Ratings Over Time",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Stress Level: ${context.parsed.y}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time", // Explicitly specify 'time' here
        time: {
          unit: "day",
          tooltipFormat: "PP", // Pretty print date format
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4">
      <div style={{ height: "400px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default StressRatingChart;

// "use client";
// import React from "react";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/state/store";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   TimeScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";
// import "chartjs-adapter-date-fns"; // Import date adapter for time scale
// import { Timestamp } from "firebase/firestore";

// ChartJS.register(
//   TimeScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Define the type for the rating object
// type Rating = {
//   createdAt: Timestamp;
//   rating: number;
// };

// const StressRatingChart = () => {
//   const user = useAtomValue(userAtom);

//   if (!user) {
//     // Show custom skeleton resembling a chart
//     return (
//       <div className="mb-12">
//         {/* Skeleton Title */}
//         <div className="mb-6 mt-12 h-6 w-1/3 rounded bg-gray-200"></div>
//         <div className="ml-2 mt-4 border-b-4 border-l-4 border-gray-200 p-4">
//           <div className="animate-pulse">
//             {/* Skeleton Chart Bars */}
//             <div className="flex h-64 items-end space-x-4">
//               {Array(4)
//                 .fill(0)
//                 .map((_, idx) => (
//                   <div
//                     key={idx}
//                     className="w-1/5 rounded bg-gray-200"
//                     style={{ height: `${(idx + 1) * 15}%` }}
//                   ></div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const stressRatings: Rating[] = user.stressRating;

//   if (!stressRatings || stressRatings.length === 0) {
//     return <p>No stress rating data available.</p>;
//   }

//   // Process data: sort by date and prepare labels and data arrays
//   const sortedRatings = stressRatings
//     .filter((rating: Rating) => rating.createdAt)
//     .sort(
//       (a: Rating, b: Rating) => a.createdAt.toMillis() - b.createdAt.toMillis()
//     );

//   const labels = sortedRatings.map((rating: Rating) =>
//     rating.createdAt.toDate()
//   );
//   const dataPoints = sortedRatings.map((rating: Rating) => rating.rating);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stress Level",
//         data: dataPoints,
//         fill: false,
//         borderColor: "#4F46E5",
//         backgroundColor: "#4F46E5",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options: ChartOptions<"line"> = {
//     plugins: {
//       title: {
//         display: true,
//         text: "Stress Ratings Over Time",
//         font: {
//           size: 18,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `Stress Level: ${context.parsed.y}`;
//           },
//         },
//       },
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       x: {
//         type: "time", // Explicitly specify 'time' here
//         time: {
//           unit: "day",
//           tooltipFormat: "PP", // Pretty print date format
//         },
//         ticks: {
//           autoSkip: true,
//           maxTicksLimit: 10,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         max: 10,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   return (
//     <div className="p-4">
//       <div style={{ height: "400px" }}>
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default StressRatingChart;
