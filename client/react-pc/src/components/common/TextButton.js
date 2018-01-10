/**
 * @author Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextButton extends Component {

    render() {

        const {other, onClick, value} = this.props;

        return (
            <button className='text-button' type='button' {...other}onClick={onClick}>
                <span>{value}</span>
            </button>
        );

    }

}

TextButton.propTypes = {
    onClick: PropTypes.func,
    other: PropTypes.object,
    value: PropTypes.string
};

TextButton.defaultProps = {
    value: '提交'
};

export default TextButton;