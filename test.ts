import { PixivAPI } from "./mod.ts";

const pixiv = new PixivAPI();

const user = await pixiv.user_detail("4357166", "for_ios", false);

console.log(user);