import { promises } from "fs";
import * as path from "path";
import * as os from "os";
import { Log } from "../utils/decorators/logger";
import { getLogger } from "../utils/logger";
import { Service } from "@tsed/common";
import * as crypto from "crypto";
import * as fs from "fs";

const { writeFile, readFile, rm, mkdir } = promises;

export const files = {
	zone: process.env.BIND_CONFIG_PATH ?? "/etc/bind/local.conf",
};

@Service()
export class StorageService {
	private static logger = getLogger.service(StorageService);

	@Log(StorageService.logger, [0])
	async store(name: string, data: string | object) {
		if (name[0] === "~") {
			name = path.join(os.homedir(), name.slice(1));
		}

		if (typeof data === "object") data = JSON.stringify(data, null, 4);

		return writeFile(path.resolve(name), data);
	}

	@Log(StorageService.logger)
	async read(name: string) {
		return (await readFile(name)).toString();
	}

	@Log(StorageService.logger)
	async exist(node: string) {
		return new Promise<boolean>((resolve) => {
			fs.stat(node, function (err, stat) {
				if (err == null) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	}

	@Log(StorageService.logger, false)
	async createTempFile(content: string) {
		const filename = crypto.randomBytes(16).toString("hex");
		const tmpdir = path.join(os.tmpdir(), "backup-maker");
		await mkdir(tmpdir, { recursive: true });
		const filepath = path.join(tmpdir, filename);
		await writeFile(filepath, content);
		return {
			filepath,
			clean: () => rm(filepath),
		};
	}
}
