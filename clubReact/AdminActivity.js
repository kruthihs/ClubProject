import React from "react";
import ReactDOM from "react-dom";
import eventData from "./eventData.json";

class AdminActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dates: "",
            activities: eventData
        };

        this.updateForm = this.updateForm.bind(this);
        this.submit = this.submit.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }

    updateForm(fieldName, e) {
        this.setState({ [fieldName]: e.target.value });
    }

    submit() {
        if(!this.state.name || !this.state.dates) {
            return;
        }
        let act = {name: this.state.name, dates: this.state.dates};
        
        this.setState({activities: this.state.activities.concat(act)});
    }

    deleteActivity(act) {
        this.setState({activities: this.state.activities.filter(a => act !== a)})
    }

    render() {
        let header = <header>
            <h1>Activity Management</h1>
        </header>;
        let activities = this.state.activities.map(activity => <tr key={activity.name}>
            <td><button onClick={()=>{this.deleteActivity(activity)}}>Delete</button></td>
            <td>{activity.name}</td>
            <td>{activity.dates}</td>
        </tr>);


        let form = <main>
            <form>
                <label>Name: </label>
                <input id="name" type="text" value={this.state.name} onChange={(e) => this.updateForm("name", e)} required />

                <label>Dates: </label>
                <input id="dates" type="text" value={this.state.dates} onChange={(e) => this.updateForm("dates", e)} required />
            </form>
                <button  onClick={this.submit}>Add</button>

            <table>
               
               <thead>
               <tr>
               <th>Action</th>
               <th>Name</th>
               <th>Dates</th>
               </tr>
               </thead>
               <tbody>
                {activities}
               </tbody>
            </table>
        </main>;

        let footer = <footer>
            <p> &copy 2021 Dancers Hub</p>
        </footer>;

        return <section>{header}{form}{footer}</section>
    }
}

module.exports = AdminActivity;