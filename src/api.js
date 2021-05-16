import axios from "axios";

export default {

    check: (options) =>
        axios.request(options),
}