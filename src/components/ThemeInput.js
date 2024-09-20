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

export default ThemeInput