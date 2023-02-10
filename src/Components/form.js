import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "./userContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Form() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const userCtx = useContext(userContext);
    const navigate = useNavigate();

    const handleChange = (index, event) => {
        let data = [...userCtx.childrenForms];
        data[index][event.target.name] = event.target.value;
        userCtx.setChildrenForms(data);
    }

    const changeNumChildren = (e) => {
        let cur = e.target.value;
        userCtx.setNumChildren(cur);
        let tmpForms = [];
        for (let i = 0; i < cur; i++) {
            if (i < userCtx.childrenForms.length) {
                tmpForms.push(userCtx.childrenForms[i]);
            }
            else {
                tmpForms.push({ name: '', tzChild: '', birthDate: new Date() });
            }
        }
        userCtx.setChildrenForms(tmpForms);
    }
    const getChildrensForms = () => {
        if (userCtx.childrenForms.length) {
            return (<div>
                {userCtx.childrenForms.map((form, idx) => {
                    return (
                        <div key={idx}>
                            <p>Child {idx + 1} details</p>
                            <br />
                            <label className="form-label" >Child {idx + 1} Name</label>
                            <input
                                name='name'
                                type="text"
                                defaultValue={form.name}
                                className="form-control"
                                {...register("name", { required: true })}
                                {...errors.name && errors.name.type === "required" && (<p>child name required</p>)} onChange={(e) => { handleChange(idx, e) }} />
                            <label className="form-label" >Child {idx + 1} TZ</label>
                            <input
                                name='tzChild'
                                type="text"
                                defaultValue={form.tzChild}
                                className="form-control"
                                {...register("tzChild", { required: true })}
                                {...errors.tzChild && errors.tzChild.type === "required" && (<p>child tz required</p>)}
                                onChange={(e) => { handleChange(idx, e) }} />
                            <label className="form-label" >Child {idx + 1} Birthdate</label>
                            <input
                                name='birthDate'
                                type="date"
                                defaultValue={form.birthDate}
                                className="form-control"
                                {...register("birthDate", { required: true, valueAsDate: true })}
                                {...errors.birthDate && errors.birthDate.type === "required" && (<p>child birthDate required</p>)}
                                {...errors.birthDate && errors.birthDate.type === "valueAsDate" && (<p>child birthDate must be a date</p>)}
                                onChange={(e) => { handleChange(idx, e) }} />
                            <br />
                        </div>
                    )
                })}</div>)
        }
    }
    const onSubmit = async () => {
        let eGender = 0;
        let eHmo = 0;
        if (userCtx.gender === "male") {
            eGender = 1;
        }
        if (userCtx.hmo === "Meuhedet") {
            eHmo = 1;
        }
        else if (userCtx.hmo === "Leumi") {
            eHmo = 2;
        }
        else if (userCtx.hmo === "Clalit") {
            eHmo = 3;
        }
        await axios({
            method: 'post',
            url: 'https://localhost:7023/api/Users',
            data: {
                "firstName": userCtx.firstName,
                "lastName": userCtx.lastName,
                "identity": userCtx.tz,
                "birthday": userCtx.birthdate,
                "gender": eGender,
                "hmo": eHmo
            }
        })
        await axios.get(`https://localhost:7023/api/Users/${userCtx.tz}`)
            .then(result => {
                const parentId = result.data.id;
                userCtx.childrenForms.map((child, idx) => {
                    axios({
                        method: 'post',
                        url: 'https://localhost:7023/api/Childrens',
                        data: {
                            "firstName": child.name,
                            "birthday": child.birthDate,
                            "identity": child.tz,
                            "idParent": parentId
                        }
                    }).then(result => {
                        console.log(result);
                        alert("send succesfully!");
                    })
                })
            })
    }
    return (<div style={{ margin: "20%", marginTop: "5%" }} >
        <form onSubmit={handleSubmit(onSubmit)} style={{ left: '40%' }}>
            <label className="form-label">First Name</label>
            <input className="form-control" type="text" name="firstName" defaultValue={userCtx.firstName}
                {...register("firstName", { required: true, pattern: { value: "^[a-zA-Zא-ת]+$", message: "invalid name" } })} onChange={(e) => { userCtx.setFirstName(e.target.value) }} />
            {errors.firstName && errors.firstName.type === "required" && (<p>First Name is required</p>)}
            {errors.firstName && errors.firstName.type === "pattern" && (<p>invalid name</p>)}
            <label className="form-label" >Last Name</label>
            <input className="form-control" type="text" name="lastName" defaultValue={userCtx.lastName}
                {...register("lastName", { required: true, pattern: { value: "^[a-zA-Zא-ת]+$", message: "invalid name" } })} onChange={(e) => { userCtx.setLastName(e.target.value) }} />
            {errors.lastName && errors.lastName.type === "required" && (<p>Last Name is required</p>)}
            {errors.lastName && errors.lastName.type === "pattern" && (<p>invalid name</p>)}
            <label className="form-label" >TZ</label>
            <input className="form-control" type="text" name="tz" defaultValue={userCtx.tz}
                {...register("tz", { required: true, minLength: 9, maxLength: 9, valueAsNumber: true })} onChange={(e) => { userCtx.setTz(e.target.value) }} />
            {errors.tz && errors.tz.type === "required" && (<p>TZ required</p>)}
            {errors.tz && errors.tz.type === "minLength" && (<p>TZ Length 9</p>)}
            {errors.tz && errors.tz.type === "maxLength" && (<p>TZ Length 9</p>)}
            {errors.tz && errors.tz.type === "valueAsNumber" && (<p>TZ is only numbers</p>)}
            <label>Birthday</label>
            <input className="form-control" type="date" name="birthday" defaultValue={userCtx.birthdate}
                {...register("birthday", { required: true, valueAsDate: true })} onChange={(e) => { userCtx.setBirthdate(e.target.value) }} />
            {errors.birthdate && errors.birthdate.type === "required" && (<p>Birthdate is required</p>)}
            <label className="form-label">Gender</label>
            <select className="form-select" defaultValue={userCtx.gender}
                {...register("gender")} onChange={(e) => { userCtx.setGender(e.target.value) }}>
                <option value="noone"></option>
                <option value="female">female</option>
                <option value="male">male</option>
            </select>
            <label className="form-label">HMO</label>
            <select className="form-select" defaultValue={userCtx.hmo}
                {...register("hmo")} onChange={(e) => { userCtx.setHmo(e.target.value) }}>
                <option value="noone"></option>
                <option value="Maccabi">Maccabi</option>
                <option value="Meuhedet">Meuhedet</option>
                <option value="Leumi">Leumi</option>
                <option value="Clalit">Clalit</option>
            </select>
            <label className="form-label">enter num of childrens</label>
            <input className="form-control" type="number" defaultValue={userCtx.numChildren}{...register("numChildren", { required: true, min: 0 })}
                onChange={changeNumChildren} />
            {getChildrensForms()}
            <button className="btn btn-info" type="submit" style={{ margin: "1px" }}>Save </button>
            <button className="btn btn-info" onClick={() => { navigate(`/guidence`) }} style={{ margin: "1px" }}>Instructions</button>
        </form>
    </div >)
}