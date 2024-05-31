import { useEffect, useReducer } from "react";
import { initialState } from "./reducer/gameReducer";
import { reducer } from "./reducer/gameReducer";
import { useJudge } from "./components/hooks/useJudge";

function App() {
   const [state, dispatch] = useReducer(reducer, initialState);

   const [result] = useJudge(state.questions.length, state.points);

   useEffect(() => {
      if (state.game === "start") {
         fetch("http://localhost:3000/questions")
            .then((resp) => {
               resp.json().then((data) => {
                  dispatch({ type: "success", payload: data });
                  console.log(data);
               });
            })
            .catch(() => dispatch({ type: "failed" }));
      }
   }, [state.game]);

   return (
      <div className="h-screen grid grid-col-1 md:grid-cols-2">
         <div
            className="hidden md:grid place-content-center w-full bg-transparent bg-[url(/questions.jpg)]
          bg-no-repeat bg-cover bg-right relative overflow-hidden before:absolute before:inset-0 before:bg-black before:opacity-50 before:content-['']"
         >
            <div className="absolute right-0 top-0 w-[100vh] h-full rotate-90 ">
               <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                  className="relative block hw-full"
               >
                  <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="#000"></path>
               </svg>
            </div>
         </div>
         <div className="flex w-full justify-center items-center bg-black space-y-8 ">
            <div className="w-full px-8 md:px-32 lg:px-24 max-w-7xl mx-auto ">
               {state.game === "idle" ? (

                  <div className="max-w-[330px] mx-auto py-3 text-center bg-[#BAB0B0] rounded-[20px] text-[#1A1A1C] flex flex-col items-center justify-center font-bold">Let's take the quiz!</div>

               )
                  : state.game === "start" || state.game === "in-game" ? (
                     <>
                        {state.status === "loading" ? (
                           <h1 className="text-stone-200 font-bold text-xl text-center animate-pulse">Loading...</h1>
                        ) : state.status !== "failed" ? (
                           <>
                              <div className="grid place-content-center space-y-10">
                                 <h1 className="text-stone-400 font-bold text-3xl">
                                    Question :<span className="text-stone-200"> {state.questions[state.current].question}</span>
                                 </h1>
                                 <div className="mx-auto mt-6 w-full">
                                    <progress
                                       value={state.points}
                                       max={state.questions.length}
                                       className=" w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-stone-100 [&::-webkit-progress-value]:bg-indigo-500 [&::-moz-progress-bar]:bg-indigo-500"
                                    />
                                    <span className="text-indigo-300 font-bold text-lg">
                                       {state.points} <span className="text-stone-400 text-sm">/ {Math.floor(state.questions.length * 10)} points</span>
                                    </span>
                                 </div>
                                 <ul className="flex flex-col items-center gap-10">
                                    {state.questions[state.current].choices.map(({ id, choice }, index) => (
                                       <button
                                          disabled={state.choice !== null}
                                          type="button"
                                          onClick={() => dispatch({ type: "answer-question", payload: index })}
                                          key={id}
                                          className={`${state.choice === index ? "bg-indigo-500 hover:bg-indigo-400" : "bg-stone-300 hover:bg-stone-200"
                                             }  mx-auto rounded-md skew-x-12 py-3 px-5 text-md font-semibold tracking-wider hover:translate-x-2  transition-[transform, colors] duration-300 cursor-pointer inline-flex items-center w-full justify-between`}
                                       >
                                          {choice}
                                          <span>
                                             {state.choice === null ? null : state.questions[state.current].correct === index ? (
                                                <svg
                                                   className="animate-ping"
                                                   width="20"
                                                   viewBox="0 0 24 24"
                                                   fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                                >
                                                   <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                   <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                   <g id="SVGRepo_iconCarrier">
                                                      {" "}
                                                      <circle cx="12" cy="12" r="10" stroke="#3cb90e" stroke-width="1.5"></circle>{" "}
                                                      <path
                                                         d="M8.5 12.5L10.5 14.5L15.5 9.5"
                                                         stroke="#3cb90e"
                                                         stroke-width="1.5"
                                                         stroke-linecap="round"
                                                         stroke-linejoin="round"
                                                      ></path>{" "}
                                                   </g>
                                                </svg>
                                             ) : (
                                                <svg width="20" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                                   <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                   <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                   <g id="SVGRepo_iconCarrier">
                                                      {" "}
                                                      <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs>{" "}
                                                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                         {" "}
                                                         <g id="Icon-Set" transform="translate(-568.000000, -1087.000000)" fill="#ff0a0a">
                                                            {" "}
                                                            <path
                                                               d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z"
                                                               id="cross-circle"
                                                            >
                                                               {" "}
                                                            </path>{" "}
                                                         </g>{" "}
                                                      </g>{" "}
                                                   </g>
                                                </svg>
                                             )}
                                          </span>
                                       </button>
                                    ))}
                                 </ul>
                              </div>
                              <div className="w-full flex items-center justify-between mt-10">
                                 <div className="text-stone-200 px-5 py-2 border-b inline-flex items-center justify-center gap-3">
                                    <span>
                                       <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                          <g id="SVGRepo_iconCarrier">
                                             {" "}
                                             <g id="Calendar / Timer">
                                                {" "}
                                                <path
                                                   id="Vector"
                                                   d="M12 13V9M21 6L19 4M10 2H14M12 21C7.58172 21 4 17.4183 4 13C4 8.58172 7.58172 5 12 5C16.4183 5 20 8.58172 20 13C20 17.4183 16.4183 21 12 21Z"
                                                   stroke="#ffffff"
                                                   stroke-width="2"
                                                   stroke-linecap="round"
                                                   stroke-linejoin="round"
                                                ></path>{" "}
                                             </g>{" "}
                                          </g>
                                       </svg>
                                    </span>
                                    10:00
                                 </div>
                                 <div className="text-stone-200 px-5 py-2 border-b inline-flex items-center justify-center gap-3">
                                    <span>
                                       <svg width="20" fill="#fff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                          <g id="SVGRepo_iconCarrier">
                                             {" "}
                                             <title>stack</title>{" "}
                                             <path d="M8.984 9.047v-3.016h19v13.953h-3.016l0.062 3.031h-3.078v2.953h-18.936v-13.968h2.969v-3.016l2.999 0.063zM26.953 7h-17v2.047l15.078-0.062-0.062 10.031h1.984v-12.016zM24 10.016h-17.047v1.984h15v9.984h2.047v-11.968zM3.984 12.969v12.031h17v-12.031h-17z"></path>{" "}
                                          </g>
                                       </svg>
                                    </span>
                                    <span>{state.current + 1}/</span>
                                    <span>{state.questions.length} </span>
                                 </div>
                                 <button
                                    disabled={state.questions.length <= state.current || state.choice === null}
                                    onClick={() => dispatch({ type: "next" })}
                                    className="text-stone-200 px-5 py-2 border border-indigo-300 rounded-full hover:translate-x-1 transition-transform duration-500"
                                 >
                                    next
                                 </button>
                              </div>
                           </>
                        ) : (
                           <h1 className="text-stone-200 font-bold text-xl text-center">An Error occurred {":("}</h1>
                        )}
                     </>
                  ) : state.game === "finish" ? (
                     <div className="space-y-5">
                        <h1 className="text-stone-200 font-bold text-center tracking-wider text-3xl">Quiz is over</h1>
                        <dd className="text-center inline-flex items-center justify-center w-full space-x-10">
                           <dl className="text-stone-300">
                              Total questions: <span className="text-white font-bold text-xl"> {state.questions.length}</span>
                           </dl>
                           <dl className="text-stone-300">
                              Correct questions: <span className="text-white font-bold text-xl"> {state.points}</span>
                           </dl>
                        </dd>
                        <dd className="text-white text-center">
                           your knowledge about space : <span className="text-4xl font-bold text-white">{result}</span>
                        </dd>
                        <button
                           disabled={state.game !== "finish"}
                           onClick={() => dispatch({ type: "restart" })}
                           className="w-full mx-auto hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-gray-900 text-indigo-400 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                        >
                           Try again?
                        </button>
                     </div>
                  ) : null}
            </div>
         </div>
      </div>
   );
}

export default App;
