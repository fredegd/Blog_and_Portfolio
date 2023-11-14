const extractTextFromRichText = (content) => {
  if (!content) return "";

  return content.content
    .map((node) => {
      if (node.nodeType === "text" && node.value) {
        return node.value;
      } else if (node.nodeType === "paragraph") {
        return extractTextFromRichText(node);
      } else if (node.content) {
        return extractTextFromRichText(node);
      }
      return "";
    })
    .join(" ");
};

// Truncate the text to the first 70 chars

export const truncatedTitle = (title) => {
  if (title.length < 70) {
    return title;
  } else {
    return title.split("").slice(0, 70).join("").trim() + " ...";
  }
};

// Truncate the text to the first 15 words

export const truncatedContent = (content) => {
  const contentPreview = extractTextFromRichText(content);
  const words = contentPreview.split(" ");
  if (words.length < 15) {
    return words.join(" ");
  } else {
    return words.slice(0, 15).join(" ") + " [...]";
  }
};

// console.log(truncatedContent);
