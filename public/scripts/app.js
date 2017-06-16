var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(document).ready(function() {
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
  // $(`${escape(tweet.content.text)}`);
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
    $('.posted-tweets-container').empty();
    for(var i = 0; i < tweets.length; i++) {
      var $tweet = createTweetElement(tweets[i]);
      $('.posted-tweets-container').prepend($tweet);
      }
    }
    // renderTweets();
    
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

  $('form').submit(function(event) {
    event.preventDefault();
    var textArea = $(this).find('.text-for-tweets').val();
    var formInput = $(this).serialize();
    if(textArea === null){
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
        textArea.val(" ");
      });
    }  
  });
  $('.compose-button').on('click', function(event) {
    $('.new-tweet').slideToggle();
    $('.text-for-tweets').focus();
  });
});
