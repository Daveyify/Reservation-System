
async function loadAvailableDevices() {
    const select = document.getElementById("deviceSelect");

    try {
        const response = await fetch("/api/devices/available");
        const data = await response.json();

        if (!response.ok) {
            select.innerHTML = `<option value="">No available devices</option>`;
            return;
        }

        // Clear select
        select.innerHTML = "";

        // Add devices to dropdown
        data.devices.forEach(device => {
            const option = document.createElement("option");
            option.value = device.iddevice; // device ID
            option.textContent = `${device.name} (${device.type})`;
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error loading devices:", error);
        select.innerHTML = `<option value="">Error loading devices</option>`;
    }
}

loadAvailableDevices();


document.getElementById("reservationForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {
        beginDate: document.getElementById("beginDate").value,
        endDate: document.getElementById("endDate").value,
        status: document.getElementById("status").value,
        user_iduser: document.getElementById("user").value
    };

    try {
        const res = await fetch("/api/reservations/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const result = await res.json();

        if (!res.ok) {
            document.getElementById("responseMessage").innerText = result.error;
            return;
        }

        const reservationId = result.reservationId;
        const deviceId = document.getElementById("deviceSelect").value;

        await fetch(`/api/reservations/${reservationId}/devices`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ devices: [deviceId] })
        });

        document.getElementById("responseMessage").innerText =
            `Reservation #${reservationId} created successfully`;

    } catch (error) {
        console.error("Error creating reservation:", error);
        document.getElementById("responseMessage").innerText = "Error creating reservation.";
    }
});
