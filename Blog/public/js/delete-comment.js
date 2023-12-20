const deleteComment = async (commentId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this comment?');
  
      if (!confirmed) {
        return;
      }
  
      const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Comment deleted successfully');
        location.reload();
    } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const deleteCommentButtons = document.querySelectorAll('.delete-comment-btn');
  deleteCommentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const commentId = button.dataset.commentId;
      await deleteComment(commentId);
    });
  });
  