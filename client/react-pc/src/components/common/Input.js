/**
 * Created by Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {

    static propTypes = {
        type: PropTypes.string,
        name: PropTypes.string,
        id: PropTypes.string,
        onChange: PropTypes.func,
        other: PropTypes.object,
        required: PropTypes.bool
    };

    static defaultProps = {
        type: 'text',
        required: false
    };

    handleChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.value);
    };

    render() {

        const {type, name, id, other, required} = this.props;

        return (
            <input type={type} name={name} id={id} required={required} {...other}
                   onChange={this.handleChange}/>
        );

    }

}

export default Input;