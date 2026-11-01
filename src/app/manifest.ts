import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abhijith Sunil — Trade Settlement & Financial Operations",
    short_name: "Abhijith Sunil",
    description: "Financial operations professional specializing in trade settlement, custody management, and risk mitigation.",
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#070707",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
