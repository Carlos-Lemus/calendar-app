import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { startCloseModal } from '../../actions/ui';
import { clearSelectSlotDay, startClearActiveEvent, startNewAddEvent, startUpdateEvent } from '../../actions/events';
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";

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

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

    const { openModal } = useSelector(state => state.ui);
    const { activeEvent, daySlotCalendar } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent);
            setDateStart(activeEvent.start);
            setDateEnd(activeEvent.end);
        }
        else if (daySlotCalendar) {
            setFormValues(daySlotCalendar);
            setDateStart(daySlotCalendar.start);
            setDateEnd(daySlotCalendar.end);
        } else {
            setFormValues(initEvent);
        }
    }, [activeEvent, daySlotCalendar,setFormValues])



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch(startCloseModal());
        dispatch(startClearActiveEvent());
        dispatch(clearSelectSlotDay());
        setFormValues(initEvent);
    }

    const handleStartDateChange = ([e]) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = ([e]) => {
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        if (activeEvent) {
            dispatch(startUpdateEvent(formValues))
        } else {
            dispatch(startNewAddEvent(formValues));
        }


        setTitleValid(true);
        closeModal();

    }


    return (
        <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
            ariaHideApp={!process.env.NODE_ENV === 'test'}
        >
            <h1> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <Flatpickr
                        className="form-control"
                        data-enable-time
                        value={dateStart}
                        onChange={date => handleStartDateChange(date)}
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <Flatpickr
                        className="form-control"
                        data-enable-time
                        value={dateEnd}
                        options={{ minDate: dateStart }}
                        onChange={date => handleEndDateChange(date)}
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
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