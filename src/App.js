import { useState, useReducer } from "react";
import { btnArr } from "./btnArr";
import Header from "./components/HeaderBox";
import ThemeInput from "./components/ThemeInput";

const math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
	"x": function (x, y) { return x * y},
	"*": function (x, y) { return x * y},
	"/": function (x, y) { return Number.isInteger(x / y) ? x/y : 
		Math.round(((x/y)+ Number.EPSILON) * 1000)/1000},
}


const initialItems = {
    active: 0,
    previous: 0,
    operand: "",
    trans: false,
};

function reducer(state, action) {
    const { active, previous, operand } = state;
    switch (action.type) {
        case "trans":
            return { ...state, active: 0, trans: false };
        case "addNumber":
            return {
                ...state,
                active:
                    active === 0
                        ? "" + action.payload
                        : "" + active + action.payload,
            };
        case "deleteDigit":
            return {
                ...state,
                active: String(active).slice(0, active.length - 1),
            };
        case "operand":
            return {
                ...state,
                previous: Number(active),
                operand: action.payload,
                trans: true,
            };
        case "handleEqual":
            return {
                ...state,
                active: Number(
                    math_it_up[operand](Number(previous), Number(active))
                ),
                trans: true,
            };
        case "reset":
            return initialItems;

        default:
            break;
    }
}

export default function App() {
    const [theme, setTheme] = useState(1);
    const [state, dispatch] = useReducer(reducer, initialItems);
    document.documentElement.classList = "";
    document.documentElement.classList.add(`theme-${theme}`);

    return (
        <div className="content theme-1">
            <Header>
                <ThemeInput name="y" theme={theme} setTheme={setTheme} />
                <ThemeInput name="i" theme={theme} setTheme={setTheme} />
                <ThemeInput name="n" theme={theme} setTheme={setTheme} />
            </Header>
            <Main state={state} dispatch={dispatch} />
        </div>
    );
}

function Main({ state, dispatch }) {

    function handleClick(num){
        if (state.trans) dispatch({type:"trans"})
		dispatch({type:"addNumber", payload:num});
	};

    return (
        <div className="main">
            <div className="input-box">
                <h1 id="value">{state.active}</h1>
            </div>
            <div className="button-box">
                {btnArr.map((x) => (
                    <Button key={x.char} btn={x} dispatch={dispatch} handleClick={handleClick} />
                ))}
                <button
                    value=""
                    className="reset span-2"
                    onClick={() => dispatch({ type: "reset" })}
                >
                    RESET
                </button>
                <button
                    value=""
                    className="equal span-2"
                    onClick={() => dispatch({ type: "handleEqual" })}
                >
                    =
                </button>
            </div>
        </div>
    );
}

function Button({ btn, dispatch, handleClick }) {
    return (
        <button
            value={btn.char}
            onClick={() =>
                btn.oper
                    ? dispatch({ type: "operand", payload: btn.char })
                    : btn.special
                    ? dispatch({ type: "deleteDigit", payload: btn.char })
                    : handleClick(btn.char)
                    // : dispatch({type: "addNumber", payload: btn.char})
            }
        >
            {btn.char}
        </button>
    );
}
