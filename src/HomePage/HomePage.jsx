import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="mainSection">
        <h1>Hi Tired Programmers Here!</h1>
        <img src="tired.jpg" alt="Tired Coders"/>
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
        {
          users.items && 
            <ul>
              {
                users.items.map((user, index) => 
                  <li key={user.id}>
                    {user.firstName + " " + user.lastName}
                    {
                      user.deleting ? <em> - Deleting...</em> 
                      : user.deleteError ?  <span className="text-danger">{" "}- ERROR: {user.deleteError} </span> : 
                      <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span> 
                    }
                  </li>
                )
              }
            </ul>
        }
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./../../sw_cached_pages.js")
      .then(reg => console.log("Service Worker: Registered (Pages)"))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
