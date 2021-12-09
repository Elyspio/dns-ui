import { Property, Required } from "@tsed/schema";

export class Entry {
	@Required()
	@Property()
	address: string;

	@Required()
	@Property()
	ip: string;
}

export class AddEntry {
	@Property()
	address: string;

	@Property()
	ip: string;
}
