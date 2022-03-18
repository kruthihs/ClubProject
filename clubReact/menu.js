import React from 'react';

function Menu(props){

    function isActive(name) {
        if (name === props.showing) {
            return "active";
        } else {
            return "";
        }
    }
        let list = [
            <li>
                <a className={isActive("home")} 
                onClick={props.click.bind(null, "home")}>Home</a>
            </li>,
            <li>
                <a className={isActive("activities")}
                onClick={props.click.bind(null, "activities")}>Activities</a>
            </li>
        ];
        if (props.role === "guest") {
            list.push(
                <li>
                    <a className={isActive("login")}
                    onClick={props.click.bind(null, "login")}>Login</a>
                </li>
            );
            list.push(
                <li>
                    <a className={isActive("membership")}
                    onClick={props.click.bind(null, "membership")}>Membership</a>
                </li>
            );
        } 
        if(props.role === "admin"){ 
            list.push(
                <li>
                    <a className={isActive("logout")}
                    onClick={props.click.bind(null, "logout")}>Logout</a>
                </li>
            );
            list.push(
                <li>
                    <a className={isActive("adminActivity")}
                    onClick={props.click.bind(null, "adminActivity")}>Manage Activities</a>
                </li>
            );
        }
        if(props.role === "user") {
            list.push(
                <li>
                    <a className={isActive("logout")}
                    onClick={props.click.bind(null, "logout")}>Logout</a>
                </li>
            );
        }
        return (
            <nav>
                <ul>{list}</ul>
            </nav>
        );
}
export default Menu;