import Leftside from "../leftside/Leftside";
import Register from "./Register";

export default function RegisterationPage(){
    return(<div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center items-center" >
        <Leftside />
        <Register />
    </div>)
}