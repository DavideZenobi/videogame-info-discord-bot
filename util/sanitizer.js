

const regex = /^[a-zA-Z0-9:'(),\s-]+$/

export function sanitizeInput(input) {
    return input.match(regex) ? input : "League of Legends";
}