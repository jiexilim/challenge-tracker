import React from 'react'
import { Modal, Backdrop, Fade } from '@material-ui/core'
import { useStyles } from "../../functions"
import { FaTimes } from "react-icons/fa"

const ModalForm = ({ openForm, closeForm, FormComponent }) => {
    const classes = useStyles()

    return (
        <Modal
            className={classes.modal}
            open={openForm}
            onClose={closeForm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openForm}>
                <div className={classes.view}>
                    <div className={classes.paper}>
                        {<FormComponent closeForm={closeForm} />}
                    </div>
                    <FaTimes
                        className={classes.cross}
                        size={50}
                        onClick={closeForm} />
                </div>
            </Fade>
        </Modal>
    )
}

export default ModalForm
