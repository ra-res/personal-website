import axios from "axios";
import * as React from "react";

interface IProps {}

interface IState {
  name: string;
  email: string;
  message: string;
}

export default class ContactMe extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
  }

  onNameChange(event: React.ChangeEvent<any>) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event: React.ChangeEvent<any>) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event: React.ChangeEvent<any>) {
    this.setState({ message: event.target.value });
  }

  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }

  handleSubmit(event: React.ChangeEvent<any>) {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    axios({
      method: "POST",
      url: "http://localhost:3002/send",
      data: this.state,
    }).then((response) => {
      if (response.data.status === "success") {
        alert("Message Sent.");
        this.resetForm();
      } else if (response.data.status === "fail") {
        alert("Message failed to send.");
      }
    });
  }

  render() {
    return (
      <form
        id="contact-form"
        onSubmit={this.handleSubmit.bind(this)}
        method="POST"
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={this.onNameChange.bind(this)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={this.onEmailChange.bind(this)}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            onChange={this.onMessageChange.bind(this)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
