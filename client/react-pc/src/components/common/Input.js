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
        required: PropTypes.bool,
        value: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        type: 'text',
        required: false,
        value: undefined,
        className: '',
        style: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    handleChange = (e) => {
        this.setState({value: e.target.value}, () => {
            this.props.onChange && this.props.onChange(this.state.value);
        });
    };

    render() {

        const {type, name, id, other, required, className, style} = this.props;

        return (
            <input value={this.state.value} type={type} name={name} id={id} required={required}
                   style={style}
                   className={`input ${className}`}
                   {...other}
                   onChange={this.handleChange}/>
        );

    }

}

export default Input;