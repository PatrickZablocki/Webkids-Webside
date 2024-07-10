export async function fetchPosts() {
    try {
        const response = await fetch('https://api.example.com/posts');
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch', error);
        throw error;
    }
}