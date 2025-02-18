import {crypto} from "@std/crypto/crypto"

type FetchLike = (
    url: string,
    options?: RequestInit,
) => Promise<Response>;

export interface config {
    fetch?: FetchLike;
    hosts?: string;
}

export class BasePixivAPI {
    public clientId: string = "MOBrBDS8blbauoSck0ZfDbtuzpyT";
    public clientSecret: string = "lsACyCD94FhDUtGTXi3QzcFE2uU1hqtDaKeqrdwj";
    public hashSecret: string = "28c1fdd170a5204386cb1313c7077b34f83e4aaf4aa829ce78c231e05b0bae2c";
    public userId: number | string;
    public accessToken: string | null = null;
    public refreshToken: string | null = null;
    public hosts: string;
    public fetch: FetchLike;
    public headers: Headers = new Headers({})

    constructor(c: config = {}) {
        this.userId = 0;
        this.hosts = c.hosts || "https://app-api.pixiv.net";
        this.fetch = c.fetch || fetch;
    }

    public set_acceppt_language(lang: string) {
        this.headers.set("Accept-Language", lang)
    }

    public require_auth(): void {
        if (this.accessToken == null) {
            throw new Error('Authentication required');
        }
    }

    public set_auth(access_token: string, refresh_token: string | null = null): void {
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
    }

    public set_client(client_id: string, client_secret: string): void {
        this.clientId = client_id;
        this.clientSecret = client_secret;
    }
    
    public async auth({username, password, refresh_token, headers = {}}: {username?: string, password?: string, refresh_token?: string, headers?: HeadersInit}): Promise<string> {
        const localTime = new Date().toISOString();
        const header = new Headers(headers);
        header.set("x-client-time", localTime);
        const hash = await crypto.subtle.digest("MD5", new TextEncoder().encode(localTime + this.hashSecret)).then((hash) => {
            return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
        })
        header.set("x-client-hash", hash);

        if (!header.has("User-Agent")) {
            header.set("app-os", "ios");
            header.set("app-os-version", "14.6");
            header.set("User-Agent", "PixivIOSApp/7.13.3 (iOS 14.6; iPhone13,2)");
        }
        const body = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            get_secure_url: 1,
            grant_type: refresh_token ? "refresh_token" : "password",
        }
        Object.assign(body, refresh_token ? { refresh_token } : { username, password });
        const res = await this.fetch("https://oauth.secure.pixiv.net" + "/auth/token", {
            method: "POST",
            headers: header,
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorText = await res.text();
            const errorMsg = refresh_token
                ? `[ERROR] auth() failed! check refresh_token.\nHTTP ${res.status}: ${errorText}`
                : `[ERROR] auth() failed! check username and password.\nHTTP ${res.status}: ${errorText}`;
            throw new Error(errorMsg);
        }

        let token;
        try {
            token = await res.json();
            this.userId = token.response.user.id;
            this.accessToken = token.response.access_token;
            this.refreshToken = token.response.refresh_token;
        } catch (_e) {
            const errorText = await res.text();
            const errorMsg = `Get access_token error! Response: ${errorText}`;
            throw new Error(errorMsg);
        }

        return token;
    }

    public async download(url: string, referer: string = "https://app-api.pixiv.net/"): Promise<ArrayBuffer> {
        const response = await this.fetch(url, {
            method: "GET",
            headers: { "Referer": referer }
        });

        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        return buffer;
    }

    public async download_stream(url: string, referer: string = "https://app-api.pixiv.net/"): Promise<ReadableStream<Uint8Array>> {
        const response = await this.fetch(url, {
            method: "GET",
            headers: { "Referer": referer }
        });

        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.statusText}`);
        }

        return response.body!;
    }
}