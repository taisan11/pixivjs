export interface ProfileImageUrls {
    medium: string;
}

export interface UserInfo {
    id: number;
    name: string;
    account: string;
    profile_image_urls: ProfileImageUrls;
    comment?: string;
    is_followed?: boolean;
    is_access_blocking_user?: boolean;
}

export interface CommentUser {
    id: number;
    name: string;
    account: string;
    profile_image_urls: ProfileImageUrls;
}

export interface Profile {
    webpage?: string;
    gender: string;
    birth: string;
    birth_day: string;
    birth_year: number;
    region: string;
    address_id: number;
    country_code: string;
    job: string;
    job_id: number;
    total_follow_users: number;
    total_mypixiv_users: number;
    total_illusts: number;
    total_manga: number;
    total_novels: number;
    total_illust_bookmarks_public: number;
    total_illust_series: number;
    total_novel_series: number;
    background_image_url: string;
    twitter_account: string;
    twitter_url?: string;
    pawoo_url?: string;
    is_premium: boolean;
    is_using_custom_profile_image: boolean;
}

export interface ProfilePublicity {
    gender: string;
    region: string;
    birth_day: string;
    birth_year: string;
    job: string;
    pawoo: boolean;
}

export interface Workspace {
    pc: string;
    monitor: string;
    tool: string;
    scanner: string;
    tablet: string;
    mouse: string;
    printer: string;
    desktop: string;
    music: string;
    desk: string;
    chair: string;
    comment: string;
    workspace_image_url?: string;
}

export interface UserInfoDetailed {
    user: UserInfo;
    profile: Profile;
    profile_publicity: ProfilePublicity;
    workspace: Workspace;
}

export interface ImageUrls {
    square_medium: string;
    medium: string;
    large: string;
}

export interface NovelTag {
    name: string;
    translated_name?: string;
    added_by_uploaded_user: boolean;
}

export interface IllustrationTag {
    name: string;
    translated_name?: string;
}

export interface Series {
    id: number;
    title: string;
}

export interface NovelInfo {
    id: number;
    title: string;
    caption: string;
    restrict: number;
    x_restrict: number;
    is_original: boolean;
    image_urls: ImageUrls;
    create_date: string;
    tags: NovelTag[];
    page_count: number;
    text_length: number;
    user: UserInfo;
    series: Series | object;
    is_bookmarked: boolean;
    total_bookmarks: number;
    total_view: number;
    visible: boolean;
    total_comments: number;
    is_muted: boolean;
    is_mypixiv_only: boolean;
    is_x_restricted: boolean;
    novel_ai_type: number;
    comment_access_control?: number;
}

export interface Comment {
    id: number;
    comment: string;
    date: string;
    user?: CommentUser;
    parent_comment: Comment | object;
}

export interface NovelComments {
    total_comments: number;
    comments: Comment[];
    next_url?: string;
    comment_access_control: number;
}

export interface NovelNavigationInfo {
    id: number;
    viewable: boolean;
    content_order: string;
    title: string;
    cover_url: string;
    viewable_message?: string;
}

export interface NovelRating {
    like: number;
    bookmark: number;
    view: number;
}

export interface WebviewNovel {
    id: string;
    title: string;
    series_id?: string;
    series_title?: string;
    series_is_watched?: boolean;
    user_id: string;
    cover_url: string;
    tags: string[];
    caption: string;
    cdate: string;
    rating: NovelRating;
    text: string;
    marker?: string;
    illusts: string[];
    images: string[];
    series_navigation: NovelNavigationInfo | object | null;
    glossary_items: string[];
    replaceable_item_ids: string[];
    ai_type: number;
    is_original: boolean;
}

export interface UserBookmarksNovel {
    novels: NovelInfo[];
    next_url?: string;
}

export interface UserNovels {
    user: UserInfo;
    novels: NovelInfo[];
    next_url?: string;
}

export interface SearchNovel {
    novels: NovelInfo[];
    next_url?: string;
    search_span_limit: number;
    show_ai: boolean;
}

export interface MetaSinglePage {
    original_image_url?: string;
}

export interface MetaPage {
    image_urls: ImageUrls;
}

export interface IllustrationInfo {
    id: number;
    title: string;
    type: string;
    image_urls: ImageUrls;
    caption: string;
    restrict: number;
    user: UserInfo;
    tags: IllustrationTag[];
    tools: string[];
    create_date: string;
    page_count: number;
    width: number;
    height: number;
    sanity_level: number;
    x_restrict: number;
    series?: Series;
    meta_single_page: MetaSinglePage;
    meta_pages: MetaPage[];
    total_view: number;
    total_bookmarks: number;
    is_bookmarked: boolean;
    visible: boolean;
    is_muted: boolean;
    illust_ai_type: number;
    illust_book_style: number;
    total_comments?: number;
    restriction_attributes: string[];
}

export interface SearchIllustrations {
    illusts: IllustrationInfo[];
    next_url?: string;
    search_span_limit: number;
    show_ai: boolean;
}

export interface UserBookmarksIllustrations {
    illusts: IllustrationInfo[];
    next_url?: string;
}

export interface UserPreview {
    user: UserInfo;
    illusts: IllustrationInfo[];
    novels: NovelInfo[];
    is_muted: boolean;
}

export interface UserFollowing {
    user_previews: UserPreview[];
    next_url?: string;
}

export interface UserIllustrations {
    user: UserInfo;
    illusts: IllustrationInfo[];
    next_url?: string;
}