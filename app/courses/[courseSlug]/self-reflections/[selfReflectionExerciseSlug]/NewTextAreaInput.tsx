"use client";
//react
import { useState, useEffect } from "react";
//next
import Image from "next/image";
import { useRouter } from "next/navigation";
//firebase
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";
//Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
//components
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
//functions
import updateDatabase from "@exercises/selfReflectionExercises/updateDatabase";
//actions
import getFormattedDate from "@actions/getFormattedDate";
//Image
import logo from "@/components/design/brainLogoCompressed.png";
//types
import { Prompt } from "@/types/sanity";

export default function NewTextAreaForm({ prompt }: { prompt: Prompt }) {
  const [userInput, setUserInput] = useState("");

  return (
    <div className=" mb-20 p-4">
      <h2 className="text-2xl font-light">{prompt.title}</h2>
      <div className="">
        <PortableText
          value={prompt.instructions}
          components={portableTextComponents}
        />
      </div>
      <textarea
        name="userInput"
        className="my-6 h-40 w-full rounded-md"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      ></textarea>
    </div>
  );
}
