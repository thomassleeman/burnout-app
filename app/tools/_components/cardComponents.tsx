// // components/ui/card.jsx
// import React from "react";

// // Base Card component
// export const Card = ({ className = "", children, ...props }) => {
//   return (
//     <div
//       className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// };

// // Card Header component
// export const CardHeader = ({ className = "", children, ...props }) => {
//   return (
//     <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

// // Card Title component
// export const CardTitle = ({ className = "", children, ...props }) => {
//   return (
//     <h3
//       className={`text-2xl font-semibold leading-none tracking-tight text-gray-900 ${className}`}
//       {...props}
//     >
//       {children}
//     </h3>
//   );
// };

// // Card Description component
// export const CardDescription = ({ className = "", children, ...props }) => {
//   return (
//     <p className={`text-sm text-gray-500 ${className}`} {...props}>
//       {children}
//     </p>
//   );
// };

// // Card Content component
// export const CardContent = ({ className = "", children, ...props }) => {
//   return (
//     <div className={`p-6 pt-0 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };

// // Card Footer component
// export const CardFooter = ({ className = "", children, ...props }) => {
//   return (
//     <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
//       {children}
//     </div>
//   );
// };
