import React from "react";
import ReactDOM from "react-dom";

class Membership extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            phone: "",
            danceLevel: "",
            comments: "",
            showSubmission: false,
            failReason: "",
        };

        this.updateForm = this.updateForm.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateForm(fieldName, e) {
        this.setState({ [fieldName]: e.target.value });
    }

    submit() {
        let reason = "";
        if (this.state.name.length < 4 || this.state.name.length > 8) {
            reason = "Name should be between 4 to 8 characters";
        }
        //Submit data here.
        this.setState({ showSubmission: true, failReason: reason });
    }

    getSubmissionResult() {
        if (!this.state.showSubmission) {
            return;
        }
        return (
            <section className={this.state.failReason ? '' : 'thanks-dialog'} >
                <div className={"membership-submit"}>

                    <h3>{this.state.failReason ? "Oops. Error submitting your form." : "Thanks for Signing Up!"}</h3>
                    {this.state.failReason ? (<p>{this.state.failReason}</p>) : (<p>Welcome {this.state.name}, your email is {this.state.email}, your level is {this.state.danceLevel}, and you had the following comments: {this.state.comments}.</p>)}
                    <button onClick={() => { this.setState({ showSubmission: false }) }}>Close</button>
                </div>

            </section>

        );
    }

    render() {
        let header = <header>
            <h1>Apply Now!</h1>
        </header>;

        let form = <main>
            <form onSubmit={this.submit}>
                <label>Name: </label>
                <input id="name" type="text" minlength="4" maxlength="8" value={this.state.name} onChange={(e) => this.updateForm("name", e)} required />

                <label>Email: </label>
                <input id="email" type="email" placeholder="example@abc.com" pattern=".+@[a-z0-9.-]+\.com" size="30" value={this.state.email} onChange={(e) => this.updateForm("email", e)} required />

                <label>Password: </label>
                <input id="password" type="password" minlength="8" maxlength="10" value={this.state.password} onChange={(e) => this.updateForm("password", e)} required />

                <label>Phone: </label>
                <input id="phone" type="tel" size="20" minlength="10" maxlength="14" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="357-461-5839" value={this.state.phone} onChange={(e) => this.updateForm("phone", e)} required />

                <label>Dance Level: </label>
                <select value={this.state.danceLevel} onChange={(e) => this.updateForm("danceLevel", e)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Never">Never Danced before</option>
                </select>
                <label>Comments:</label>
                <textarea id="comments" maxlength="500" size="50" value={this.state.comments} onChange={(e) => this.updateForm("comments", e)}></textarea>
            </form>
            <button type="submit" onClick={this.submit}>Sign Up</button>

            {this.getSubmissionResult()}
        </main>;

        let footer = <footer>
            <p> &copy 2021 Dancers Hub</p>
        </footer>;

        return <section>{header}{form}{footer}</section>
    }
}

export default Membership;