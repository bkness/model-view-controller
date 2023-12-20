const deleteBlog = async (blogId) => {
    try {
   
      const confirmed = window.confirm('Are you sure you want to delete this blog?');
  
      if (!confirmed) {
        return; 
      }
  
      const response = await fetch(`/api/blog/${blogId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        location.reload();
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const deleteButtons = document.querySelectorAll('#delete-blog');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const blogId = button.closest('.top-container').dataset.blogId;
      deleteBlog(blogId);
    });
  });
  