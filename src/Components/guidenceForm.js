import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { userContext } from "./userContext";

export default function GuidenceForm() {
    const navigate = useNavigate();
    const userCtx = useContext(userContext);

    return (<>
        <div style={{ padding: "10%" }}>
            {userCtx.firstName && userCtx.lastName ? <h1>Hello {userCtx.firstName} {userCtx.lastName}!</h1> : <h1>Hello!</h1>}
            <p>Instructions:</p>
            <p>* All the inputs is required.</p>
            <p>* please fill only true details.</p>
            <p>Good Luck!</p>
            <button className="btn btn-info" onClick={() => { navigate(`/`) }}>back to the form</button>
        </div>
    </>)
}