
$(document).ready(function() {
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

function createTweetElement(tweetData){
    var name = tweetData.user.name;
    var avatar = tweetData.user.avatars.small;
    var handle = tweetData.user.handle; 
    var content = escape(tweetData.content.text); 
    var tweetDate = moment(tweetData.created_at).fromNow();
return `<article class="posted-tweet">
          <header class="posted-tweet-header">
            <img src="${avatar}" class="posted-tweet-avatar">
            <h2 class="posted-tweet-name">${name}</h2>
            <p class="posted-twitter-handle">${handle}</p>                    
          </header>
          <div class="posted-content">${content}</div>
          <hr class="hr-tweet"> </hr>
          <footer class="posted-tweet-footer">
            <i class="posted-tweet-timestamp">
            <span>${tweetDate}</span></i>
              <i class="fa fa-heart-o" aria-hidden="true"></i>
              <i class="fa fa-flag-o" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
          </footer>
        </article>`
}

function renderTweets(tweets) {
 
  for(var i = 0; i < tweets.length; i++) {
    var $tweet = createTweetElement(tweets[i]);
    $('.posted-tweets-container').prepend($tweet);
   $('.text-for-tweets').val('');
  }
}
  
function getTweets() {
    $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      renderTweets(data);
    }
  });
}
  getTweets();
//form takes in 140 characters or less and posts to page as a tweet
  $('form').submit(function(event) {
    event.preventDefault();
    var textArea = $(this).find('.text-for-tweets').val();
    var formInput = $(this).serialize();
    if(textArea === ""){
      return alert('Nobody wants to see an empty tweet!')
    } else 
      if(textArea.length > 140) {
        return alert('You talk too much')
    } else {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: formInput
      }).done(function(data){
        getTweets();
      });
    }  
  });
//hide compose box 
  $('.new-tweet').hide(); 
//show compose box on click of compose button 
  $('.compose-button').on('click', function(event) {
    $('.new-tweet').slideToggle();
    $('.text-for-tweets').focus();
  });
});
