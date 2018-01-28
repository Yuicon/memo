/**
 * @author Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';

class Portal extends Component {

    static propTypes = {
        children: PropTypes.element,
        visible: PropTypes.bool,
    };

    static defaultProps = {
        visible: false
    };

    render() {

        let portal = null;

        if (this.props.visible) {
            portal =  createPortal(
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

        return portal;

    }

}

export default Portal;
