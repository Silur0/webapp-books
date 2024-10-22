export function sanitizeInput(input: string): string {
    // Use a DOMParser to create an element to leverage the browser's HTML escaping
    const tempDiv = document.createElement("div");

    // Set the input as the text content to escape any HTML
    tempDiv.textContent = input;

    // Get the sanitized string
    return tempDiv.innerHTML;
}
