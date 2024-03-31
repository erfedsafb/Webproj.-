function signIn() {
    fetch('/signin')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Here you can handle the response data.
        // For example, you might want to display the sign-in page content in a specific element.
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
