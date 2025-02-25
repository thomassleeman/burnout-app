// app/chatbot/_components/SuggestedPrompts.tsx

type Prompt = {
  content: string;
  onClick: () => void;
};

type SuggestedPromptsProps = {
  prompts: Prompt[];
};

const SuggestedPrompts = ({ prompts }: SuggestedPromptsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          onClick={prompt.onClick}
          className="rounded-lg border border-gray-700/25 bg-transparent p-3 text-left transition-colors hover:border-emerald-400"
        >
          <p className="font-thin text-gray-900">{prompt.content}</p>
        </button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
