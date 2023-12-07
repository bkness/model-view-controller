
const blogComment = async (event) => {
    event.preventDefault();
  
    const blog_id = document.querySelector('#blogid').innerHTML;
    const comment = document.querySelector('#pubcomment').value.trim();
  
    if (comment && blog_id) {
      const response = await fetch(`/api/breweries/${blog_id}`, {
        method: 'PUT',
        body: JSON.stringify({ comment }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/api/homepage');
      } else {
        alert('Failed to add comment');
      }
    }
  };

  document.querySelector('#blogcommentsubmit').addEventListener('click', enterblog);