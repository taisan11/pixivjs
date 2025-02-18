import {BasePixivAPI,type config} from "./base.ts"
import type * as t from "./types.ts"
import {} from "ufo"

type FILTER = "for_ios" | "";
type TYPE = "illust" | "manga" | "";
type RESTRICT = "public" | "private" | "";
type CONTENT_TYPE = "illust" | "manga" | "";
type MODE = 
    "day" |
    "week" |
    "month" |
    "day_male" |
    "day_female" |
    "week_original" |
    "week_rookie" |
    "day_manga" |
    "day_r18" |
    "day_male_r18" |
    "day_female_r18" |
    "week_r18" |
    "week_r18g" |
    "";
type SEARCH_TARGET = 
    "partial_match_for_tags" | 
    "exact_match_for_tags" | 
    "title_and_caption" | 
    "keyword" | 
    "";
type SORT = "date_desc" | "date_asc" | "popular_desc" | "";
type DURATION = 
    "within_last_day" | 
    "within_last_week" | 
    "within_last_month" | 
    "" | 
    null;

export class PixivAPI extends BasePixivAPI {
    constructor(c?: config) {
        super(c)
    }
    private authFetch(url: string, options: RequestInit = {}, auth: boolean = true): Promise<Response> {
        const headers = new Headers(options.headers)
        if (!headers.has("User-Agent")) {
            headers.set("app-os", "ios");
            headers.set("app-os-version", "14.6");
            headers.set("User-Agent", "PixivIOSApp/7.13.3 (iOS 14.6; iPhone13,2)");
        }
        if (auth) {
            this.require_auth();
            headers.set("Authorization", `Bearer ${this.accessToken}`)
            options.headers = headers
            return this.fetch(url, options)
        } else {
            options.headers = headers
            return this.fetch(url, options)
        }
    }
    public async user_detail(userid:string|number,filter: FILTER = "for_ios",auth:boolean = true): Promise<t.UserInfoDetailed> {
        const url = new URL(this.hosts + "/v1/user/detail");
        url.searchParams.append("user_id", userid.toString());
        url.searchParams.append("filter", filter);
        
        return await this.authFetch(url.toString(), {}, auth).then(res => res.json());
    }

    public async user_illusts(userid:string|number,type: TYPE = "illust",filter: FILTER = "for_ios",offset:number = 0,auth:boolean = true): Promise<t.UserIllustrations> {
        const url = new URL(this.hosts + "/v1/user/illusts");
        url.searchParams.append("user_id", userid.toString());
        url.searchParams.append("type", type);
        url.searchParams.append("filter", filter);
        url.searchParams.append("offset", offset.toString());
        
        return await this.authFetch(url.toString(), {}, auth).then(res => res.json());
    }
    
    public async user_bookmarks_illust(userid: string | number, options: { restriction?: RESTRICT, filter?: FILTER, max_bookmark_id?: string | number, tag?: string, auth?: boolean } = {}): Promise<t.UserBookmarksIllustrations> {
        const { restriction = "public", filter = "for_ios", max_bookmark_id = 0, tag = "", auth = true } = options;
        const url = new URL(this.hosts + "/v1/user/bookmarks/illust");
        url.searchParams.append("user_id", userid.toString());
        url.searchParams.append("restrict", restriction);
        url.searchParams.append("filter", filter);
        url.searchParams.append("max_bookmark_id", max_bookmark_id.toString());
        url.searchParams.append("tag", tag);
        
        return await this.authFetch(url.toString(), {}, auth).then(res => res.json());
    }

    public async illust_detail(illust_id: string | number, auth: boolean = true): Promise<JSON> {
        const url = new URL(this.hosts + "/v1/illust/detail");
        url.searchParams.append("illust_id", illust_id.toString());
        
        return await this.authFetch(url.toString(), {}, auth).then(res => res.json());
    }
}