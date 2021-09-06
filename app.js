$(document).ready(function(){
  var $app = $('#app');
  $app.html('');
  var $title = $('<h1>Twiddler</h1>');
  var $button =$('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"></div>');

  $app.append($title, $button, $feed);
  window.onload = renderFeed();

  $button.on("click", function() { loadTweets();});
  $button.on("click", function() {$button.text('Update Feed');});

  function renderFeed(user) {
    if (user !== undefined) {
      var index = streams.users[user].length - 1;
    } else {
      var index = streams.home.length - 1;
    }
    while(index >= 0) {
      if (user !== undefined) {
        var tweet = streams.users[user][index];
      } else {
        var tweet = streams.home[index];
      }
      var $tweet = $('<div class="tweet"></div>'); //every tweet rendered contains on element with class of 'tweet' for every
      $tweet.appendTo('#feed');

      var $message = $('<p class="message"></p>');
      $message.text(tweet.message);

      var $username = $('<div class="username"></div>');
      if (user !== undefined) {
        $username.text('@' + user);
      } else {
        $username.text('@' + tweet.user);
      }

      $("#app").on("click", ".username", function(event) {
        event.preventDefault();
        handleUserNameClick(event.target.innerText);
      });

      var $image = $('<img class="profile-photo">');
      $image.attr("src", function() {
        if (user !== undefined) {
          return "assets/img/" + user + ".png";
        } else {
          return "assets/img/" + tweet.user + ".png";
        }
      });

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text(jQuery.timeago(tweet.created_at));
      var $imageComment = $('<i class="comment fas fa-comment"></i>');
      var $imageRetweet = $('<i class="retweet fas fa-retweet">');
      var $imageLike = $('<i class="like fas fa-star">');
      var $imageShare = $('<i class="share fas fa-share">');

      $tweet.append($message, $username, $image, $timestamp, $imageComment, $imageRetweet, $imageLike, $imageShare);
      index -= 1;  //decreases index after adding it to the DOM
    };
  };

  function loadTweets() {
    $('#feed').empty();
    renderFeed();
  };

  function handleUserNameClick(user) {
    $button.text('Go Back');
    $('#feed').empty();
    user = user.slice(1);
    renderFeed(user);
  };
  window.isItBeautifulYet = true;
});
