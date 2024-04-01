import {LOCAL_STORAGE_MAP_STYLE_ID_KEY} from "@/utils/constants/constants";

export function getLocalStorageMapStyleId(): string {
    return localStorage.getItem(LOCAL_STORAGE_MAP_STYLE_ID_KEY) ?? "";
}

export function saveLocalStorageMapStyleId(id: string): void {
    localStorage.setItem(LOCAL_STORAGE_MAP_STYLE_ID_KEY, id);
}