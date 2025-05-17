import TextField from "../TextField/TextField";
import { Paper, Typography, Divider, Grid } from "@mui/material";

const TenderInput = () => (
	<Paper
		elevation={0}
		sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			bgcolor: "#fafafa",
			borderRadius: "12px",
			border: "1.5px solid #e8eded",
			p: 3,
		}}
	>
		<Typography variant="h5">Tender</Typography>
		<Divider />
	</Paper>
);

export default TenderInput;
