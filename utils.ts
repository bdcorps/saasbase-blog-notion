export const encodeSlug = (slug: string): string => {
  if (!slug) return "";
  return slug
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]+/gi, "")
    .replace(/ /gi, "-")

};


export const decodeSlug = (slug: string): string => {
  if (!slug) { return ""; }
  return slug.replace(/-/g, ' ')
}

export const titleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

export const prettifyTag = (str: string) => {
  return titleCase(decodeSlug(str))
}

export const getMetaImage = (title: string): string => {
  return `https://og.tailgraph.com/og
	?fontFamily=Inter
	&title=${title}
	&titleTailwind=font-bold%20text-6xl%20text-white%20p-10%20m-10
	&text=SaaSBase
	&textTailwind=text-2xl%20mt-4%20text-white
	&textFontFamily=Inter
	&logoTailwind=h-8
	&bgTailwind=bg-black`
}
