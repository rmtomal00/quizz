function viewupdate(data) {
    console.log(`click data: ${data}`);

    fetch("http://localhost:30201/api/v1/get-html?view=" + data)
        .then(response => response.text()) // Convert response to text (HTML)
        .then(html => {
            console.log(html);
            
            // Insert the fetched HTML into .quiz-ma-con
            document.querySelector(".quiz-ma-con").innerHTML = html;

            // Select the existing script
            let oldScript = document.getElementById("contentbased-js");
            if (oldScript) {
                oldScript.remove(); // Remove the old script
            }

            // Create a new script element
            let newScript = document.createElement("script");
            newScript.id = "contentbased-js";
            newScript.type = "text/javascript";
            newScript.src = `/js/${data}.js`;

            // Append the new script to the body (forces reloading)
            document.body.appendChild(newScript);
        })
        .catch(error => console.error("Error loading insert form:", error));
}
