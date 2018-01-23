/**
 * @author Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

class Portal extends Component {

    static propTypes = {
        children: PropTypes.element,
    };

    render() {
        return createPortal(
            <div className="portal">
                <div>
                    <main>
                        {this.props.children}
                    </main>
                </div>
            </div>,
            document.getElementById('portal')
        );
    }

}

export default Portal;
