/**
 * Material Symbols (Outlined) Constants
 * Comprehensive collection of Material Design symbols organized by category
 */

// Popular icons commonly used in templates
export const POPULAR_ICONS = [
  "smart_toy",
  "description",
  "chat",
  "lightbulb",
  "create",
  "summarize",
  "translate",
  "search",
  "compare",
  "analytics",
  "build",
  "quiz",
  "psychology",
  "tips_and_updates",
] as const;

// Communication and messaging
export const COMMUNICATION_ICONS = [
  "chat",
  "chat_bubble",
  "chat_bubble_outline",
  "message",
  "mail",
  "email",
  "forum",
  "question_answer",
  "comment",
  "feedback",
  "record_voice_over",
  "campaign",
  "announcement",
  "notifications",
] as const;

// AI and automation
export const AI_ICONS = [
  "smart_toy",
  "psychology",
  "auto_awesome",
  "auto_fix_high",
  "lightbulb",
  "tips_and_updates",
  "neurology",
  "memory",
  "model_training",
  "api",
  "data_object",
  "schema",
] as const;

// Document and content
export const DOCUMENT_ICONS = [
  "description",
  "article",
  "text_snippet",
  "file_copy",
  "content_copy",
  "summarize",
  "notes",
  "draft",
  "create",
  "edit",
  "edit_note",
  "text_format",
  "title",
  "format_quote",
] as const;

// Actions and tools
export const ACTION_ICONS = [
  "build",
  "construction",
  "settings",
  "tune",
  "create",
  "add_circle",
  "remove_circle",
  "check_circle",
  "cancel",
  "refresh",
  "sync",
  "update",
  "upgrade",
  "download",
  "upload",
  "share",
  "launch",
  "open_in_new",
  "play_arrow",
  "play_circle",
] as const;

// Analysis and data
export const ANALYSIS_ICONS = [
  "analytics",
  "assessment",
  "bar_chart",
  "show_chart",
  "chart_data",
  "pie_chart",
  "trending_up",
  "trending_down",
  "compare",
  "compare_arrows",
  "insights",
  "data_exploration",
  "query_stats",
  "monitoring",
  "science",
] as const;

// Search and discovery
export const SEARCH_ICONS = [
  "search",
  "find_in_page",
  "pageview",
  "explore",
  "travel_explore",
  "manage_search",
  "image_search",
  "youtube_searched_for",
  "screen_search_desktop",
  "search_off",
] as const;

// Learning and education
export const EDUCATION_ICONS = [
  "school",
  "quiz",
  "help",
  "help_outline",
  "info",
  "book",
  "menu_book",
  "library_books",
  "bookmark",
  "star",
  "grade",
  "workspace_premium",
  "verified",
  "chat_info",
] as const;

// Language and translation
export const LANGUAGE_ICONS = [
  "translate",
  "language",
  "g_translate",
  "interpreter_mode",
  "record_voice_over",
  "hearing",
  "volume_up",
  "mic",
  "keyboard_voice",
  "spatial_audio_off",
] as const;

// Business and professional
export const BUSINESS_ICONS = [
  "business",
  "business_center",
  "work",
  "corporate_fare",
  "domain",
  "store",
  "local_mall",
  "shopping_cart",
  "payments",
  "account_balance",
  "trending_up",
  "campaign",
  "groups",
  "person",
  "people",
] as const;

// Technical and development
export const TECHNICAL_ICONS = [
  "code",
  "terminal",
  "developer_mode",
  "bug_report",
  "integration_instructions",
  "api",
  "webhook",
  "cloud",
  "storage",
  "database",
  "memory",
  "dns",
  "http",
  "security",
] as const;

// Media and files
export const MEDIA_ICONS = [
  "image",
  "photo",
  "video_file",
  "audio_file",
  "folder",
  "folder_open",
  "attach_file",
  "link",
  "picture_as_pdf",
  "download",
  "upload_file",
] as const;

// Navigation and interface
export const NAVIGATION_ICONS = [
  "home",
  "menu",
  "more_vert",
  "more_horiz",
  "arrow_back",
  "arrow_forward",
  "expand_more",
  "expand_less",
  "chevron_left",
  "chevron_right",
  "close",
  "fullscreen",
  "fullscreen_exit",
  "open_in_full",
  "help_outline",
  "keyboard_tab",
  "space_dashboard",
  "photo_auto_merge",
  "location_city",
  "inventory_2",
] as const;

// All icon categories combined
export const ICON_CATEGORIES = {
  popular: { label: "Popular", icons: POPULAR_ICONS },
  communication: { label: "Communication", icons: COMMUNICATION_ICONS },
  ai: { label: "AI & Automation", icons: AI_ICONS },
  document: { label: "Documents", icons: DOCUMENT_ICONS },
  action: { label: "Actions", icons: ACTION_ICONS },
  analysis: { label: "Analysis", icons: ANALYSIS_ICONS },
  search: { label: "Search", icons: SEARCH_ICONS },
  education: { label: "Education", icons: EDUCATION_ICONS },
  language: { label: "Language", icons: LANGUAGE_ICONS },
  business: { label: "Business", icons: BUSINESS_ICONS },
  technical: { label: "Technical", icons: TECHNICAL_ICONS },
  media: { label: "Media", icons: MEDIA_ICONS },
  navigation: { label: "Navigation", icons: NAVIGATION_ICONS },
} as const;

// Union type of all valid icon names
export type MaterialSymbolName =
  | typeof POPULAR_ICONS[number]
  | typeof COMMUNICATION_ICONS[number]
  | typeof AI_ICONS[number]
  | typeof DOCUMENT_ICONS[number]
  | typeof ACTION_ICONS[number]
  | typeof ANALYSIS_ICONS[number]
  | typeof SEARCH_ICONS[number]
  | typeof EDUCATION_ICONS[number]
  | typeof LANGUAGE_ICONS[number]
  | typeof BUSINESS_ICONS[number]
  | typeof TECHNICAL_ICONS[number]
  | typeof MEDIA_ICONS[number]
  | typeof NAVIGATION_ICONS[number];

// Get all icons as a flat array
export const ALL_ICONS: MaterialSymbolName[] = Object.values(ICON_CATEGORIES)
  .flatMap(category => [...category.icons]);

// Category type
export type IconCategoryKey = keyof typeof ICON_CATEGORIES;

/**
 * Validates if a string is a valid Material Symbol name
 */
export const isValidIconName = (name: string): name is MaterialSymbolName => {
  return ALL_ICONS.includes(name as MaterialSymbolName);
};

/**
 * Search icons by name or category
 */
export const searchIcons = (query: string): MaterialSymbolName[] => {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return [...POPULAR_ICONS];

  return ALL_ICONS.filter(icon =>
    icon.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get icons from a specific category
 */
export const getIconsByCategory = (category: IconCategoryKey): readonly MaterialSymbolName[] => {
  return ICON_CATEGORIES[category].icons;
};

/**
 * Get the category label
 */
export const getCategoryLabel = (category: IconCategoryKey): string => {
  return ICON_CATEGORIES[category].label;
};

/**
 * Get all category keys
 */
export const getAllCategories = (): IconCategoryKey[] => {
  return Object.keys(ICON_CATEGORIES) as IconCategoryKey[];
};

/**
 * Font variation settings for Material Symbols
 */
export const FONT_VARIATIONS = {
  FILL: { min: 0, max: 1, default: 1 },
  WEIGHT: { min: 100, max: 700, default: 400 },
  GRADE: { min: -25, max: 200, default: 0 },
  OPTICAL_SIZE: { min: 20, max: 48, default: 24 },
} as const;

/**
 * Common icon presets for different use cases
 */
export const ICON_PRESETS = {
  template: {
    default: "smart_toy" as MaterialSymbolName,
    suggestions: ["smart_toy", "description", "lightbulb", "create", "chat"] as const,
  },
  action: {
    default: "play_arrow" as MaterialSymbolName,
    suggestions: ["play_arrow", "build", "launch", "refresh", "sync"] as const,
  },
  content: {
    default: "description" as MaterialSymbolName,
    suggestions: ["description", "article", "text_snippet", "notes", "draft"] as const,
  },
} as const;

export type IconPresetKey = keyof typeof ICON_PRESETS;