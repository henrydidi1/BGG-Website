import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.brandgo.global/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
