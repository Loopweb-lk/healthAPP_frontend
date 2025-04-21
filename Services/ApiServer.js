class ApiServer {
    static baseServer = 'https://easy-yak-unique.ngrok-free.app';

    static call(endpoint, method = 'GET', body = null, customHeaders = {}) {
        const url = `${this.baseServer}${endpoint}`;

        const headers = {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
            ...customHeaders,
        };

        const options = {
            method: method,
            headers: headers,
            ...(body && { body: JSON.stringify(body) }),
        };

        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`HTTP ${method} request failed:`, error);
                throw error;
            });
    }

}

export default ApiServer;
