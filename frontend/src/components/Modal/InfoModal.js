import React from 'react';
import { Modal } from 'semantic-ui-react'

const InfoModal = ({description}) => {
    return (
        
    <Modal defaultOpen = {true}>
        <Modal.Header>Information</Modal.Header>
        <Modal.Content>
        <Modal.Description>
            {description}
        </Modal.Description>
        </Modal.Content>
    </Modal>  
    )
}      

export default InfoModal;