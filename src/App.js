import Converter from "./components/Converter/Converter";
import {Provider} from "react-redux";

function App(props) {
    return (
        <Provider store={props.store}>
            <div>
                <Converter/>
            </div>
        </Provider>
    );
}

export default App;
