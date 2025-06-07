import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
} from "@mui/material";

export default function DonationCard({ onDonate, setAmount, amount }) {

    const handleClick = () => {
        if (parseFloat(amount) >= 1) {
            onDonate(amount);
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
