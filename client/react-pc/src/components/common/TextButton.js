/**
 * @author Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TextButton extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        other: PropTypes.object,
        value: PropTypes.string
    };

    static defaultProps = {
        value: '提交'
    };

    render() {

        const {other, onClick, value} = this.props;

        return (
            <button className='text-button' type='button' {...other}onClick={onClick}>
                <span>{value}</span>
            </button>
        );

    }

}

export default TextButton;