// "use client";
// import React, { useState } from "react";

// import {
//   ChevronDownIcon,
//   ChevronUpIcon,
//   PlusIcon,
//   TrashIcon,
//   CheckCircleIcon,
//   ExclamationCircleIcon,
// } from "@heroicons/react/24/outline";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../_components/cardComponents";

// const TaskDecomposer = () => {
//   const [taskName, setTaskName] = useState("");
//   const [procrastinationReason, setProcrastinationReason] = useState("");
//   const [subtasks, setSubtasks] = useState([]);
//   const [newSubtask, setNewSubtask] = useState("");
//   const [showAnalysis, setShowAnalysis] = useState(false);
//   const [selectedSubtask, setSelectedSubtask] = useState(null);
//   const [subtaskBlockers, setSubtaskBlockers] = useState({});
//   const [showSubtaskAnalysis, setShowSubtaskAnalysis] = useState(false);
//   const [subtaskNotes, setSubtaskNotes] = useState({});
//   const [emotionalBlocks, setEmotionalBlocks] = useState({
//     fear: false,
//     overwhelm: false,
//     perfectionism: false,
//     unclear: false,
//     lowEnergy: false,
//     conflict: false,
//   });

//   const commonBlockers = [
//     {
//       id: "fear",
//       label: "Fear of failure/judgment",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         'Start with a "rough draft" approach - explicitly label it as practice',
//         "Set a timer for just 10 minutes of work without judgment",
//         "Share progress with a trusted colleague for early feedback",
//       ],
//     },
//     {
//       id: "overwhelm",
//       label: "Feeling overwhelmed",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         "Break tasks into 15-minute chunks or smaller",
//         "Focus on one small component at a time",
//         "Create a visual map of all pieces to see the full picture",
//       ],
//     },
//     {
//       id: "perfectionism",
//       label: "Perfectionism",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         'Set explicit "good enough" criteria for each subtask',
//         "Schedule specific revision time after completion",
//         "Use timeboxing to limit overthinking",
//       ],
//     },
//     {
//       id: "unclear",
//       label: "Unclear next steps",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         "Start with a brain dump of all possible actions",
//         "Identify the smallest possible clear action",
//         "Schedule a planning session as your first task",
//       ],
//     },
//     {
//       id: "lowEnergy",
//       label: "Low energy/motivation",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         "Schedule tasks during your peak energy time",
//         "Break into 5-minute mini-tasks",
//         "Pair difficult tasks with something enjoyable",
//       ],
//     },
//     {
//       id: "conflict",
//       label: "Conflict avoidance",
//       icon: ExclamationCircleIcon,
//       strategies: [
//         "Script out difficult conversations in advance",
//         "Start with email/async communication if easier",
//         "Focus first on gathering information rather than decisions",
//       ],
//     },
//   ];

//   const handleAddSubtask = () => {
//     if (newSubtask.trim()) {
//       const newId = Date.now();
//       setSubtasks([
//         ...subtasks,
//         {
//           id: newId,
//           text: newSubtask,
//           timeEstimate: "15min",
//           completed: false,
//           expanded: false,
//           difficulty: "medium",
//           priority: "medium",
//         },
//       ]);
//       setSubtaskBlockers({
//         ...subtaskBlockers,
//         [newId]: [],
//       });
//       setSubtaskNotes({
//         ...subtaskNotes,
//         [newId]: "",
//       });
//       setNewSubtask("");
//     }
//   };

//   const handleSubtaskBlockerToggle = (subtaskId, blockerId) => {
//     setSubtaskBlockers((prev) => ({
//       ...prev,
//       [subtaskId]: prev[subtaskId].includes(blockerId)
//         ? prev[subtaskId].filter((id) => id !== blockerId)
//         : [...prev[subtaskId], blockerId],
//     }));
//   };

//   const handleSubtaskNote = (subtaskId, note) => {
//     setSubtaskNotes((prev) => ({
//       ...prev,
//       [subtaskId]: note,
//     }));
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "easy":
//         return "bg-green-100 text-green-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "hard":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getSubtaskStrategy = (subtaskId) => {
//     const blockers = subtaskBlockers[subtaskId] || [];
//     if (blockers.length === 0) return [];

//     const strategies = blockers.flatMap((blockerId) => {
//       const blocker = commonBlockers.find((b) => b.id === blockerId);
//       return blocker ? blocker.strategies : [];
//     });

//     return [...new Set(strategies)]; // Remove duplicates
//   };

//   const toggleSubtaskExpansion = (id) => {
//     setSubtasks(
//       subtasks.map((task) =>
//         task.id === id ? { ...task, expanded: !task.expanded } : task
//       )
//     );
//   };

//   const updateSubtaskTime = (id, time) => {
//     setSubtasks(
//       subtasks.map((task) =>
//         task.id === id ? { ...task, timeEstimate: time } : task
//       )
//     );
//   };

//   const toggleSubtaskComplete = (id) => {
//     setSubtasks(
//       subtasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );
//   };

//   const removeSubtask = (id) => {
//     setSubtasks(subtasks.filter((task) => task.id !== id));
//   };

//   const toggleEmotionalBlock = (blockId) => {
//     setEmotionalBlocks({
//       ...emotionalBlocks,
//       [blockId]: !emotionalBlocks[blockId],
//     });
//   };

//   const getProgressPercentage = () => {
//     if (subtasks.length === 0) return 0;
//     const completed = subtasks.filter((task) => task.completed).length;
//     return Math.round((completed / subtasks.length) * 100);
//   };

//   const getTotalTimeEstimate = () => {
//     return subtasks.reduce((total, task) => {
//       const minutes = parseInt(task.timeEstimate);
//       return isNaN(minutes) ? total : total + minutes;
//     }, 0);
//   };

//   return (
//     <div className="mx-auto max-w-4xl p-4">
//       <Card className="mb-6">
//         <CardHeader>
//           <CardTitle>Task Decomposer</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             {/* Task Name Input */}
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 What task are you putting off?
//               </label>
//               <input
//                 type="text"
//                 value={taskName}
//                 onChange={(e) => setTaskName(e.target.value)}
//                 className="w-full rounded border p-2"
//                 placeholder="Enter task name"
//               />
//             </div>

//             {/* Emotional Blockers */}
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 What's making this task difficult? (Select all that apply)
//               </label>
//               <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
//                 {commonBlockers.map((blocker) => (
//                   <button
//                     key={blocker.id}
//                     onClick={() => toggleEmotionalBlock(blocker.id)}
//                     className={`flex items-center gap-2 rounded p-2 transition-colors ${
//                       emotionalBlocks[blocker.id]
//                         ? "border-blue-300 bg-blue-100"
//                         : "border-gray-200 bg-gray-50"
//                     } border`}
//                   >
//                     <blocker.icon className="h-5 w-5" />
//                     <span>{blocker.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Procrastination Reason */}
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 What specifically about this task makes you procrastinate?
//               </label>
//               <textarea
//                 value={procrastinationReason}
//                 onChange={(e) => setProcrastinationReason(e.target.value)}
//                 className="w-full rounded border p-2"
//                 rows="3"
//                 placeholder="Be honest with yourself..."
//               />
//             </div>

//             {/* Subtasks Section */}
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Break it down into smaller steps
//               </label>
//               <div className="mb-4 flex gap-2">
//                 <input
//                   type="text"
//                   value={newSubtask}
//                   onChange={(e) => setNewSubtask(e.target.value)}
//                   className="flex-1 rounded border p-2"
//                   placeholder="Add a small, specific step"
//                   onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
//                 />
//                 <button
//                   onClick={handleAddSubtask}
//                   className="rounded bg-emerald-600 p-2 text-white hover:bg-emerald-700"
//                 >
//                   <PlusIcon className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Subtasks List */}
//               <div className="space-y-2">
//                 {subtasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className={`rounded border p-2 ${
//                       task.completed ? "bg-gray-50" : "bg-white"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => toggleSubtaskComplete(task.id)}
//                         className={`rounded-full p-1 ${
//                           task.completed ? "text-green-500" : "text-gray-400"
//                         }`}
//                       >
//                         <CheckCircleIcon className="h-5 w-5" />
//                       </button>
//                       <span
//                         className={
//                           task.completed ? "text-gray-500 line-through" : ""
//                         }
//                       >
//                         {task.text}
//                       </span>
//                       <div className="ml-auto flex items-center gap-2">
//                         <span className="text-sm text-gray-500">
//                           {task.timeEstimate}
//                         </span>
//                         <button
//                           onClick={() => toggleSubtaskExpansion(task.id)}
//                           className="p-1 text-gray-400 hover:text-gray-600"
//                         >
//                           {task.expanded ? (
//                             <ChevronUpIcon className="h-5 w-5" />
//                           ) : (
//                             <ChevronDownIcon className="h-5 w-5" />
//                           )}
//                         </button>
//                         <button
//                           onClick={() => removeSubtask(task.id)}
//                           className="p-1 text-gray-400 hover:text-red-500"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </div>

//                     {task.expanded && (
//                       <div className="mt-2 pl-8">
//                         <div className="space-y-4">
//                           {/* Time and Difficulty Controls */}
//                           <div className="flex gap-4">
//                             <div>
//                               <label className="mb-1 block text-sm text-gray-600">
//                                 Time Estimate
//                               </label>
//                               <select
//                                 value={task.timeEstimate}
//                                 onChange={(e) =>
//                                   updateSubtaskTime(task.id, e.target.value)
//                                 }
//                                 className="rounded border p-1 text-sm"
//                               >
//                                 <option value="5min">5 minutes</option>
//                                 <option value="15min">15 minutes</option>
//                                 <option value="30min">30 minutes</option>
//                                 <option value="1hr">1 hour</option>
//                                 <option value="2hr">2 hours</option>
//                               </select>
//                             </div>
//                             <div>
//                               <label className="mb-1 block text-sm text-gray-600">
//                                 Difficulty
//                               </label>
//                               <select
//                                 value={task.difficulty}
//                                 onChange={(e) =>
//                                   setSubtasks(
//                                     subtasks.map((t) =>
//                                       t.id === task.id
//                                         ? { ...t, difficulty: e.target.value }
//                                         : t
//                                     )
//                                   )
//                                 }
//                                 className={`rounded border p-1 text-sm ${getDifficultyColor(
//                                   task.difficulty
//                                 )}`}
//                               >
//                                 <option value="easy">Easy</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="hard">Hard</option>
//                               </select>
//                             </div>
//                           </div>

//                           {/* Blockers Section */}
//                           <div>
//                             <label className="mb-2 block text-sm text-gray-600">
//                               What's making this step difficult?
//                             </label>
//                             <div className="grid grid-cols-2 gap-2">
//                               {commonBlockers.map((blocker) => (
//                                 <button
//                                   key={blocker.id}
//                                   onClick={() =>
//                                     handleSubtaskBlockerToggle(
//                                       task.id,
//                                       blocker.id
//                                     )
//                                   }
//                                   className={`flex items-center gap-2 rounded p-2 text-sm transition-colors ${
//                                     (subtaskBlockers[task.id] || []).includes(
//                                       blocker.id
//                                     )
//                                       ? "border-emerald-300 bg-emerald-100"
//                                       : "border-gray-200 bg-gray-50"
//                                   } border`}
//                                 >
//                                   <blocker.icon className="h-3.5 w-3.5" />
//                                   <span>{blocker.label}</span>
//                                 </button>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Notes Section */}
//                           <div>
//                             <label className="mb-1 block text-sm text-gray-600">
//                               Specific challenges with this step:
//                             </label>
//                             <textarea
//                               value={subtaskNotes[task.id] || ""}
//                               onChange={(e) =>
//                                 handleSubtaskNote(task.id, e.target.value)
//                               }
//                               className="w-full rounded border p-2 text-sm"
//                               rows="2"
//                               placeholder="What specifically makes this step challenging?"
//                             />
//                           </div>

//                           {/* Strategies Section */}
//                           {(subtaskBlockers[task.id] || []).length > 0 && (
//                             <div className="rounded bg-blue-50 p-3">
//                               <h4 className="mb-2 text-sm font-medium">
//                                 Suggested Strategies:
//                               </h4>
//                               <ul className="space-y-2">
//                                 {getSubtaskStrategy(task.id).map(
//                                   (strategy, idx) => (
//                                     <li
//                                       key={idx}
//                                       className="flex items-start gap-2 text-sm"
//                                     >
//                                       <span className="text-blue-500">•</span>
//                                       {strategy}
//                                     </li>
//                                   )
//                                 )}
//                               </ul>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Personalized Strategies */}
//             <div className="mt-6">
//               <h3 className="mb-4 text-lg font-medium">
//                 Personalized Strategies
//               </h3>
//               <div className="space-y-4">
//                 {Object.entries(emotionalBlocks)
//                   .filter(([id, isSelected]) => isSelected)
//                   .map(([id]) => {
//                     const blocker = commonBlockers.find((b) => b.id === id);
//                     return (
//                       <div key={id} className="rounded bg-blue-50 p-4">
//                         <h4 className="flex items-center gap-2 font-medium">
//                           <blocker.icon className="h-4 w-4" />
//                           {blocker.label}
//                         </h4>
//                         <ul className="mt-2 space-y-2">
//                           {blocker.strategies.map((strategy, index) => (
//                             <li key={index} className="flex items-start gap-2">
//                               <span className="text-blue-500">•</span>
//                               {strategy}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>

//             {/* Additional Context */}
//             {procrastinationReason && (
//               <div className="mt-4 rounded bg-gray-50 p-4">
//                 <h4 className="mb-2 font-medium">Your Reflection</h4>
//                 <p className="italic text-gray-600">
//                   "{procrastinationReason}"
//                 </p>
//                 <div className="mt-2">
//                   <button
//                     onClick={() => setShowAnalysis(!showAnalysis)}
//                     className="text-sm text-blue-500 hover:underline"
//                   >
//                     {showAnalysis ? "Hide Analysis" : "Analyze This"}
//                   </button>
//                   {showAnalysis && (
//                     <div className="mt-2 text-sm">
//                       <p>Based on your reflection, consider:</p>
//                       <ul className="mt-1 space-y-1">
//                         <li>
//                           • Breaking down any vague aspects into specific
//                           actions
//                         </li>
//                         <li>
//                           • Identifying specific time blocks for focused work
//                         </li>
//                         <li>
//                           • Setting clear "done" criteria for each subtask
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Progress Overview */}
//             {subtasks.length > 0 && (
//               <div className="mt-6 rounded bg-gray-50 p-4">
//                 <div className="mb-2 flex justify-between">
//                   <span className="text-sm font-medium">Progress</span>
//                   <span className="text-sm">{getProgressPercentage()}%</span>
//                 </div>
//                 <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
//                   <div
//                     className="h-2 rounded-full bg-green-500"
//                     style={{ width: `${getProgressPercentage()}%` }}
//                   />
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Estimated total time: {getTotalTimeEstimate()} minutes
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default TaskDecomposer;
