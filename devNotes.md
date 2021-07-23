These are development notes that might come in handy:

Log postbird into Mix Meld's heroku postgres like this: 

1. go to the URL Login tab of postbird.

2. use this URL:

  postgres://wwgarnisxotnyq:fb883837152eebd9361779e8b23001dc885670b2d66989029a2d9abcc371d759@ec2-54-156-73-147.compute-1.amazonaws.com:5432/d3ocfu19ok816s?ssl=verify-full


Start Backend with:
pipenv shell
flask run

Start Frontend with:
npm start