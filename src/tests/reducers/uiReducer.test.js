import { startCloseModal, startOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {};

describe("Pruebas en uiReducer", () => {

    test('debe abrir y cerrar el modal de forma correcta', () => {

        const openModal = startOpenModal();

        let state = uiReducer(initState, openModal);

        expect(state).toEqual({ openModal: true });

        const closeModal = startCloseModal();

        state = uiReducer(initState, closeModal);

        expect(state).toEqual({ openModal: false });

    });


});