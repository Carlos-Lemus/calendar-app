import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { startLogin, startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);

const initialState = {  };

let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);

describe("Pruebas en <LoginScreen />", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('<LoginScreen /> debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot(); 
    });
    
    test('<LoginScreen /> debe de hacer el login correctamente', () => {
        
        wrapper.find("input[name='lEmail']").simulate("change", {
            target: {
                name: "lEmail",
                value: "pedro@gmail.com"
            }
        });

        wrapper.find("input[name='lPassword']").simulate("change", {
            target: {
                name: "lPassword",
                value: "123456"
            }
        });

        wrapper.find("form").at(0).prop("onSubmit") ({
            preventDefault() {}
        });

        expect(startLogin).toHaveBeenCalledWith("pedro@gmail.com", "123456");
    });
   
    test('No hay registros si la contraseña es diferente', () => {
        wrapper.find("input[name='rPassword1']").simulate("change", {
            target: {
                name: "rPassword1",
                value: "123456"
            }
        });

        wrapper.find("input[name='rPassword2']").simulate("change",{
            target: {
                name: "rPassword2",
                value: "12345678"
            }
        });

        wrapper.find("form").at(1).prop("onSubmit")({
            preventDefault() {}
        });

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledTimes(1);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Los password no son iguales", "error");
    });

    test('Si los datos son correctos se registra', () => {
        wrapper.find("input[name='rEmail']").simulate("change", {
            target: {
                name: "rEmail",
                value: "test23@gmail.com"
            }
        });

        wrapper.find("input[name='rPassword1']").simulate("change", {
            target: {
                name: "rPassword1",
                value: "123456"
            }
        });

        wrapper.find("input[name='rPassword2']").simulate("change",{
            target: {
                name: "rPassword2",
                value: "123456"
            }
        });

        wrapper.find("form").at(1).prop("onSubmit")({
            preventDefault() {}
        });

        expect(startRegister).toHaveBeenCalledWith("Pedro", "test23@gmail.com", "123456");
        expect(Swal.fire).toHaveBeenCalledTimes(0);
        expect(Swal.fire).not.toHaveBeenCalled();
    });
    

});