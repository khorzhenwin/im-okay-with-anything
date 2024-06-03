export const screamingSnakeToTitleCase = (input: string) => {
    return input
        .split("_") // Split the string at each underscore
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase()) // Capitalize the first letter and make the rest lowercase
        .join(" "); // Join the words with spaces
};
