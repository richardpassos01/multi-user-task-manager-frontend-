import client from "./client";

import { configure } from "axios-hooks";
import LRU from "lru-cache";

const cache = new LRU({ max: 10 });

configure({ axios: client, cache });

export default client;
