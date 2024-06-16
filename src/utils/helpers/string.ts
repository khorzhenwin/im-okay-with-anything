export const screamingSnakeToTitleCase = (input: string) => {
    return input
        // Split the string at each underscore
        .split("_")
        // Capitalize the first letter and make the rest lowercase
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        // Join the words with spaces
        .join(" ")
        // Remove trailing special characters only for trailing words
        .replace(/[^a-zA-Z0-9\s]$/, "");
};
