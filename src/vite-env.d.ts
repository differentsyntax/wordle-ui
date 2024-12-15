/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_VALID_WORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
