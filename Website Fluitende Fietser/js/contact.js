document.addEventListener("DOMContentLoaded", function() {
    fetch('assets/contactinfo.txt')
        .then(response => response.text())
        .then(text => {
            const texts = text.split("\n");
            for (const ContactInfo of texts) {
                const info = ContactInfo.split(":");
                if (info[0] == "Adress") {
                    doc("contact-info-adress").value = info[1];
                } else if (info[0] == "Email") {
                    doc("contact-info-email").value = info[1];
                } else if (info[0] == "TelefoonNummer") {
                    doc("contact-info-phonenumber").value = info[1];
                }
            }
        })
    .catch((e) => console.error(e));

    fetch("assets/opening-hours.txt")
        .then((respnse) => respnse.text())
        .then((text) => {
            const texts = text.split("\n");
            for (const opentimesperday of texts) {
                const [day, opentime, closetime] = opentimesperday.split(",");

                doc("contact-info-opentimes").value += `${day}: ${opentime} - ${closetime}\n`;
            }

            doc("contact-info-opentimes").value = doc("contact-info-opentimes").value.trim();
        })
    .catch((e) => console.error(e));
});
