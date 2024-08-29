document.getElementById('bypassButton').addEventListener('click', () => {
    const linkInput = encodeURIComponent(document.getElementById('linkInput').value);

    // Define the API endpoint with the link and API key as query parameters
    const apiEndpoint = `https://ep.goatbypassers.xyz/api/adlinks/bypass?url=${linkInput}&apikey=ETHOS_5EBGKBWO`;

    // Set up the request options
    const requestOptions = {
        method: 'GET', // Assuming GET method for this API
    };

    // Fetch API data
    fetch(apiEndpoint, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Check if the response contains 'bypassed' or 'error'
            const apiDataDiv = document.getElementById('api-data');
            if (data.bypassed) {
                apiDataDiv.innerHTML = `<p>Bypassed Link: ${data.bypassed}</p>`;
            } else if (data.error) {
                apiDataDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                apiDataDiv.innerHTML = `<p>Unexpected response format.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('api-data').innerHTML = `<p>Failed to fetch data. Please try again.</p>`;
        });
});
