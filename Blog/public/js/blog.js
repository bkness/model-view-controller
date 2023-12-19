document.querySelector('#blog-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-label').value.trim();
    const contentPost = document.querySelector('#blog-content').value.trim();

    if (title && contentPost) {
        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                body: JSON.stringify({ title, contentPost,  }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to create blog');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});
