function Login(props){
    let header = <header>
        <h1>Let's Begin!</h1>
        <p>Login with your Email and Password.</p>
    </header>;
    
    let form = <main><form>
            <label>Email: </label>
            <input type="email"/>

            <label>Password: </label>
            <input type="password"/>

            <button type="button">Login</button>
        </form></main>;
    
    let footer = <footer>
    <p> &copy 2021 Dancers Hub</p>
    </footer>;
    
    return <section>{header}{form}{footer}</section>
    }
    
    export default Login;