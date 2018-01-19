/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import logo from '../../assets/logo-1.png';

class Card extends Component {

    static propTypes = {
        logo: PropTypes.string,
    };

    render() {

        return (
            <div className="card">
                <img  src={logo} alt="logo"/>
            </div>
        );

    }

}

export default Card;