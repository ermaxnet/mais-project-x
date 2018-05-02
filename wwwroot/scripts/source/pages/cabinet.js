import React, { Component } from "react";
import Cookie from "js-cookie";
import {
    COOKIE
} from "../../../../constants";
import { connect as socketConnect } from "../socket";
import { connect } from "react-redux";
import CabinetHeader from "../components/cabinet/header";
import MenuItem from "../components/cabinet/menu-item";
import BookHeader from "../components/book/header";
import SearchBox from "../components/cabinet/search-box";
import ContactsBook from "../components/book/contacts-book";
import Messenger from "../components/messenger";
import {
    showContactsBook,
    showSearchBook
} from "../models/cabinet";

class CabinetPage extends Component {
    componentWillMount() {
        socketConnect(() => {
            this.listContact();
        });
    }
    onExit(e) {
        e.preventDefault();
        Cookie.remove(COOKIE);
        window.location.href = "/";
    }
    onBack(e) {
        this.listContact(e);
    }
    listContact(e) {
        if(e) { e.preventDefault() };
        if(this.props.isContactsBook) { return; }
        showContactsBook();
    }
    boxSearch(e) {
        if(e) { e.preventDefault() };
        if(this.props.isSearchBook) { return; }
        showSearchBook();
    }
    render() {
        let cabinet = <span>Loading...</span>;
        if(this.props.isConnected) {
            let book = <span className="book-spinner">Loading...</span>;
            let boxSearch = null;
            if(this.props.isContactsBook) {
                book = (
                    <section className="book book__contacts">
                        <BookHeader text="Мои контакты" />
                        <ContactsBook />
                    </section>
                );
            }
            if(this.props.isSearchBook) {
                boxSearch = <SearchBox onBack={this.onBack.bind(this)} />;
                book = (
                    <section className="book book__search">
                        <BookHeader text="Результаты поиска" />
                    </section>
                );
            }
            cabinet = (
                <>
                    <div className="cabinet">
                        <aside className="cabinet__aside">
                            <CabinetHeader user={this.props.user} />
                            {this.props.isSearchBook
                                ? boxSearch
                                : (
                                    <ul className="cabinet__menu">
                                        <MenuItem key="contacts" icon="contact" onClick={this.listContact.bind(this)} isActive={this.props.isContactsBook} />
                                        <MenuItem key="search" icon="search" onClick={this.boxSearch.bind(this)} />
                                        <MenuItem key="exit" icon="exit" onClick={this.onExit.bind(this)} className="to-end" />
                                    </ul>
                                )
                            }
                            {book}
                        </aside>
                        <main className="cabinet__content">
                            <Messenger />
                        </main>
                    </div>
                </>
            );
        }
        return (
            <>
                {cabinet}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.cabinet.get("user"),
        isConnected: state.cabinet.get("isConnected"),
        isContactsBook: state.cabinet.get("isContactsBook"),
        isSearchBook: state.cabinet.get("isSearchBook")
    };
};
export default connect(mapStateToProps)(CabinetPage);