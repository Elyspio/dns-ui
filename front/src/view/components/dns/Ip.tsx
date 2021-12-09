import React from "react";
import { Grid, TextField } from "@mui/material";

interface IpProps {
	onChange: (ip: string) => void;
}

export function Ip({ onChange }: IpProps) {
	const [a, setA] = React.useState(192);
	const [b, setB] = React.useState(168);
	const [c, setC] = React.useState(0);
	const [d, setD] = React.useState(1);

	React.useEffect(() => {
		onChange(`${a}.${b}.${c}.${d}`);
	}, [a, b, c, d]);

	return (
		<Grid container spacing={3}>
			<Grid item>
				<TextField
					sx={{ maxWidth: "5rem" }}
					id={"ip-a"}
					value={a}
					type={"number"}
					onChange={(e) => setA(Number.parseInt(e.target.value))}
					inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
				/>
			</Grid>
			<Grid item>
				<TextField
					sx={{ maxWidth: "5rem" }}
					id={"ip-b"}
					value={b}
					onChange={(e) => setB(Number.parseInt(e.target.value))}
					inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
				/>
			</Grid>
			<Grid item>
				<TextField
					sx={{ maxWidth: "5rem" }}
					id={"ip-c"}
					value={c}
					onChange={(e) => setC(Number.parseInt(e.target.value))}
					inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
				/>
			</Grid>
			<Grid item>
				<TextField
					sx={{ maxWidth: "5rem" }}
					id={"ip-d"}
					value={d}
					onChange={(e) => setD(Number.parseInt(e.target.value))}
					inputProps={{ inputMode: "numeric", pattern: "[0-9]+" }}
				/>
			</Grid>
		</Grid>
	);
}
