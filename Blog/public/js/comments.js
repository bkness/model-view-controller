const blogComment = async (event) => {
  event.preventDefault();

  const blogIdInput = document.querySelector('#blog-id');
  const blog_id = blogIdInput ? blogIdInput.value : null;
  const comment = document.querySelector('#comment-text').value.trim();

  console.log('Blog ID:', blog_id);
  console.log('Comment:', comment);

  if (comment && blog_id) {
      const response = await fetch(`/api/blog/comment`, {
          method: 'POST',
          body: JSON.stringify({ comment, blog_id }),
          headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response:', response);

      if (response.ok) {
          document.location.reload();
      } else {
          alert('Failed to add comment');
      }
  }
};

document.querySelector('#comment-submit').addEventListener('click', blogComment);
