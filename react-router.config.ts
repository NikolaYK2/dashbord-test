import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  ssr: true, // Включаем SSR для Vercel
  presets: [vercelPreset()], // Указываем пресет Vercel
} satisfies Config;