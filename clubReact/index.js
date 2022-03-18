import React from "react";
import ReactDOM from "react-dom";
import Menu from "./menu";
import Home from "./home";
import Activities from "./activities";
import Login from "./login";
import Membership from "./membership";
import AdminActivity from "./adminActivity";
import events from "./eventData.json";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { role: "admin", show: "home" };
    }

    menuClick(item) {
        if (item === "logout") {
            this.setState({ role: "guest", show: "home" });
        } else {
            this.setState({ show: item });
        }
    }


    render() {
        let content = <Home />;
        switch (this.state.show) {
            case "home":
                content = <Home />;
                break;
            case "activities":
                content = <Activities events={events} />;
                break;
            case "login":
                content = <Login />;
                break;
            case "membership":
                content = <Membership />;
                break;
            case "adminActivity":
                content = <AdminActivity events={events} />;
                break;
        }
        return (
            <div>
                <Menu role={this.state.role} showing={this.state.show} click={this.menuClick.bind(this)} />
                {content}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
