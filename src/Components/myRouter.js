import React from "react";
import { Route, Routes } from 'react-router-dom';
import Form from "./form";
import GuidenceForm from "./guidenceForm";
import UserContext from "./userContext";

export default function MyRouter() {

    return (<>
        <Routes>
            <Route path='' element={<UserContext><Form /></UserContext>} />
            <Route path='/guidence' element={<UserContext><GuidenceForm /></UserContext>} />
        </Routes>
    </>)
}