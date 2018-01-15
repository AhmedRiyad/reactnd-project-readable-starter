import React, {Component} from 'react'
import {Button, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types';


export default class DeleteModal extends Component {
    state = {modalOpen: false};

    handleOpen = () => this.setState({modalOpen: true});

    handleClose = (deleteItem) => {
        if (deleteItem) {
            this.props.onDelete(this.props.item)
        }
        this.setState({modalOpen: false});
    };

    render() {
        return (
            <Modal
                trigger={this.props.component}
                onOpen={this.handleOpen}
                open={this.state.modalOpen}
                onClose={this.close}>
                <Modal.Header>
                    Delete
                </Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => this.handleClose(false)}>No</Button>
                    <Button onClick={() => this.handleClose(true)}
                            positive>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

DeleteModal.propTypes = {
    onDelete: PropTypes.func,
    component: PropTypes.object,
    item: PropTypes.object
};