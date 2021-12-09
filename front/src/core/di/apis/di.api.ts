import { DiKeysApi } from "./di.keys.api";
import { DnsApiClient } from "../../apis/backend";
import { AuthenticationApiClient } from "../../apis/authentication";
import { container } from "../index";

container.bind<DnsApiClient>(DiKeysApi.dns).to(DnsApiClient);

container.bind<AuthenticationApiClient>(DiKeysApi.authentication).to(AuthenticationApiClient);
