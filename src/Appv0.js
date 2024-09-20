import { useEffect, useState, useReducer } from "react";
import { btnArr } from "./btnArr";

const math_it_up = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
	"x": function (x, y) { return x * y},
	"*": function (x, y) { return x * y},
	"/": function (x, y) { return Number.isInteger(x / y) ? x/y : 
		Math.round(((x/y)+ Number.EPSILON) * 1000)/1000},
}


export default function App() {
    const [theme, setTheme] = useState(1);
    // const [state, dispatch] = useReducer(reducer, initialItems);
    document.documentElement.classList = "";
    document.documentElement.classList.add(`theme-${theme}`);
    
	
    return (
        <div className="content theme-1">
            <Header>
				<ThemeInput name="y" theme={theme} setTheme={setTheme} />
                <ThemeInput name="i" theme={theme} setTheme={setTheme} />
                <ThemeInput name="n" theme={theme} setTheme={setTheme} />
			</Header>
			<Main />
        </div>
    );
}

function Header({children}) {
    
    return (
        <header>
            <h1>calc</h1>
            <p>theme</p>
            <div className="theme-box">
                <div className="numbers">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
                <div className="switch">
                    {children}
                    <span className="switch-selector"></span>
                </div>
            </div>
        </header>
    );
}

function ThemeInput({ name, theme, setTheme }) {
	let val = name === "y" ? 1 : name === "i" ? 2 : 3;
	
    return (
        <>
            <input
                id={`switch-${name}`}
                name="tripple"
                type="radio"
                value={name}
                className="switch-input"
                onChange={() => setTheme(val)}
                checked={val === theme}
            />
            <label
                htmlFor={`switch-${name}`}
                className={`switch-label switch-label-${name}`}
            >
                val
            </label>
        </>
    );
}


function Main() {
    const [active, setActive] = useState(0);
    const [previous, setPrevious] = useState(0);
    const [operand, setOperand] = useState("");
    const [trans, setTrans] = useState(false);

    function handleClick(num){
        if (trans){
            setActive(0);
            setTrans(false);
        }
		if(active.length < 9 || active === 0 || trans){
            setActive(active => {
			if (active === 0) return "" + num
			return "" + active + num;
		})}
	};
    function handleDel(){
        setActive(active => String(active).slice(0, active.length-1));
    }

    function handleOperand(oper){
        setPrevious(Number(active));
        console.log(active);
        setOperand(oper);
        setTrans(true);
    };

    function handleEqual(){
        if (operand){
            let ans = math_it_up[operand](Number(previous), Number(active));
            setActive(ans);
        }
        setActive(active => Number(active));
        setTrans(true);
    }

    function handleReset(){
        setActive(0);
        setPrevious(0);
        setOperand("");
        setTrans(false);
    }

    useEffect(function(){
        function callback(e) {
            if (Number(e.key)|| Number(e.key)===0){
                handleClick(e.key);
            }
            if (["+", "-", "/", "*"].includes(e.key)){
                handleOperand(e.key);
            }
            if (e.key === "Enter"){
                handleEqual();
            }
            if (e.key === "Delete" || e.key === "Backspace"){
                handleDel();
            }

        }
        document.addEventListener("keydown", callback)

        return () => {
            document.removeEventListener("keydown", callback)
        }
    },[handleClick, handleOperand, handleEqual, handleDel])

    return (
        <div className="main">
            <div className="input-box">
                <h1 id="value">{active}</h1>
            </div>
            <div className="button-box">
				{btnArr.map(x => 
					<Button key={x.char} btn={x} onClickBtn={handleClick} onClickOper={handleOperand} onDel={handleDel} />
				)}
                <button value="" className="reset span-2" onClick={handleReset}>
                    RESET
                </button>
                <button value="" className="equal span-2" onClick={handleEqual}>
                    =
                </button>
            </div>
        </div>
    );
}


function Button({btn, onClickBtn, onClickOper, onDel}){
    
    return <button value={btn.char} onClick={() => 
        btn.oper ? onClickOper(btn.char) : btn.special ? onDel() : onClickBtn(btn.char)
    }>{btn.char}</button>
   
}
