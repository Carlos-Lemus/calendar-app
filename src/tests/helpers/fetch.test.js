import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe("Pruebas en Helpers fetch", () => {
    
    let token = "";

    test('fetchWithoutToken debe de funcionar', async() => {

        const res = await fetchWithoutToken("auth", "POST", {email: "pedro@gmail.com", password: "123456"});
        const body = await res.json();

        expect(res instanceof Response).toBe(true);
        expect(body.ok).toBe(true);

        token = body.token;
    })

    test('fetchWithToken debe funcionar', async() => {
        
        localStorage.setItem("token", token);

        const res = await fetchWithToken(`events/${"21asdad12"}`, "DELETE");
        const body = await res.json();

        expect(body.msg).toBe("Hubo un problema hable con el administrador");
    })
    
    

});