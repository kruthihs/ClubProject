import React from "react";

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: []
    };
  }
  componentDidMount() {
    let that = this;
    fetch('./activities').then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log("Something went wrong while getting activities");
        return new Promise.reject(res.statusText);
      }
    }).then(function (activities) {
      that.setState({ activities: activities });
    })
  }
  render() {
    let header = <header>
      <h1>Dance it out!</h1>
      <h1>Now learn all your favourite moves at home.</h1>
      <h1>Activity Schedule</h1>
    </header>;

    let rows = this.state.activities.map(function (u) {
      return <tr key={u.name}><td>{u.name}</td><td>{u.dates}</td><td>{u.instructor}</td></tr>;
    });

    let activitiesTable = <main><table className="myTable">
      <thead><tr><th>Activity</th><th>Dates</th><th>Instructor</th></tr></thead>
      <tbody>{rows}</tbody>
    </table></main>;

    let footer = <footer>
      <p> &copy 2021 Dancers Hub</p>
    </footer>;

    return <section>{header}{activitiesTable}{footer}</section>
  }

}
module.exports = Activities;