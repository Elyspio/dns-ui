import { inject, injectable } from "inversify";
import { DnsApiClient } from "../apis/backend";
import { DiKeysApi } from "../di/apis/di.keys.api";

@injectable()
export class DnsService {
	@inject(DiKeysApi.dns)
	private runnerApi!: DnsApiClient;

	public get = async () => {
		return (await this.runnerApi.client.get()).data;
	};

	public add = async (ip: string, address: string) => {
		await this.runnerApi.client.addEntry({ ip, address });
	};

	public delete = async (ip?: string, address?: string) => {
		if (!ip && !address) throw new Error("You must fill one of the both fields");
		await this.runnerApi.client.deleteEntry({ ip, address });
	};
}
