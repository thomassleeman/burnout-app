import React from "react";

interface GreetingProps {
  userName: string;
}

const DynamicGreeting: React.FC<GreetingProps> = ({ userName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "morning";
    } else if (currentHour < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  return (
    <div className="text-left sm:pt-1">
      <p className="text-sm font-extralight text-gray-600">Welcome back,</p>
      <p className="text-xl font-bold text-gray-900 sm:text-2xl">
        {`Good ${getGreeting()}, ${userName}`}
      </p>
    </div>
  );
};

export default DynamicGreeting;
