import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes: (string | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface AudioProps {
  voiceFileOrAi: (aiVoice: boolean) => void;
  updateAudioFile: (audioFile: File | null) => void;
}

export default function Audio({ voiceFileOrAi, updateAudioFile }: AudioProps) {
  //Is the audio file an AI voice or a file?
  const [aiVoice, setAiVoice] = useState(false);
  voiceFileOrAi(aiVoice);

  const [audioFile, setAudioFile] = useState<File | null>(null);

  //send the audio file to the parent component
  updateAudioFile(audioFile);

  return (
    <section className="flex flex-col gap-y-2 font-sans">
      <div>
        <label
          htmlFor="audioFile"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-200"
        >
          Audio File
        </label>
        <div className="mt-2 flex items-center space-x-24">
          <input
            id="audioFile"
            name="audioFile"
            type="file"
            accept="mpeg/*"
            disabled={aiVoice}
            onChange={(e) => {
              if (e.target.files) {
                setAudioFile(e.target.files[0]);
              }
            }}
            className={`${
              aiVoice ? "text-white" : null
            } block w-full max-w-sm cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-slate-500 dark:border-blue-400/50 dark:bg-slate-700 sm:text-sm`}
          />
        </div>
      </div>
      <Switch.Group
        as="div"
        className="flex items-center justify-start gap-x-4 font-sans"
      >
        <span className="flex flex-col">
          <Switch.Label
            as="span"
            className="text-sm leading-6 text-gray-900"
            passive
          >
            Create Ai voice audio
          </Switch.Label>
          {/* <Switch.Description as="span" className="text-sm text-gray-500">
            Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
          </Switch.Description> */}
        </span>
        <Switch
          checked={aiVoice}
          onChange={setAiVoice}
          className={classNames(
            aiVoice ? "bg-emerald-600" : "bg-gray-300",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              aiVoice ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
      </Switch.Group>
    </section>
  );
}
