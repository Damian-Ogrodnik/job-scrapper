import React from 'react';
import { Modal } from 'semantic-ui-react';

const InfoModal = ({header, description}) => {
    return (  
    <Modal defaultOpen = {true}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
        <Modal.Description>
            {description}
        </Modal.Description>
        </Modal.Content>
    </Modal>  
    )
}      

export {InfoModal};