"use client";

interface GetStartedButtonProps {
  setRevealExercise: (value: boolean) => void;
}

export default function GetStartedButton({
  setRevealExercise,
}: GetStartedButtonProps) {
  return (
    <button
      onClick={() => setRevealExercise(true)}
      className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      Get Started
    </button>
  );
}
