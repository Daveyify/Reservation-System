document.getElementById("userReservationForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userIdInput").value;
    const table = document.getElementById("reservationsTable");
    const msg = document.getElementById("msg");

    table.innerHTML = "";
    msg.textContent = "";

    try {
        const response = await fetch(`/api/reservations/user/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_iduser: userId })
        });

        const data = await response.json();

        if (!response.ok) {
            msg.style.color = "red";
            msg.textContent = data.error || "Error loading reservations.";
            return;
        }

        msg.style.color = "green";
        msg.textContent = data.message;

        data.reservations.forEach(res => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${res.idreservation}</td>
                <td>${res.beginDate}</td>
                <td>${res.endDate}</td>
                <td>${res.status}</td>
            `;
            table.appendChild(row);
        });

    } catch (err) {
        console.error("Error:", err);
        msg.style.color = "red";
        msg.textContent = "Error connecting to server.";
    }
});
