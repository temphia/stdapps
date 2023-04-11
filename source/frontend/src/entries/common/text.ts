export const formatText = (text: string): string => {
  // Input text string
  var text = "Hello! Here's a link to Google: https://www.google.com";

  // Regular expression to match URLs
  var urlRegex = /(https?:\/\/[^\s]+)/g;

  // Extract URLs from the text
  var urls = text.match(urlRegex);

  // Create clickable links
  if (urls) {
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  }

  return text;
};
