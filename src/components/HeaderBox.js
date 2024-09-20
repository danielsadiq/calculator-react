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

export default Header
