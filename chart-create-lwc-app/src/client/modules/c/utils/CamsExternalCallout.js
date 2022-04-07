import axios from 'axios';

export const camsCallOut = async ({ requestPath, method, requestbody }) => {
    console.log(requestPath);
    console.log('method', method);
    console.log(requestbody);

    return (
        axios
            // .get('https://example.com/todos')
            .get(
                `http://localhost:3008/${requestPath}`,
            )
            // .get('http://localhost:3001')
            .then((res) => {
                return {
                    Headers: res.headers,
                    Status: res.status,
                    StatusCode: res.statusText,
                    Body: JSON.stringify(res.data),
                };
            })
            .catch((error) => {
                console.log('error', error);
                console.error(error);
            })
    );
};
