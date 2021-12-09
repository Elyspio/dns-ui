import { BodyParams, Controller, Delete, Get, Post } from "@tsed/common";
import { Required, Returns } from "@tsed/schema";
import { Log } from "../../../core/utils/decorators/logger";
import { getLogger } from "../../../core/utils/logger";
import { Entry } from "./dns.models";
import { DnsService } from "../../../core/services/dns.service";

@Controller("/dns")
export class Dns {
	private static log = getLogger.controller(Dns);
	private services: { dns: DnsService };

	constructor(dnsService: DnsService) {
		this.services = {
			dns: dnsService,
		};
	}

	@Get("/entries")
	@Log(Dns.log)
	@Returns(200, Array).Of(Entry)
	async get() {
		return this.services.dns.get();
	}

	@Post("/entries")
	@Returns(204)
	@Log(Dns.log)
	async addEntry(@Required(true) @BodyParams() entry: Entry) {
		await this.services.dns.addEntry(entry);
	}

	@Delete("/entries")
	@Returns(204)
	@Log(Dns.log)
	async deleteEntry(@BodyParams("ip") ip: string, @BodyParams("address") address: string) {
		if (!ip && !address) throw new Error("You must fill ip or address fields");
		await this.services.dns.deleteEntry({ ip, address });
	}
}
