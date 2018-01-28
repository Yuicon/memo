/**
 * @author Yuicon
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import logo from '../../assets/logo-1.png';

class Card extends Component {

    static propTypes = {
        onClick: PropTypes.func,
    };

    static defaultProps = {
      onClick: () => {}
    };

    render() {

        return (
            <div className="card" onClick={this.props.onClick}>
                <img  src={logo} alt="logo"/>
            </div>
        );

    }

}

export default Card;