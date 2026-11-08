import { useEffect } from "react";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "./config/seo";

const ensureMetaTag = (attrName, attrValue, content) => {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const ensureLinkTag = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  keywords = [],
  noindex = false,
  structuredData = null,
}) {
  useEffect(() => {
    const canonicalUrl = new URL(path, `${SITE_URL}/`).toString();
    const imageUrl = image.startsWith("http")
      ? image
      : new URL(image, `${SITE_URL}/`).toString();
    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const robotsContent = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large";

    document.title = pageTitle;
    document.documentElement.lang = "id";

    ensureMetaTag("name", "description", description);
    ensureMetaTag("name", "robots", robotsContent);
    ensureMetaTag("name", "keywords", keywords.join(", "));

    ensureMetaTag("property", "og:type", type);
    ensureMetaTag("property", "og:site_name", SITE_NAME);
    ensureMetaTag("property", "og:locale", "id_ID");
    ensureMetaTag("property", "og:title", pageTitle);
    ensureMetaTag("property", "og:description", description);
    ensureMetaTag("property", "og:url", canonicalUrl);
    ensureMetaTag("property", "og:image", imageUrl);

    ensureMetaTag("name", "twitter:card", "summary_large_image");
    ensureMetaTag("name", "twitter:title", pageTitle);
    ensureMetaTag("name", "twitter:description", description);
    ensureMetaTag("name", "twitter:image", imageUrl);

    ensureLinkTag("canonical", canonicalUrl);

    const existingScript = document.getElementById("seo-json-ld");

    if (structuredData) {
      const script = existingScript || document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);

      if (!existingScript) {
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }
  }, [description, image, keywords, noindex, path, structuredData, title, type]);

  return null;
}

export default Seo;
