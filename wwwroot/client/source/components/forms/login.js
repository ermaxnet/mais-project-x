import React from "react";
import PropTypes from "prop-types";
import {
    WELCOME_PAGE_STATE
} from "../../../../../constants";

const LoginForm = props => {
    return (
        <div className="login">
            <header className="login__header">
                <div className="login__header-title">
                    <span>Войдите</span>
                </div>
                <div className="login__header-note">
                    <span>если хотите войти в чат через ПЗК, установите соответствующий признак</span>
                </div>
            </header>
            <form className="form login__form">
                <div className="form__group">
                    <div className="form__control">
                        <label htmlFor="nick" className="form__label">Имя пользователя</label>
                        <input 
                            type="text" 
                            name="nick" 
                            id="nick" 
                            placeholder="Логин" 
                            className="form__input" 
                            value={props.nick}
                            onChange={props.onInput}
                        />
                    </div>
                </div>
                <div className="form__group">
                    <div className="form__control">
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
                </div>
                <div className="form__group">
                    <div className="form__control checkbox">
                        <input 
                            type="checkbox" 
                            name="isPzk" 
                            id="isPzk" 
                            className="form__input" 
                            checked={props.isPzk}
                            onChange={props.onInput}
                        />
                        <label htmlFor="isPzk" className="form__label">Войти через портал</label>
                    </div>
                </div>
                <div className="form__actions">
                    <button className="form__action btn btn-primary" onClick={props.onLogin}>Войти</button>
                    <a href="#" className="form__action btn-link" onClick={e => props.changeView(e, WELCOME_PAGE_STATE.REGISTER)}>Зарегистрироваться</a>
                </div>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    nick: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isPzk: PropTypes.bool.isRequired
};

export default LoginForm;