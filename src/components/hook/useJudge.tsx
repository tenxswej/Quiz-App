import { useState, useEffect } from "react";

export const useJudge = (total: number, correct: number) => {
   const [result, setResult] = useState<"Good" | "Bad">("Good");

   useEffect(() => {
      const isAboveAverage = Math.floor(total / 2) < correct;

      if (isAboveAverage) {
         setResult("Good");
      } else {
         setResult("Bad");
      }
   }, [total, correct]);

   return [result];
};
