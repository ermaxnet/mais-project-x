import React from "react";
import ReactDOM from "react-dom";

const reg = e => {
    e.preventDefault();
    fetch("http://localhost:8002/user", {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: "username=happyfrog&hash=darius&first_name=Максим&last_name=Ерёмин",
        mode: "cors"
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    });
};

ReactDOM.render(
    <div>
        <ul>
            <li key="reg">
                <button onClick={reg}>Register</button>
            </li>
        </ul>
    </div>,
    document.getElementById("root")
);