import React, { createContext, useState } from "react";

export const userContext = createContext();

export default function UserContext(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tz, setTz] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState();
    const [hmo, setHmo] = useState('');
    const [numChildren, setNumChildren] = useState(0);
    const [childrenForms, setChildrenForms] = useState([]);

    return (
        <userContext.Provider value={{
            firstName, setFirstName, lastName, setLastName, tz, setTz, gender, setGender,
            birthdate, setBirthdate, hmo, setHmo, numChildren, setNumChildren,childrenForms,setChildrenForms
        }}>
            {props.children}
        </userContext.Provider>
    )
}