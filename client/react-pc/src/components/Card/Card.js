/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Card.css';

class Card extends Component {

    render() {

        return (
            <div className="card">

            </div>
        );

    }

}

Card.propTypes = {
    logo: PropTypes.string,
};

export default Card;