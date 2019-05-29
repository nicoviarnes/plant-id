import React, { Component } from "react";
import decode from "jwt-decode";

export class Protected extends Component {
  render() {
    const { id } = decode(localStorage.getItem("x-auth-token"));

    return (
      <div>
        <p>Protected Page testing</p>
      </div>
    );
  }
}

export default Protected;
