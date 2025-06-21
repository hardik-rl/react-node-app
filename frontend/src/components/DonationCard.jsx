import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DonationCard() {
    const [amount, setAmount] = useState("");

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (amount) => {
        const enteredAmount = parseFloat(amount);
        if (!enteredAmount || isNaN(enteredAmount) || enteredAmount < 1) {
            alert("Please enter an amount of at least ₹1");
            return;
        }

        const isScriptLoaded = await loadRazorpayScript();
        if (!isScriptLoaded) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        const res = await fetch("http://localhost:5000/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: enteredAmount }),
        });

        const data = await res.json();

        const options = {
            key: "rzp_test_ofOme4GbloIWpu",
            amount: data.amount,
            currency: data.currency,
            name: "Test Corp",
            description: "Test Transaction",
            order_id: data.id,
            handler: async function (response) {
                // alert("Payment successful! ID: " + response.razorpay_payment_id);

                // Store payment in backend
                await fetch("http://localhost:5000/payment-success", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        paymentId: response.razorpay_payment_id,
                        amount: data.amount,
                    }),
                });
                toast.success("Payment Verify Successfully!")
                fetchPayments(); // Refresh payment list
            },
            prefill: {
                name: "Hardik",
                email: "hardik@example.com",
                contact: "9999999999",
            },
            theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const handleClick = () => {
        if (parseFloat(amount) >= 1) {
            handlePayment(amount);
        } else {
            alert("Please enter a valid donation amount (minimum ₹1)");
        }
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 4,
                p: 2,
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: 3,
            }}
        >
            <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    ❤️ Donate Now
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Your support helps us continue our mission.
                </Typography>

                <TextField
                    label="Enter amount (₹)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ my: 2 }}
                />

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ py: 1.5 }}
                    onClick={handleClick}
                >
                    Donate Now
                </Button>
            </CardContent>
        </Card>
    );
}
