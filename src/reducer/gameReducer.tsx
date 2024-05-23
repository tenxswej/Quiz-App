export const initialState = {
    game : "idle",
    questions : [],
    status : "loading",
    points : 0,
    choice : null,
    current : 0
}

interface IChoice {
    id : number,
    choice : string
}

interface IQuestion {
    id : number,
    question : string,
    correct : number,
    choices : IChoice[]
}

type TState = {
    game : string,
    questions : IQuestion[] ,
    status : string,
    points : number,
    choice : number | null,
    current : number
}

type AppAction = { type : "success",payload : IQuestion[] } | {type : "failed"} | {type : "start"} | {type : "finish"} | {type : "answer-correct"} | {type : "next"} | {type : "answer-question",payload : number} | {type : "restart"}

export function reducer (state : TState, action : AppAction){

    switch(action.type){
        case "success":
            return {
                ...state, 
                status : "success",
                questions : action.payload
            };
        case "failed":
            return {
                ...state, 
                status : "failed",
        };
        case "start":
            return {
                ...state, 
                game : "start",
        };
        case "finish":
            return {
                ...state, 
                game : "finish",
        };
        case "answer-question":
            return {
                ...state, 
                choice : action.payload,
                points : state.questions[state.current].correct === action.payload ? state.points +1 : state.points
        };
        case "answer-correct":
            return {
                ...state, 
                points : state.points + 1,
        };
        case "next":
            return {
                ...state, 
                choice : null,
                game : state.questions.length -2 >=  state.current ? "in-game" : "finish",
                current : state.questions.length - 1>= state.current + 1 ? state.current + 1 : state.current,
        };
        case "restart":
            return {
                ...state,
                game : "start",
                points : 0,
                choice : null,
                current : 0,
        }

        default:
            return state
    }
}


