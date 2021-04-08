import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    
    const dispatch = useDispatch();

    const [formLoginValues, changeInputFormLoginValues] = useForm({
        lEmail: "pedro@gmail.com",
        lPassword: "123456"
    });

    const { lEmail, lPassword } = formLoginValues;
    

    const handleLogin = (event) => {
        event.preventDefault();
        
        dispatch(startLogin(lEmail, lPassword));
    }

    const [formRegisterValues, changeInputFormRegisterValues] = useForm({
        rName: "Pedro",
        rEmail: "pedro2@gmail.com",
        rPassword1: "123456",
        rPassword2: "123456"
    });

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;
    
    const handleRegister = (event) => {
        event.preventDefault();

        if(rPassword1 === rPassword2 ){
            dispatch(startRegister(rName, rEmail, rPassword1));
        } else {
            Swal.fire("Error", "Los password no son iguales", "error");
        }

    }

    return (
        <div 
            style={ 
                { 
                    backgroundImage: "url(/assets/img/background.jpg)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "left bottom"
                } 
            }
            className="container-fluid login-container"
        >
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin } >
                        <div className="form-group">
                            <input
                                name="lEmail"
                                onChange={ changeInputFormLoginValues } 
                                value={ lEmail }
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="lPassword"
                                onChange={ changeInputFormLoginValues }
                                value={ lPassword }
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister } >
                        <div className="form-group">
                            <input
                                name="rName"
                                value={rName}
                                onChange={ changeInputFormRegisterValues }
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="rEmail"
                                value={rEmail}
                                onChange={ changeInputFormRegisterValues }
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="rPassword1"
                                value={rPassword1}
                                onChange={ changeInputFormRegisterValues }
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                name="rPassword2"
                                value={rPassword2}
                                onChange={ changeInputFormRegisterValues }
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}