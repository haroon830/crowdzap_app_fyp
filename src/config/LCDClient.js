import {LcdClient} from "@cosmjs/launchpad";
import {envConfig} from "./envConfig";
export const LCDClient = new LcdClient(envConfig.CHAIN_REST_API_URL)