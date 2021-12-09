import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useCallback, useState } from "react";
import { useAsyncCallback } from "../../hooks/useAsyncCallback";
import { useInjection } from "inversify-react";
import { DnsService } from "../../../core/services/dns.service";
import { DiKeysService } from "../../../core/di/services/di.keys.service";
import { Entry } from "../../../core/apis/backend/generated";
import { Clear } from "@mui/icons-material";
import { useModal } from "../../hooks/useModal";
import { Ip } from "./Ip";

export const Dns = () => {
	const services = {
		dns: useInjection<DnsService>(DiKeysService.dns),
	};

	const { open, setClose, setOpen } = useModal(false);

	const [entries, setEntries] = React.useState<Entry[]>([]);

	const [newEntry, setNewEntry] = useState<Entry>({ ip: "", address: "" });

	const [fetchEntries] = useAsyncCallback(async () => {
		const data = await services.dns.get();
		if (data) {
			setEntries(data);
		}
	}, [services.dns]);

	const clear = useCallback(
		(ip: string) => async () => {
			await services.dns.delete(ip);
			await fetchEntries();
		},
		[fetchEntries, services.dns]
	);

	const add = useCallback(async () => {
		setClose();
		await services.dns.add(newEntry.ip, newEntry.address);
		await fetchEntries();
	}, [fetchEntries, newEntry, setClose, services.dns]);

	const updateNewEntry = React.useCallback(
		<Key extends keyof Entry>(key: Key) =>
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setNewEntry((entry) => ({
					...entry,
					[key]: e.target.value,
				}));
			},
		[]
	);

	const updateNewEntryString = React.useCallback(
		<Key extends keyof Entry>(key: Key) =>
			(val: string) => {
				setNewEntry((entry) => ({
					...entry,
					[key]: val,
				}));
			},
		[]
	);

	React.useEffect(() => {
		fetchEntries();
	}, [fetchEntries]);

	return (
		<Paper className={"Dns"}>
			<Box p={2}>
				<Button onClick={setOpen} variant={"outlined"} sx={{ marginY: 2 }}>
					Add Entry
				</Button>

				<Grid container direction={"column"} spacing={2}>
					{entries.map((entry) => (
						<Grid container item spacing={4} key={entry.ip} direction={"row"} alignItems={"center"}>
							<Grid item sx={{ minWidth: 200 }}>
								<Typography>{entry.address}</Typography>
							</Grid>
							<Grid item sx={{ minWidth: 150 }}>
								<Typography>{entry.ip}</Typography>
							</Grid>
							<Grid item>
								<IconButton onClick={clear(entry.ip)}>
									<Clear />
								</IconButton>
							</Grid>
						</Grid>
					))}
				</Grid>

				<Dialog open={open} onClose={setClose}>
					<DialogTitle>New entry</DialogTitle>
					<DialogContent>
						<Grid container direction={"column"} spacing={2}>
							<Grid item>
								<TextField
									margin="dense"
									error={newEntry.address.length === 0}
									id="address"
									label="Host"
									value={newEntry.address}
									fullWidth
									onChange={updateNewEntry("address")}
									variant="standard"
								/>
							</Grid>
							<Grid item>
								<Ip onChange={updateNewEntryString("ip")} />
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={setClose}>Cancel</Button>
						<Button disabled={newEntry.ip.length === 0 || newEntry.address.length === 0} onClick={add}>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</Paper>
	);
};
