/**
 * @author Yuicon
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Portal from "../Common/Portal";
import Input from "../Common/Input";
import Button from "../Common/Button";
import {inject, observer} from "mobx-react/index";
import {Item, Record} from "../../store/RecordStore";
import MdNoteAdd from 'react-icons/lib/md/note-add';
import MdSpeakerNotesOff from 'react-icons/lib/md/speaker-notes-off';
import MdClear from 'react-icons/lib/md/clear';

@inject("recordStore")
@observer
class RecordFrom extends Component {

    static propTypes = {
        recordStore: PropTypes.object,
        record: PropTypes.object,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        record: new Record(),
    };

    constructor(props) {
        super(props);
        this.state = {
            record: new Record(),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record.id !== this.props.record.id) {
            this.setState({record: nextProps.record}, () => console.log(this.state.record));
        }
    }


    handleChange = (field, value) => {
        const recordParameters = Object.assign({}, this.state.record);
        recordParameters[field] = value;
        this.setState({record: recordParameters}, () => console.log(this.state.record));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.recordStore.rxCreate(this.state.record)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            );
    };

    handleAddItem = () => {
        const recordParameters = Object.assign({}, this.state.record);
        recordParameters.items.push(Item.buildItem());
        this.setState({record: recordParameters}, () => console.log(this.state.record));
    };

    handleSubtractItem = (index) => {
        const recordParameters = Object.assign({}, this.state.record);
        recordParameters.items.splice(index -1, 1);
        this.setState({record: recordParameters}, () => console.log(this.state.record));
    };

    handleClose = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {

        const ItemView = (props) => {

            const item = this.state.record.items[props.num];

            const labelChange = label => item.label = label;

            const valueChange = value => item.value = value;

            return (
                <div style={{display: 'flex', margin: '.1rem', transition: 'all .3s'}}>
                    <Input type="text" name="label" id="label" required={true} value={item.label}
                           style={{width: '18%', marginRight: '2%'}}
                           onChange={labelChange}/>
                    <Input type="text" name="value" id="value" required={true} value={item.value}
                           style={{width: '60%'}}
                           onChange={valueChange}/>
                    <MdSpeakerNotesOff style={{
                        fontSize: '.7rem',
                        marginLeft: '3%',
                        color: '#1890ff'
                    }} onClick={this.handleSubtractItem.bind(this, props.num)} />
                </div>
            );
        };

        return (
            <Portal visible={this.props.visible}>
                <form className="flex" onSubmit={this.handleSubmit}>
                   <div style={{
                       flex: '100%',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'space-between',
                       fontSize: '.4rem',
                       paddingBottom: '.5rem',
                   }}>
                       <h3>记录</h3>
                       <MdClear style={{cursor: 'pointer'}} onClick={this.handleClose}/>
                   </div>
                    <label htmlFor="source">标识</label>
                    <Input type="text" name="source" id="source" required={true} value={this.state.record.source}
                           onChange={this.handleChange.bind(this, 'source')}/>
                    <label>内容</label>
                    {
                        this.state.record.items.map((item, index) => <ItemView num={index} key={index}/>)
                    }
                    <MdNoteAdd style={{
                        fontSize: '.7rem',
                        margin: '.3rem',
                        color: '#1890ff'
                    }} onClick={this.handleAddItem} />
                    <Button type='submit' value='提交' style={{flex: '100%'}}/>
                </form>
            </Portal>
        );

    }

}

export default RecordFrom;