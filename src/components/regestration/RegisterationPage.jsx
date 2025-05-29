import Leftside from "./leftside/Leftside";
import Register from "./Register";

export default function RegisterationPage(){
    return(<div className="grid grid-cols-2 justify-center items-center" >
        <Leftside />
        <Register />
    </div>)
}