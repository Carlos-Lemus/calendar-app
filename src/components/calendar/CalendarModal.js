import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from "moment";
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { startCloseModal } from '../../actions/ui';
import { startClearActiveEvent, startNewAddEvent, startUpdateEvent } from '../../actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const now = moment().minutes(0).seconds(0).add(1, "hour");
const nowPlus1 = now.clone().add(1, "hour");

const initialState = {
    title: "",
    notes: "",
    start: now.toDate(),
    end: nowPlus1.toDate()
}

Modal.setAppElement('#root')

export const CalendarModal = () => {

    const {openModal} = useSelector(state => state.ui);
    const dispatch = useDispatch()


    const [startDate, setStartDate] = useState(now.toDate());
    const [endDate, setEndDate] = useState(nowPlus1.toDate());
    const [isVerifyTitle, setIsVerifyTitle] = useState(true);

    const [formValues, setFormValues] = useState(initialState);

    const { activeEvent } = useSelector(state => state.calendar);

    useEffect(() => {
        if(activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initialState);
        }
    }, [activeEvent, setFormValues])

    const {
        title,
        notes,
        start,
        end
    } = formValues;

    const handleChangeInput = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    } 

    const handleStartDateChange = (event) => {
        setStartDate(event);
        setFormValues({
            ...formValues,
            start: event
        });
    }

    const handleEndDateChange = (event) => {
        setEndDate(event);
        setFormValues({
            ...formValues,
            end: event
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);
        
        if(momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha final debe ser mayor a la fecha de inicio',
              })
        }
        
        if(title.trim().length < 2) {
            setIsVerifyTitle(false);
            return;            
        }

        
        if(activeEvent) {
            dispatch(startUpdateEvent(formValues));
        } else {
            dispatch(startNewAddEvent({
                ...formValues,
                id: Date.now()
            }));
        }
        
        setIsVerifyTitle(true);

        closeModal();
        
    }
    
    const closeModal = () => {
        dispatch(startClearActiveEvent());
        dispatch(startCloseModal());
    }

    return (
        <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> {activeEvent? "Editar Evento" : "Nuevo Evento"} </h1>
            <hr />
            <form
                onSubmit={handleSubmit}
                className="container"
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={startDate}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        className="form-control"
                        minDate={startDate}
                        onChange={handleEndDateChange}
                        value={endDate}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        value={title}
                        onChange={handleChangeInput}
                        type="text"
                        className={`form-control ${!isVerifyTitle && "is-invalid"}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        value={notes}
                        onChange={handleChangeInput}
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
