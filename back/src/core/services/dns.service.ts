import { Service } from "@tsed/common";
import { files, StorageService } from "./storage.service";
import { getLogger } from "../utils/logger";
import * as os from "os";

const template = `
;
; BIND data file for local loopback interface
;
$TTL    60
@       IN      SOA     local.elyspio.fr. elyspio.local. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      local.elyspio.fr.
@       IN      NS      elyspio.local.
@       IN      A       127.0.0.1

;your sites
%REPLACE%
`;

type Entry = { address: string; ip: string };

@Service()
export class DnsService {
	private entries: Entry[] = [];
	private services: { storage: StorageService };

	private logger = getLogger.service(DnsService);

	constructor(storageService: StorageService) {
		this.services = {
			storage: storageService,
		};
		this.init();
	}

	async init() {
		if (!(await this.services.storage.exist(files.zone))) {
			await this.update();
		}
		await this.parse();
		this.logger.info(`Config parsed, loaded ${this.entries.length} entries`);
	}

	async parse() {
		const lines = (await this.services.storage.read(files.zone))
			.split("\n")
			.map((l) => l.trim())
			.filter((l) => l.length > 0);

		const marker = ";your sites";
		const index = lines.indexOf(marker) + 1;
		this.entries = [];
		for (let i = index; i < lines.length; i++) {
			const line = lines[i];
			const [address, , , ip] = line.split(" ");
			this.entries.push({
				ip,
				address,
			});
		}
	}

	toString() {
		const entriesStr = this.entries.map((entry) => `${entry.address} IN A ${entry.ip}`).join(os.EOL);
		return template.replace("%REPLACE%", entriesStr);
	}

	async addEntry(entry: Entry) {
		this.entries.push(entry);
		await this.update();
	}

	async deleteEntry(entry: Partial<Entry>) {
		this.entries = this.entries.filter((ent) => !(ent.ip === entry.ip || ent.address === entry.address));
		await this.update();
	}

	async update() {
		const str = this.toString();
		await this.services.storage.store(files.zone, str);
	}

	async get() {
		return [...this.entries];
	}
}
