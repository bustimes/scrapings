const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const atco_code = document.getElementById("atco_code").value;

    const results = document.getElementById("results");

    const prefix = atco_code.substring(0, 3);
    const suffix = atco_code.substring(4);

    fetch("ranges/" + prefix + ".json").then((response) => {
        response.json().then((data) => {
            if (suffix in data) {
                const range =
                    "bytes=" +
                    data[suffix][0] +
                    "-" +
                    data[suffix][1];
                fetch("naptan.xml", {
                    headers: {
                        Range: range,
                    },
                }).then((response) => {
                    if (response.status === 206) {
                        response.text().then((text) => {
                            const start = text.indexOf("<StopPoint ");
                            const end = text.lastIndexOf("</StopPoint>") + 12;
                            text = text.substring(start, end);
                            text = text.replaceAll("><", ">\n<");
                            results.innerText = text;
                        });
                    } else {
                        results.innerText = "hmm, response status: " + response.status;
                    }
                });
            }
        });
    });
});
