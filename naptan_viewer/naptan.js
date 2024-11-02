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
                results.innerText = "fetching " + range + " ...";

                let url;
                if (prefix[0] === "7" || prefix[0] === "8") {
                    url = "naptan-ie.xml";
                } else {
                    url = "naptan-gb.xml";
                }

                fetch(url, {
                    headers: {
                        Range: range,
                        "Accept-Encoding": "identity",
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
            } else {
                results.innerText = "hmm, can't find stop: \"" + atco_code + '"';
            }
        });
    });
});
