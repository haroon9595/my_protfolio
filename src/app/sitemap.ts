import type { MetadataRoute } from "next";
import { getAllProjects } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://haroonrashid.dev";

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}

