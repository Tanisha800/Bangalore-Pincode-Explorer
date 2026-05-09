const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Bangalore Pincode Explorer API is running " });
});

app.get("/api/pincode/:pin", async (req, res) => {
    const { pin } = req.params;
    if (!/^\d{6}$/.test(pin)) {
        return res.status(400).json({
            success: false,
            message: "Invalid pincode. Must be exactly 6 digits.",
        });
    }

    if (!pin.startsWith("56")) {
        return res.status(400).json({
            success: false,
            message: "Not a Bangalore pincode. Bangalore pincodes start with 56.",
        });
    }

    try {
        const response = await axios.get(
            `https://api.postalpincode.in/pincode/${pin}`
        );
        const data = response.data[0];
        if (data.Status === "Success") {
            // Filter Bangalore only
            const blr = data.PostOffice.filter(
                (r) =>
                    r.District?.toUpperCase().includes("BANGALORE") ||
                    r.District?.toUpperCase().includes("BENGALURU")
            );

            if (blr.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Bangalore areas found for this pincode.",
                });
            }

            res.json({ success: true, count: blr.length, areas: blr });
        } else {
            res.status(404).json({
                success: false,
                message: "Pincode not found.",
            });
        }
    } catch (err) {
        console.error("Pincode error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
});

app.get("/api/area/:name", async (req, res) => {
    const { name } = req.params;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Please enter at least 2 characters.",
        });
    }

    try {
        const response = await axios.get(
            `https://api.postalpincode.in/postoffice/${name}`
        );
        const data = response.data[0];

        if (data.Status === "Success") {
            // Filter Bangalore only
            const blr = data.PostOffice.filter(
                (r) =>
                    r.District?.toUpperCase().includes("BANGALORE") ||
                    r.District?.toUpperCase().includes("BENGALURU")
            );

            if (blr.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Bangalore areas found for this name.",
                });
            }

            res.json({ success: true, count: blr.length, areas: blr });
        } else {
            res.status(404).json({
                success: false,
                message: "Area not found.",
            });
        }
    } catch (err) {
        console.error("Area error:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again.",
        });
    }
});


app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});