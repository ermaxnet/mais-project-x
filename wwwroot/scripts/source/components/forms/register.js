import React from "react";
import PropTypes from "prop-types";
import {
    WELCOME_PAGE_STATE
} from "../../../../../constants";

const RegisterForm = props => {
    return (
        <div className="login">
            <header className="login__header">
                <div className="login__header-title">
                    <span>Зарегистрируйтесь</span>
                </div>
                <div className="login__header-note">
                    <span>чтобы иногда покидать этот жестокий мир и растворяться на просторах нашего чата</span>
                </div>
            </header>
            <form className="form login__form">
                <div className="form__group">
                    <div className="form__control">
                        <label htmlFor="username" className="form__label">Имя пользователя</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Логин" 
                            className="form__input"
                            value={props.username} 
                            onChange={props.onInput}
                        />
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__control form__control_50">
                        <label htmlFor="password" className="form__label">Пароль</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Пароль" 
                            className="form__input" 
                            value={props.password} 
                            onChange={props.onInput}
                        />
                    </div>
                    <div className="form__control form__control_50">
                        <label htmlFor="password2" className="form__label">Повторите пароль</label>
                        <input 
                            type="password2" 
                            name="password2" 
                            id="password2" 
                            placeholder="Пароль" 
                            className="form__input"
                            value={props.password2} 
                            onChange={props.onInput} 
                        />
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__control form__control_50">
                        <label htmlFor="firstName" className="form__label">Имя</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            id="firstName" 
                            placeholder="Имя" 
                            className="form__input" 
                            value={props.firstName} 
                            onChange={props.onInput} 
                        />
                    </div>
                    <div className="form__control form__control_50">
                        <label htmlFor="lastName" className="form__label">Фамилия</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            placeholder="Фамилия" 
                            className="form__input"
                            value={props.lastName} 
                            onChange={props.onInput}  
                        />
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__control">
                        <label htmlFor="email" className="form__label">Адрес электронной почты</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="E-mail" 
                            className="form__input" 
                            value={props.email} 
                            onChange={props.onInput}  
                        />
                    </div>
                </div>
                <div className="form__actions">
                    <button className="form__action btn btn-primary" onClick={props.onRegister}>Продолжить</button>
                    <a href="#" className="form__action btn-link" onClick={e => props.changeView(e, WELCOME_PAGE_STATE.LOGIN)}>Вернуться</a>
                </div>
            </form>
        </div>
    );
};

RegisterForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default RegisterForm;